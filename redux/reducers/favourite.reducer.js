import { createSlice } from '@reduxjs/toolkit'
import { API_STATES, REDUCERS } from '../../lib/constants'

const initialState = {
  data: {},
  status: API_STATES.IDLE,
  error: null
}

const reducerName = REDUCERS.FAVOURITES

const favouriteSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    addToFavourites(state, action) {
      state.data[action.payload.id] = action.payload
    },

    removeFavourite(state, action) {
      delete state.data[action.payload]
    }
  }
})

export const { addToFavourites, removeFavourite } = favouriteSlice.actions

export default favouriteSlice.reducer
