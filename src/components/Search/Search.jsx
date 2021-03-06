import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Search.module.scss';

const propTypes = {
    className: PropTypes.string,

    onSubmit: PropTypes.func.isRequired,
};

const Search = (props) => {
    return <div className={styles['container']}>
        <input
            className={styles['container__input']}
            type="text"/>
        <button
            className={styles['container__btn']}
            type="button"
            onClick={props.onSubmit}>Search</button>
    </div>;
};

Search.propTypes = propTypes;

export default Search;
