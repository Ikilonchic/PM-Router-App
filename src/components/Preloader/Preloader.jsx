import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Preloader.module.scss';

const propTypes = {
    classNames: PropTypes.string,
};

const Preloader = (props) => <div className={classNames(props.className, styles['container'])}>Loading...</div>;

Preloader.propTypes = propTypes;

export default Preloader;
