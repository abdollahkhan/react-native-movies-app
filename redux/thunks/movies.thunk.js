import { createAsyncThunk } from '@reduxjs/toolkit'
import { REDUCERS } from '../../lib/constants'

import api from '../../http-common'

export const fetchMovies = createAsyncThunk(
  REDUCERS.MOVIE + '/discover/fetch',
  async (args, { getState }) => {
    const state = getState()

    let page = state.movies.data.page + 1 || 1

    const response = await api.get(`discover/movie?page=${page}`)
    const merged = response.data

    merged.results = [...(state.movies.data?.results || []), ...merged.results]

    return merged
  }
)
