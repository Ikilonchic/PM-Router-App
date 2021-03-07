import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Header.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const Header = (props) => {
    return <header className={classNames(props.className, styles['container'])}>
        <nav className={styles['container__inner']}>
            <ul className={styles['container__menu']}>
                {Array.from(props.children).map((elem, index) => <li key={index} className={styles['container__element']}>{elem}</li>)}
            </ul>
        </nav>
    </header>;
};

Header.propTypes = propTypes;

export default Header;
