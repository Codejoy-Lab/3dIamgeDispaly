import React from 'react';
import styles from './index.module.scss';

const Speaker = ({ speaking }) => (
  <div className={`${styles.speaker} ${speaking ? styles['speaking'] : ''}`}>
    <div className={styles['inner-circle']}></div>
    <div className={styles['outer-circle']}></div>
  </div>
);
export default Speaker;
