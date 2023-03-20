import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { MovieSummary } from '../MovieSummary'
import { FeaturedImage } from '../'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors, sizes } from '../../lib/styles'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToFavourites,
  removeFavourite
} from '../../redux/reducers/favourite.reducer'
import { checkFavourite } from '../../redux/selectors/favaourite.selector'

export const Movie = ({
  id,
  title,
  imageUri,
  genres,
  year,
  rating,
  posterPath
}) => {
  const dispatch = useDispatch()

  const isFavourite = useSelector(checkFavourite(id))

  const toggleFavourite = () => {
    isFavourite
      ? dispatch(removeFavourite(id))
      : dispatch(addToFavourites({ id, title, posterPath }))
  }

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <TouchableOpacity
          style={styles.favIconContainer}
          onPress={toggleFavourite}
          accessibilityLabel="Toggle Favorite Button"
        >
          <Icon
            name={isFavourite ? 'heart' : 'heart-outline'}
            size={sizes.xl}
            color={colors.primary}
            style={styles.favIcon}
          />
        </TouchableOpacity>
        <FeaturedImage src={imageUri} />
      </View>
      <View style={styles.content}>
        <MovieSummary data={{ title, genres, year, rating }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { width: '100%', flexDirection: 'row', padding: 10 },

  image: {
    width: '30%',
    position: 'relative'
  },

  content: {
    width: '70%'
  },

  favIcon: {
    position: 'absolute',
    top: 2,
    bottom: 0,
    left: 3,
    right: 0
  },

  favIconContainer: {
    position: 'absolute',
    right: 5,
    top: 5,
    padding: 12,
    backgroundColor: colors.white,
    zIndex: 2,
    borderRadius: 25
  }
})
