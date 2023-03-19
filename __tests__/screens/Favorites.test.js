import React from 'react'
import Favorites from '../../screens/Favorites'
import { configureStore } from '@reduxjs/toolkit'
import favouriteReducer from '../../redux/reducers/favourite.reducer'
import mediaReducer from '../../redux/reducers/media.reducer'
import { Provider } from 'react-redux'
import {
  render,
  screen,
  fireEvent,
  cleanup
} from '@testing-library/react-native'
import { SCREENS } from '../../lib/constants'

describe('Favorites Screen', () => {
  const getStore = (initialState) => {
    const store = configureStore({
      reducer: { favourites: favouriteReducer, media: mediaReducer },
      preloadedState: initialState
    })

    return store
  }

  afterEach(() => {
    jest.restoreAllMocks()
    cleanup()
  })

  const mockNavigation = {
    navigate: jest.fn()
  }

  it('renders correctly when favourites is empty', async () => {
    const store = getStore({
      favourites: {
        data: {}
      }
    })

    render(
      <Provider store={store}>
        <Favorites navigation={mockNavigation} />
      </Provider>
    )

    expect(
      await screen.findByText('Why not try to find a movie you like?')
    ).toBeDefined()
    expect(screen).toMatchSnapshot()
  })

  it('should navigate to discover screen when favourites is empty', async () => {
    const store = getStore({
      favourites: {
        data: {}
      }
    })

    render(
      <Provider store={store}>
        <Favorites navigation={mockNavigation} />
      </Provider>
    )

    fireEvent(screen.getByText('Go to Discover'), 'click')
    expect(mockNavigation.navigate).toBeCalledWith(SCREENS.DISCOVER)
  })

  it('renders correctly when favourites is not empty', async () => {
    const store = getStore({
      favourites: {
        data: {
          1: {
            id: 1,
            title: 'Mock Movie',
            posterPath: '/posterPath1.jpg'
          },
          2: {
            id: 2,
            title: 'Mock Movie',
            posterPath: '/posterPath2.jpg'
          }
        }
      }
    })

    render(
      <Provider store={store}>
        <Favorites navigation={mockNavigation} />
      </Provider>
    )

    expect(await screen.findAllByText('Mock Movie')).toHaveLength(2)
    expect(screen).toMatchSnapshot()
  })

  it('should remove a item from favourites', async () => {
    const store = getStore({
      favourites: {
        data: {
          1: {
            id: 1,
            title: 'Mock Movie',
            posterPath: '/posterPath1.jpg'
          },
          2: {
            id: 2,
            title: 'Mock Movie',
            posterPath: '/posterPath2.jpg'
          }
        }
      }
    })

    render(
      <Provider store={store}>
        <Favorites navigation={mockNavigation} />
      </Provider>
    )

    expect(await screen.findAllByText('Mock Movie')).toHaveLength(2)
    fireEvent(screen.getAllByLabelText('Remove Favorite Button')[0], 'click')

    const favs = Object.values(store.getState().favourites.data)
    expect(favs).toHaveLength(1)
  })
})
