import React from 'react';
import {DropDownList} from "./DropDownList";
import {useDispatch, useSelector} from "react-redux";
import {activeDirections, changeActiveDirections, filteredDirections} from "../../bll/filterSlice";
import '../styles/dropDownList.scss'

export const ListDirections = () => {
  const dispatch = useDispatch()

  const directions = useSelector(filteredDirections);

  const activeDirectionsCode = useSelector(activeDirections);

  const listJsx = directions.map((d, i) => (
    <li key={i} className='list-directions__item'>
      <button
        onClick={() => dispatch(changeActiveDirections(d))}
        className={`
        list-directions__btn btn-default 
        ${d.code === activeDirectionsCode.code ? 'active' : ''}
        `}
      >
        {d.name}
      </button>
    </li>
  ))

  return (
    <DropDownList title={activeDirectionsCode['name']}>
      <ul className='list-directions'>
        {listJsx}
      </ul>
    </DropDownList>
  );
};

