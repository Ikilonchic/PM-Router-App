import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './AddItemForm.module.scss';

const propTypes = {
    className: PropTypes.string,

    onSubmit: PropTypes.func.isRequired,
};

const AddItemForm = (props) => {
    const valueInputRef = React.createRef();

    const onSubmit = () => {
        const value = valueInputRef.current.value;
        valueInputRef.current.select();

        if(value) props.onSubmit(value);
    }

    return <div className={classNames(props.className, styles['container'])}>
        <input
            className={styles['container__input']}
            type="text"
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