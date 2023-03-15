import { createAsyncThunk } from '@reduxjs/toolkit'
import { REDUCERS } from '../../lib/constants'
import api from '../../http-common'

export const fetchMediaConfig = createAsyncThunk(
  REDUCERS.MEDIA + '/fetch',
  async () => {
    const response = await api.get('configuration')
    return response.data
  }
)
