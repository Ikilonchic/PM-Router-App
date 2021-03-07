import React from 'react';
import styles from './ToDo.module.scss';
import textStyles from '../../style/Text.module.scss';

import TodoApiService from '../../services/TodoApiService';

import AddItemForm from './AddItemForm/AddItemForm';
import Search from '../Search/Search';
import Item from './Item/Item';

class ToDo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            users: [],
            items: [],
        };

        this.load = this.load.bind(this);
        this.loadUsers = this.loadUsers.bind(this);
        this.loadUserItems = this.loadUserItems.bind(this);
        
        this.selectUser = this.selectUser.bind(this);
        
        this.addItem = this.addItem.bind(this);
        this.changeItemStatus = this.changeItemStatus.bind(this);
        
        this.setItemsFilter = this.setItemsFilter.bind(this);
        this.filteredItems = this.filteredItems.bind(this);

        this.renderUserSelect = this.renderUserSelect.bind(this);
        this.renderItemList = this.renderItemList.bind(this);
    }

    load() {
        this.loadUsers(this.loadUserItems);
    }

    async loadUsers(callback) {
        const users = await TodoApiService.getUsers();

        this.setState({
            currentUser: users[0],
            users: users,
        }, callback);
    }

    async loadUserItems(callback) {
        const items = await TodoApiService.getUsersItems(this.state.currentUser.id);

        this.setState({
            items: items.map(item => {
                return {
                    id: item.id,
                    title: item.title,
                    completed: item.completed,
                };
            }),
        }, callback);
    }

    selectUser(e) {
        this.setState({
            currentUser: this.state.users.find(user => user.username === e.target.value),
        }, this.loadUserItems);
    }

    setItemsFilter(value) {
        this.setState({
            isFiltered: !!value,
            filterValue: value,
        });
    }

    async addItem(value) {
        const data = await TodoApiService.postItem({
            userId: this.state.currentUser.id,
            title: value,
            completed: false,
        });

        this.setState({
            items: [...this.state.items, {
                id: data.id,
                title: data.title,
                completed: data.completed,
            }],
        });
    }

    changeItemStatus(id, value) {
        this.setState({
            items: this.state.items.map(item => {
                if (item.id === id) return {
                    ...item,
                    completed: value,
                }

                return item;
            }),
        })
    }

    filteredItems() {
        const { items, filterValue } = this.state;
        const regEx = new RegExp(filterValue, 'gi');

        return items.filter(item => regEx.test(item.title)).map(elem => {
            return {
                ...elem,
                title: elem.title.replace(regEx, `<span class="${textStyles['selected-text']}">${filterValue}</span>`),
            };
        });
    }

    componentDidMount() {
        this.load();
    }

    renderUserSelect() {
        const { currentUser, users } = this.state;

        return users.length ? <select onChange={this.selectUser} value={currentUser.username}>
            {users.map(user => {
                return <option key={user.id} value={user.username}>{user.name}</option>
            })}
        </select> : <div>
            Users not found
        </div>;
    }

    renderItemList() {
        const { items, isFiltered } = this.state;

        return <div className={styles['container__list']}>
            {[...(isFiltered ? this.filteredItems() : items)].map((elem, index) =>
                <Item key={elem.id} number={index + 1} id={elem.id} title={elem.title} completed={elem.completed} onComplete={this.changeItemStatus}/>
            )}
        </div>;
    }

    render() {
        return <div className={styles['container']}>
            <div className={styles['container__inner']}>
                <div className={styles['container__heading']}>
                    {this.renderUserSelect()}
                    <AddItemForm onSubmit={this.addItem}/>
                    <Search onSubmit={this.setItemsFilter}/>
                </div>
                <div className={styles['container__main']}>
                    {this.renderItemList()}
                </div>
            </div>
        </div>;
    }
}

export default ToDo;
