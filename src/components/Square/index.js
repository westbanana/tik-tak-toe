import React from 'react';

import style from './style.module.scss';

const Square = (props) => (
  <button
    className={style.main}
    type="button"
    onClick={props.onClick}
  >
    {props.value}
  </button>
);

export default Square;
