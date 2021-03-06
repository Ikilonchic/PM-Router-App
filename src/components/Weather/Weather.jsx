import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Weather.module.scss';

import WeatherApiService from '../../services/WeatherApiService';

import Card from './Card/Card';
import Preloader from '../Preloader/Preloader';

const propTypes = {
  city: PropTypes.string.isRequired,
};

const Weather = ({ city }) => {
  const [daily, setDaily] = useState();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { daily } = await WeatherApiService.get(city)
    
    setDaily(daily);
  };

  if (!daily) return <div className={classNames(styles['container'], styles['container_placeholder'])}>
    <Preloader />
  </div>;

  return <div className={styles['container']}>
    <div className={styles['container__inner']}>
      <div className={styles['container__list']}>
        {daily.map((elem) => <Card className={styles['container__card']} key={elem.dt} name={city} {...elem}/>)}
      </div>
    </div>
  </div>;
};

Weather.propTypes = propTypes;

export default Weather;
