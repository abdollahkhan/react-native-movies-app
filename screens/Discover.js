import { useEffect, useRef } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Movie } from '../components'
import EmptyState from '../components/EmptyState'
import { SCREENS } from '../lib/constants'
import { containerStyles } from '../lib/styles'
import {
  selectMediaBaseUrl,
  selectMediaSizes
} from '../redux/selectors/media.selector'
import { selectAllmovies } from '../redux/selectors/movies.selector'
import { fetchMovies } from '../redux/thunks/movies.thunk'

export default function Discover({ navigation }) {
  const movies = useSelector(selectAllmovies)
  const mediaUrl = useSelector(selectMediaBaseUrl)
  const mediaSizes = useSelector(selectMediaSizes)

  const onEndReachedCalledDuringMomentum = useRef(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  const ListFooter = () => {
    return <ActivityIndicator />
  }

  const loadMoreMovies = () => {
    dispatch(fetchMovies('paginate'))
  }

  return (
    <View style={containerStyles}>
      {(movies?.length > 0 && (
        <FlatList
          data={movies}
          keyExtractor={(item, index) => `${item.id + index}`}
          ListFooterComponent={ListFooter}
          onEndReached={() => {
            if (!onEndReachedCalledDuringMomentum.current) {
              loadMoreMovies()
              onEndReachedCalledDuringMomentum.current = true
            }
          }}
          onEndReachedThreshold={0.1}
          onMomentumScrollBegin={() =>
            (onEndReachedCalledDuringMomentum.current = false)
          }
          accessibilityLabel="List of Movies"
          renderItem={({ item }) => {
            return (
              <Movie
                id={item.id}
                genres={item.genre_ids}
                title={item.title}
                year={new Date(item.release_date).getFullYear()}
                imageUri={`${mediaUrl}${mediaSizes?.[0]}${item.poster_path}`}
                posterPath={item.poster_path}
                rating={item.vote_average}
              />
            )
          }}
        />
      )) || (
        <EmptyState
          image={require('../assets/empty-discover.jpg')}
          title="No results found"
          message="Try adjusting the settings"
          actionLabel="Go to Settings"
          onAction={() => navigation.navigate(SCREENS.SETTINGS)}
        />
      )}
    </View>
  )
}
