import { createAsyncThunk } from '@reduxjs/toolkit'
import { REDUCERS } from '../../lib/constants'
import api from '../../http-common'

export const fetchGenres = createAsyncThunk(
  REDUCERS.GENRE + '/fetch',
  async () => {
    const response = await api.get('genre/movie/list')
    const genreHash = {}
    response.data.genres.forEach((genre) => {
      genreHash[genre.id] = genre
    })

    return genreHash
  }
)
