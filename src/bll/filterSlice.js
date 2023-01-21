import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {changeStatus} from "./appSlice";

const initialState = {
  initialData: {},
  currentOptions: {
    activeFilter: [],
    activeDirections: {},
    filteredDirections: [],
    filteredPossibleDirections: []
  }
};

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('https://currency-filter-api.onrender.com/')

      const string = await response.text()

      const json = JSON.parse(string)

      thunkAPI.dispatch(changeStatus('success'))

      return json
    } catch (e) {
      console.error(e)
    }
  }
)

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    changeDirections: (state, action) => {
      const {currentOptions, initialData} = state

      currentOptions.activeFilter = action.payload

      if (action.payload.length) {
        currentOptions.filteredPossibleDirections = initialData.filter
          .filter(d => d.from.code === currentOptions.activeDirections.code)[0]['to']
          .filter(d => action.payload.includes(d.code))
      } else {
        currentOptions.filteredPossibleDirections = initialData.filter
          .filter(d => d.from.code === state.currentOptions.activeDirections.code)[0]['to']
      }
    },
    changeActiveDirections: (state, action) => {
      const {currentOptions, initialData} = state

      currentOptions.activeFilter = []

      currentOptions.activeDirections = action.payload

      currentOptions.filteredPossibleDirections = initialData.filter
        .filter(d => d.from.code === action.payload.code)[0]['to']

    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const {currentOptions} = state

      const activeDirections = action.payload.directions[0]

      state.initialData = action.payload

      currentOptions.activeDirections = activeDirections

      currentOptions.filteredDirections = action.payload.directions

      currentOptions.filteredPossibleDirections = action.payload.filter
        .filter(d => d.from.code === activeDirections.code)[0]['to']
    })
  }
});

export const {changeDirections, changeActiveDirections} = dataSlice.actions

export const activeFilter = (state) => state.data.currentOptions.activeFilter
export const activeDirections = (state) => state.data.currentOptions.activeDirections
export const filteredDirections = (state) => state.data.currentOptions.filteredDirections
export const filteredPossibleDirections = (state) => state.data.currentOptions.filteredPossibleDirections