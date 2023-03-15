import { createSlice } from '@reduxjs/toolkit'
import { API_STATES, REDUCERS } from '../../lib/constants'
import { fetchMovies } from '../thunks/movies.thunk'

const initialState = {
  data: {},
  status: API_STATES.IDLE,
  error: null
}

const reducerName = REDUCERS.MOVIE

const moviesSlice = createSlice({
  name: reducerName,
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = API_STATES.LOADING
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = API_STATES.SUCCEEDED
        state.data = action.payload
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = API_STATES.FAILED
        state.error = action.error.message
      })
  }
})

export default moviesSlice.reducer
