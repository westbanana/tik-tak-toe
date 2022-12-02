import React from 'react';

import style from './style.module.scss';

const Square = ({ value }) => (
  <button
    className={style.main}
    type="button"
  >
    {value}
  </button>
);

export default Square;
