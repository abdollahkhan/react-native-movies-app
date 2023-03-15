import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './reducers/movie.reducer'

const store = configureStore({
  reducer: {
    movies: movieReducer
  }
})

export default store
