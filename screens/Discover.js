import { useEffect, useRef } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Movie } from '../components'

import EmptyState from '../components/EmptyState'
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
      {(movies && (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.title+new Date().getDate()}
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
          renderItem={({ item }) => {
            return (
              <Movie
              key={item.id}
                id={item.id}
                genres={item.genre_ids}
                title={item.title}
                year={new Date(item.release_date).getFullYear()}
                imageUri={`${mediaUrl}${mediaSizes?.[0]}${item.poster_path}`}
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
          onAction={() => navigation.navigate('Settings')}
        />
      )}
    </View>
  )
}
