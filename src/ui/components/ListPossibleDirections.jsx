import React from 'react';
import {useSelector} from "react-redux";
import {DropDownList} from "./DropDownList";
import {filteredPossibleDirections} from "../../bll/filterSlice";
import '../styles/dropDownList.scss'

export const ListPossibleDirections = () => {
  const directions = useSelector(filteredPossibleDirections);

  const listJsx = directions?.map((d, i) => (
    <li key={i} className='list-directions__item'>
      {d.name}
    </li>
  ))

  return (
    <DropDownList title={`Результат поиска (${directions.length})`}>
      <ul className='list-directions'>
        {listJsx.length ? listJsx : <li className='list-directions__not-found'>Ничего не найдено</li>}
      </ul>
    </DropDownList>
  );
};

