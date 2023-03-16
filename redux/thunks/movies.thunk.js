import { createAsyncThunk } from '@reduxjs/toolkit'
import { REDUCERS, SORT_OPTIONS } from '../../lib/constants'

import api from '../../http-common'

export const fetchMovies = createAsyncThunk(
  REDUCERS.MOVIE + '/discover/fetch',
  async (args, { getState }) => {
    const state = getState()
    const paginate = args === 'paginate'
    const {
      genre = {},
      year = '',
      runtime: { to, from },
      sort = ''
    } = state.filters.data

    const genreIds = Object.keys(genre).join(',') || ''

    let filterQuery = ''

    if(year){
      filterQuery+=`year=${year}&`
    }
    if(genreIds){
      filterQuery+=`with_genres=${genreIds}&`
    }
    if(to){
      filterQuery+=`with_runtime.lte=${to}&`
    }
    if(from){
      filterQuery+=`with_runtime=${from}&`
    }
    if(sort){
      filterQuery+=`sort_by=${SORT_OPTIONS[sort]}&`
    }

    let page = paginate ? state.movies.data.page + 1 : 1

    const response = await api.get(`discover/movie?page=${page}&${filterQuery}`)

    if (!paginate) {
      return response.data
    }

    const merged = response.data

    merged.results = [...(state.movies.data?.results || []), ...merged.results]

    return merged
  }
)
