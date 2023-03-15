import { createSlice } from '@reduxjs/toolkit'
import { API_STATES, REDUCERS } from '../../lib/constants'
import { fetchGenres } from '../thunks/genres.thunk'

const initialState = {
  data: {},
  status: API_STATES.IDLE,
  error: null
}

const reducerName = REDUCERS.GENRE

const genreSlice = createSlice({
  name: reducerName,
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.status = API_STATES.LOADING
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.status = API_STATES.SUCCEEDED
        state.data = action.payload
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.status = API_STATES.FAILED
        state.error = action.error.message
      })
  }
})

export default genreSlice.reducer
