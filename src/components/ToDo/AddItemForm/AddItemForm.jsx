import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './AddItemForm.module.scss';

const propTypes = {
    className: PropTypes.string,

    onSubmit: PropTypes.func.isRequired,
};

const AddItemForm = (props) => {
    const [ value, setValue ] = useState();
    const valueInputRef = useRef();

    const changeValueHandler = (e) => setValue(e.target.value);

    const onSubmit = () => {
        if(value) props.onSubmit(value);
        valueInputRef.current.select();
    }

    return <div className={classNames(props.className, styles['container'])}>
        <input
            className={styles['container__input']}
            type="text"
            placeholder="Write title..."
            onChange={changeValueHandler}
            ref={valueInputRef}
        />
        <button
            className={styles['container__btn']}
            type="button"
            onClick={onSubmit}>Add</button>
    </div>;
};

AddItemForm.propTypes = propTypes;

export default AddItemForm;