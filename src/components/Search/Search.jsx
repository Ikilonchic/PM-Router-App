import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Search.module.scss';
import { useState } from 'react';

const propTypes = {
    className: PropTypes.string,

    onSubmit: PropTypes.func.isRequired,
};

const Search = (props) => {
    const [ value, setValue ] = useState();

    const changeValueHandler = (e) => setValue(e.target.value);

    const onSearch = () => props.onSubmit(value);

    return <div className={classNames(props.className, styles['container'])}>
        <input
            className={styles['container__input']}
            type="text"
            onChange={changeValueHandler}/>
        <button
            className={styles['container__btn']}
            type="button"
            onClick={onSearch}>Search</button>
    </div>;
};

Search.propTypes = propTypes;

export default Search;
