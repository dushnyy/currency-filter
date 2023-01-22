import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toggleDropdown} from "../../bll/appSlice";
import {activeFilter, changeDirections} from "../../bll/filterSlice";
import '../styles/filterPanel.scss'

export const FilterPanel = () => {
  const dispatch = useDispatch()

  const activeFilterCodes = useSelector(activeFilter);
  const findClassNameForBtn = (code) => `filter-panel__btn ${activeFilterCodes.some(f => code.includes(f)) ? 'active' : ''}`

  const directionsHandler = (directions) => {
    dispatch(toggleDropdown())
    dispatch(changeDirections(directions))
  }

  const filterCode = {
    cash: ['CASHUSD', 'CASHRUB'],
    cryptocurrencies: ['BTC', 'ETH', 'USDTTRC', 'TRX'],
    banks: ['ACRUB', 'SBERRUB', 'TCSBRUB', 'CNTRUB', 'P24UAH', 'OSDBUAH', 'WIREUAH', 'MONOBUAH', 'CARDUAH', 'QWRUB', 'CARDRUB', 'PMUSD']
  }

  return (
    <div className='filter-panel'>
      <button
        onClick={() => directionsHandler([])}
        className={`filter-panel__btn ${!activeFilterCodes.length ? 'active' : ''}`}
      >
        Все
      </button>

      <button
        className={findClassNameForBtn(filterCode.banks)}
        onClick={() => directionsHandler(filterCode.banks)}
      >
        Банки
      </button>

      <button
        className={findClassNameForBtn(filterCode.cash)}
        onClick={() => directionsHandler(filterCode.cash)}
      >
        Наличные
      </button>

      <button
        className={findClassNameForBtn(filterCode.cryptocurrencies)}
        onClick={() => directionsHandler(filterCode.cryptocurrencies)}
      >
        Криптовалюты
      </button>
    </div>
  );
};

