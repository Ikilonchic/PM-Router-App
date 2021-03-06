import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Property.module.scss';

const propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  classNames: PropTypes.string,
};

const Property = (props) => <div className={classNames(props.className, styles['container'])}>
  <span className={styles['container__value']}>
    {props.value}
  </span>
  <span className={styles['container__title']}>
    {props.title}
  </span>
</div>;

Property.propTypes = propTypes;

export default Property;
