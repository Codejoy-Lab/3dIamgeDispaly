import React from 'react';
import styles from './index.module.scss';

export default (props) => {
  const { title = '', style = {} } = props;
  const Title = title;
  return (
    <div className={styles.container} style={style}>
      <span className={styles.title}>{Title}</span>
    </div>
  );
};
