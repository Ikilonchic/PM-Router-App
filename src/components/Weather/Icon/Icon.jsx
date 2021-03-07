import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Icon.module.scss';

import config from '../../../config';

const propTypes = {
  icon: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const Icon = (props) => <div className={classNames(props.className, styles['container'])}>
  <img src={`${config.WEATHER_IMG_API_URL}/${props.icon}@2x.png`} alt={props.description}/>
</div>;

Icon.propTypes = propTypes;

export default Icon;
