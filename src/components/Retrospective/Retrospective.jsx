import React from 'react';
import PropTypes from 'prop-types';
import styles from './Retrospective.module.scss';

import tables from '../../data/tables.json';
import Table from './Table/Table';

const propTypes = {
    tables: PropTypes.array,
};

class Retrospective extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tables: props.tables || [],
        };
    }

    componentDidMount() {
        this.setState({
            tables,
        });
    }

    render() {
        return <div className={styles['container']}>
            {this.state.tables.map(elem => <Table className={styles['container__table']} key={elem.id} {...elem} />)}
        </div>;
    }
};

Retrospective.propTypes =  propTypes;

export default Retrospective;
