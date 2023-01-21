import {createSlice} from '@reduxjs/toolkit';
import {fetchData} from "./filterSlice";

const initialState = {
  status: 'loading',
  openAllDropdownList: null
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      state.status = action.payload
    },
    toggleDropdown: (state, action) => {
      state.openAllDropdownList = !state.openAllDropdownList
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = 'error'
    })
  }
});

export const {changeStatus, toggleDropdown} = appSlice.actions


export const loadingStatus = (state) => state.app.status
export const dropdownListsStatus = (state) => state.app.openAllDropdownList