import { configureStore } from '@reduxjs/toolkit'
import genreReducer from './reducers/genre.reducer'
import mediaReducer from './reducers/media.reducer'
import movieReducer from './reducers/movie.reducer'
import { persistReducer } from 'redux-persist'
import favouriteReducer from './reducers/favourite.reducer'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, favouriteReducer)

const store = configureStore({
  reducer: {
    movies: movieReducer,
    genres: genreReducer,
    media: mediaReducer,
    favourites: persistedReducer
  }
})

export default store
