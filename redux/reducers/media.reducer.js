import { createSlice } from '@reduxjs/toolkit'
import { API_STATES, REDUCERS } from '../../lib/constants'
import { fetchMediaConfig } from '../thunks/media.thunk'

const initialState = {
  data: {},
  status: API_STATES.IDLE,
  error: null
}

const reducerName = REDUCERS.MEDIA

const mediaSlice = createSlice({
  name: reducerName,
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchMediaConfig.pending, (state) => {
        state.status = API_STATES.LOADING
      })
      .addCase(fetchMediaConfig.fulfilled, (state, action) => {
        state.status = API_STATES.SUCCEEDED
        state.data = action.payload
      })
      .addCase(fetchMediaConfig.rejected, (state, action) => {
        state.status = API_STATES.FAILED
        state.error = action.error.message
      })
  }
})

export default mediaSlice.reducer
