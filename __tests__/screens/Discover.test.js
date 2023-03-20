import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import movieReducer from '../../redux/reducers/movie.reducer'
import mediaReducer from '../../redux/reducers/media.reducer'
import { Provider } from 'react-redux'
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor
} from '@testing-library/react-native'
import { SCREENS } from '../../lib/constants'
import Discover from '../../screens/Discover'
import favouriteReducer from '../../redux/reducers/favourite.reducer'
import filterReducer from '../../redux/reducers/filters.reducer'
import axios from '../../http-common'

jest.mock('../../http-common')

describe('Discover Screen', () => {
  const mockMovies = {
    data: {
      results: [
        {
          id: 1,
          genre_ids: [1, 2, 3],
          title: 'Mock Movie',
          posterPath: '/posterPath1.jpg',
          imageUri: '/posterPath1.jpg',
          year: 2023,
          rating: 5
        },
        {
          id: 2,
          title: 'Mock Movie',
          posterPath: '/posterPath2.jpg',
          imageUri: '/posterPath1.jpg',
          year: 2024,
          rating: 3
        }
      ]
    }
  }
  const getStore = (initialState) => {
    const store = configureStore({
      reducer: {
        movies: movieReducer,
        media: mediaReducer,
        favourites: favouriteReducer,
        filters: filterReducer
      },
      preloadedState: initialState
    })

    return store
  }

  afterEach(() => {
    cleanup()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  const mockNavigation = {
    navigate: jest.fn()
  }

  it('should render empty state when there are no movies', async () => {
    const mockStoreState = {
      movies: {
        data: {
          results: []
        }
      }
    }

    axios.get.mockResolvedValue({
      data: {
        results: []
      }
    })

    const store = getStore(mockStoreState)

    render(
      <Provider store={store}>
        <Discover navigation={mockNavigation} />
      </Provider>
    )

    await waitFor(async () => {
      expect(await screen.findByText('No results found')).toBeOnTheScreen()
      expect(screen).toMatchSnapshot()
    })
  })

  it('should navigate to settings screen when no results found', async () => {
    const mockStoreState = {
      movies: {
        data: {
          results: []
        }
      }
    }
    const store = getStore(mockStoreState)

    axios.get.mockResolvedValue({
      data: {
        results: []
      }
    })

    render(
      <Provider store={store}>
        <Discover navigation={mockNavigation} />
      </Provider>
    )

    await waitFor(async () => {
      fireEvent.press(await screen.findByText('Go to Settings'))

      expect(mockNavigation.navigate).toBeCalledWith(SCREENS.SETTINGS)
    })
  })

  it('renders correctly when movies are fetched', async () => {
    const store = getStore({
      movies: {
        data: {
          results: []
        }
      }
    })

    axios.get.mockResolvedValue(mockMovies)

    render(
      <Provider store={store}>
        <Discover navigation={mockNavigation} />
      </Provider>
    )

    await waitFor(async () => {
      expect(await screen.findAllByText('Mock Movie')).toHaveLength(2)
      expect(screen).toMatchSnapshot()
    })
  })

  it('should add a movie to favourites', async () => {
    const store = getStore({
      movies: mockMovies
    })

    render(
      <Provider store={store}>
        <Discover navigation={mockNavigation} />
      </Provider>
    )
    await waitFor(async () => {
      expect(await screen.findAllByText('Mock Movie')).toHaveLength(2)
      fireEvent.press(screen.getAllByLabelText('Toggle Favorite Button')[0])
      const favs = Object.values(store.getState().favourites.data)
      expect(favs).toHaveLength(1)
    })
  })

  it('should remove the movie from favourites', async () => {
    const store = getStore({
      movies: mockMovies
    })

    render(
      <Provider store={store}>
        <Discover navigation={mockNavigation} />
      </Provider>
    )

    await waitFor(async () => {
      expect(await screen.findAllByText('Mock Movie')).toHaveLength(2)

      fireEvent.press(screen.getAllByLabelText('Toggle Favorite Button')[0]) // first add to favorite
      fireEvent.press(screen.getAllByLabelText('Toggle Favorite Button')[0]) // then remove from favorite

      const favs = Object.values(store.getState().favourites.data)

      expect(favs).toHaveLength(0)
    })
  })

  it('should check infinite scroll to get more data', async () => {
    const store = getStore({
      movies: {
        data: {
          results: []
        }
      }
    })

    axios.get.mockResolvedValueOnce(mockMovies)

    axios.get.mockResolvedValueOnce({
      data: {
        results: [
          {
            id: 3,
            genre_ids: [1, 2, 3],
            title: 'Mock Movie',
            posterPath: '/posterPath1.jpg',
            imageUri: '/posterPath1.jpg',
            year: 2023,
            rating: 5
          },
          {
            id: 4,
            title: 'Mock Movie',
            posterPath: '/posterPath2.jpg',
            imageUri: '/posterPath1.jpg',
            year: 2024,
            rating: 3
          }
        ]
      }
    })

    render(
      <Provider store={store}>
        <Discover navigation={mockNavigation} />
      </Provider>
    )

    await waitFor(async () => {
      expect(await screen.findAllByText('Mock Movie')).toHaveLength(2)
    })

    await waitFor(async () => {
      fireEvent.scroll(screen.getByLabelText('List of Movies'), {
        nativeEvent: {
          contentOffset: {
            y: 400
          },
          contentSize: {
            // Dimensions of the scrollable content
            height: 500,
            width: 100
          },
          layoutMeasurement: {
            // Dimensions of the device
            height: 100,
            width: 100
          }
        }
      })
      expect(await screen.findAllByText('Mock Movie')).toHaveLength(4)
    })
  }, 15000)
})
