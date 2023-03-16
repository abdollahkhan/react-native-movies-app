export const REDUCERS = {
  GENRE: 'genres',
  MOVIE: 'movies',
  MEDIA: 'media',
  FAVOURITES: 'favourites',
  FILTERS: 'filters'
}

export const API_STATES = {
  IDLE: 'idle',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
  LOADING: 'loading'
}

export const API_URL = 'https://api.themoviedb.org/3'
export const API_KEY = '0511c9bf8a6b1d1216961e19831d9a40'

export const SCREENS = {
  SETTINGS: 'Settings',
  FAVOURITES: 'Favourites',
  DISCOVER: 'Discover',
  MAIN: 'Main'
}

export const SORT_OPTIONS={
  "Popularity": 'popularity.desc',
  "Rating":"vote_count.desc",
  "Newest First":"release_date.desc",
  "Oldest First":"release_date.asc",
}
