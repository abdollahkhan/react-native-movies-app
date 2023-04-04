import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import movieReducer from '../../redux/reducers/movie.reducer'
import mediaReducer from '../../redux/reducers/media.reducer'
import { Provider } from 'react-redux'
import {
  render,
  screen,
  fireEvent,
  cleanup
} from '@testing-library/react-native'
import { SORT_OPTIONS } from '../../lib/constants'

import filterReducer from '../../redux/reducers/filters.reducer'
import Settings from '../../screens/Settings'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import genreReducer from '../../redux/reducers/genre.reducer'
import * as movieThunks from '../../redux/thunks/movies.thunk'

jest.mock('../../http-common')

jest.mock('react-native-safe-area-context', () => {
  const inset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaConsumer: ({ children }) => children(inset),
    useSafeAreaInsets: () => inset
  }
})

describe('Settings Screen', () => {
  const getStore = (initialState) => {
    const store = configureStore({
      reducer: {
        movies: movieReducer,
        media: mediaReducer,
        filters: filterReducer,
        genres: genreReducer
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
    navigate: jest.fn(),
    goBack: jest.fn()
  }

  it('renders correctly', async () => {
    const mockStoreState = {}
    const store = getStore(mockStoreState)

    const tree = render(
      <SafeAreaProvider>
        <Provider store={store}>
          <Settings navigation={mockNavigation} />
        </Provider>
      </SafeAreaProvider>
    )

    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('display filters correctly', async () => {
    const mockStoreState = {
      genres: {
        data: {
          1: {
            id: 1,
            name: 'Drama'
          },
          2: {
            id: 2,
            name: 'Drama'
          },
          3: {
            id: 3,
            name: 'Drama'
          }
        }
      }
    }
    const store = getStore(mockStoreState)

    render(
      <SafeAreaProvider>
        <Provider store={store}>
          <Settings navigation={mockNavigation} />
        </Provider>
      </SafeAreaProvider>
    )

    expect(await screen.findAllByText('Drama')).toHaveLength(3)
    expect(await screen.findByText('Genres')).toBeOnTheScreen()
    expect(await screen.findByText('Sort by')).toBeOnTheScreen()
    expect(await screen.findByText('Year')).toBeOnTheScreen()
    expect(await screen.findByText('Runtime')).toBeOnTheScreen()

    Object.keys(SORT_OPTIONS).forEach(async (item) => {
      expect(await screen.findByText(item)).toBeOnTheScreen()
    })
  })

  it('should display text correctly in "Runtime from" input', async () => {
    const mockStoreState = {
      movies: {
        data: {
          results: []
        }
      }
    }

    const store = getStore(mockStoreState)

    render(
      <SafeAreaProvider>
        <Provider store={store}>
          <Settings navigation={mockNavigation} />
        </Provider>
      </SafeAreaProvider>
    )

    const input = await screen.findByPlaceholderText('From')
    const changedText = '122'

    expect(input).toBeOnTheScreen()

    fireEvent.changeText(input, changedText)

    expect(input.props.value).toBe(changedText)
  })

  it('should display text correctly in "Runtime to" input', async () => {
    const mockStoreState = {
      movies: {
        data: {
          results: []
        }
      }
    }

    const store = getStore(mockStoreState)

    render(
      <SafeAreaProvider>
        <Provider store={store}>
          <Settings navigation={mockNavigation} />
        </Provider>
      </SafeAreaProvider>
    )

    const input = await screen.findByPlaceholderText('To')
    const changedText = '876'

    expect(input).toBeOnTheScreen()

    fireEvent.changeText(input, changedText)

    expect(input.props.value).toBe(changedText)
  })

  it('should display text correctly in "Year" input', async () => {
    const mockStoreState = {
      movies: {
        data: {
          results: []
        }
      }
    }

    const store = getStore(mockStoreState)

    render(
      <SafeAreaProvider>
        <Provider store={store}>
          <Settings navigation={mockNavigation} />
        </Provider>
      </SafeAreaProvider>
    )

    const input = await screen.findByLabelText('Release Year')
    const changedText = '2015'

    expect(input).toBeOnTheScreen()

    fireEvent.changeText(input, changedText)

    expect(input.props.value).toBe(changedText)
  })

  it('should apply filters and navigate back', async () => {
    const mockStoreState = {
      movies: {
        data: {
          results: []
        }
      }
    }

    const store = getStore(mockStoreState)

    jest.spyOn(movieThunks, 'fetchMovies')

    render(
      <SafeAreaProvider>
        <Provider store={store}>
          <Settings navigation={mockNavigation} />
        </Provider>
      </SafeAreaProvider>
    )

    const btn = await screen.findByText('Save')

    fireEvent.press(btn)

    expect(mockNavigation.goBack).toBeCalled()
    expect(movieThunks.fetchMovies).toBeCalled()
  })

  it('should toggle genre filter select', async () => {
    const mockStoreState = {
      genres: {
        data: {
          1: {
            id: 1,
            name: 'Drama'
          },
          2: {
            id: 2,
            name: 'Action'
          },
          3: {
            id: 3,
            name: 'Comedy'
          }
        }
      }
    }

    const store = getStore(mockStoreState)

    render(
      <SafeAreaProvider>
        <Provider store={store}>
          <Settings navigation={mockNavigation} />
        </Provider>
      </SafeAreaProvider>
    )
    const btn1 = await screen.findByText('Action')
    const btn2 = await screen.findByText('Comedy')

    fireEvent.press(btn1)
    fireEvent.press(btn2)

    const genres = Object.values(store.getState().filters.data.genre)
    expect(genres).toHaveLength(2)

    fireEvent.press(btn1)

    const updatedGenres = Object.values(store.getState().filters.data.genre)

    expect(updatedGenres).toHaveLength(1)
  })

  it('should toggle sort filter select', async () => {
    const mockStoreState = {
      filters: {
        data: {
          sort: '',
          runtime: {
            to: '',
            from: ''
          }
        }
      }
    }

    const store = getStore(mockStoreState)

    render(
      <SafeAreaProvider>
        <Provider store={store}>
          <Settings navigation={mockNavigation} />
        </Provider>
      </SafeAreaProvider>
    )
    const btn1 = await screen.findByText('Popularity')
    const btn2 = await screen.findByText('Newest First')

    fireEvent.press(btn1)
    let sort = store.getState().filters.data.sort
    expect(sort).toBe('Popularity')

    fireEvent.press(btn2)
    sort = store.getState().filters.data.sort
    expect(sort).toBe('Newest First')

    fireEvent.press(btn2)
    sort = store.getState().filters.data.sort
    expect(sort).toBeFalsy()
  })
})
