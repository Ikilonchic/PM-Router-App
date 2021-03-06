import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Card.module.scss';

import Icon from '../Icon/Icon';
import Property from '../Property/Property';
import DateService from '../../../services/DateService';

const propTypes = {
  dt: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  sunrise: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  sunset: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  name: PropTypes.string.isRequired,
  temp: PropTypes.object.isRequired,
  feels_like: PropTypes.object.isRequired,
  clouds: PropTypes.number.isRequired,
  pressure: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  wind_deg: PropTypes.number.isRequired,
  wind_speed: PropTypes.number.isRequired,
  weather: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })),
  classNames: PropTypes.string,
};

const Card = (props) => {
  const mainTemp = Math.round(props.temp.day);
  const feelsTemp = Math.round(props.feels_like.day);

  const date = DateService.getReadableFormat('en', new Date(props.dt * 1000));
  const sunriseTime = DateService.getTimeCode(new Date(props.sunrise * 1000));
  const sunsetTime = DateService.getTimeCode(new Date(props.sunset * 1000));

  return <div className={classNames(props.className, styles['container'])}>
    <div className={styles['container__heading']}>
      <div className={styles['container__city']}>{props.name}</div>
      <div className={styles['container__date']}>{`${date.timeCode}, ${date.day}, ${date.date} ${date.month}, ${date.year}`}</div>
    </div>
    <div className={styles['container__info']}>
      <Icon {...props.weather[0]} className={styles['container__icon']}/>
      <div className={styles['container__temp']}>
        <span className={styles['temp-main']}>{mainTemp}&deg;C</span>
        <span className={styles['temp-feels']}>Ощущается: {feelsTemp}&deg;C</span>
      </div>
      <div className={styles['info__table']}>
        <Property title={'Восход'} value={sunriseTime}/>
        <Property title={'Закат'} value={sunsetTime}/>
        <Property title={'Облачность'} value={props.clouds + '%'}/>
        <Property title={'Давление'} value={props.pressure + 'hPa'}/>
        <Property title={'Влажность'} value={props.humidity + '%'}/>
        <Property title={'Скорость ветра'} value={props.wind_speed + 'm/h'}/>
        <Property title={'Направление ветра'} value={props.wind_deg + '°'}/>
      </div>
    </div>
  </div>
};

Card.propTypes = propTypes;

export default Card;
