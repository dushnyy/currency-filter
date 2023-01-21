import React from 'react';
import spinner from '../image/spinner.svg'
import '../styles/spinner.scss'

const Spinner = () => {
  return (
    <div className='spinner'>
      <img src={spinner} alt="идет загрузка"/>
    </div>
  );
};

export default Spinner;