import { createSlice } from '@reduxjs/toolkit'
import { API_STATES, REDUCERS } from '../../lib/constants'

const initialState = {
  data: {
    genre: {},
    sort: '',
    year: '',
    runtime: {
      from: '',
      to: ''
    }
  },
  status: API_STATES.IDLE,
  error: null
}

const reducerName = REDUCERS.FILTERS

const filterSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    addGenreFilter(state, action) {
      state.data.genre[action.payload] = action.payload
    },

    removeGenreFilter(state, action) {
      delete state.data.genre[action.payload]
    },

    addSortFilter(state, action) {
      state.data.sort = action.payload
    },

    removeSortFilter(state) {
      state.data.sort = ''
    },

    addYearFilter(state, action) {
      state.data.year = action.payload
    },

    removeYearFilter(state) {
      state.data.year = ''
    },

    addRuntimeFromFilter(state, action) {
      state.data.runtime.from = action.payload
    },

    removeRuntimeFromFilter(state) {
      state.data.runtime.from = ''
    },

    addRuntimeToFilter(state, action) {
      state.data.runtime.to = action.payload
    },

    removeRuntimeToFilter(state) {
      state.data.runtime.to = ''
    }
  }
})

export const {
  addGenreFilter,
  removeGenreFilter,
  addSortFilter,
  removeSortFilter,
  addRuntimeFromFilter,
  addRuntimeToFilter,
  addYearFilter,
  removeRuntimeFromFilter,
  removeRuntimeToFilter,
  removeYearFilter
} = filterSlice.actions

export default filterSlice.reducer
