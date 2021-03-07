import PropTypes from 'prop-types';
import styles from './Item.module.scss';

import withCompleteItem from './withCompleteItem';

const propTypes = {
    number: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    onComplete: PropTypes.func.isRequired,
};

const Item = (props) => {
    return <div className={styles['container']}>
        <div className={styles['container__number']}>
            {props.number}
        </div>
        <div className={styles['container__main']}>
            <div className={styles['container__title']} dangerouslySetInnerHTML={{ __html: props.title }}></div>
            <input
                className={styles['container__complete']}
                type="checkbox"
                checked={props.completed} onChange={props.onComplete}/>
        </div>
    </div>;
};

Item.propTypes = propTypes;

export default withCompleteItem(Item);
