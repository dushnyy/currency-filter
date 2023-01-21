import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {dropdownListsStatus} from "../../bll/appSlice";
import '../styles/dropDownList.scss'

export const DropDownList = (props) => {
  const {children, title} = props

  const dropdownIsOpen = useSelector(dropdownListsStatus)

  const [open, setOpen] = useState(dropdownIsOpen)

  const handleMouseClick = ({target}) => {
    if (!target.closest('.drop-down-list-btn') &&
      !target.closest('.drop-down-list-content') &&
      !target.closest('.filter-panel__btn')) {
      setOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleMouseClick)

    return () => window.removeEventListener('click', handleMouseClick)
  }, [])

  useEffect(() => {
    dropdownIsOpen !== null && setOpen(true)
  }, [dropdownIsOpen])

  return (
    <>
      <button
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        className={`drop-down-list-btn  btn-default`}
      >
        {title}
      </button>

      <div
        aria-hidden={!open}
        className={`drop-down-list-content ${open ? 'open' : ''}`}
      >
        {children}
      </div>
    </>
  );
};

