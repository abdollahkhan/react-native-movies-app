import Icon from 'react-native-vector-icons/Ionicons'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { FeaturedImage } from '../components'
import EmptyState from '../components/EmptyState'
import { colors, sizes, textStyles } from '../lib/styles'
import { useDispatch, useSelector } from 'react-redux'
import { selectFavourites } from '../redux/selectors/favaourite.selector'
import { removeFavourite } from '../redux/reducers/favourite.reducer'
import {
  selectMediaBaseUrl,
  selectMediaSizes
} from '../redux/selectors/media.selector'
import { SCREENS } from '../lib/constants'

export default function Favorites({ navigation }) {
  const favourites = useSelector(selectFavourites)
  const dispatch = useDispatch()

  const mediaUrl = useSelector(selectMediaBaseUrl)
  const mediaSizes = useSelector(selectMediaSizes)

  const isEmpty = favourites.length === 0

  const removeFav = (id) => {
    dispatch(removeFavourite(id))
  }

  return (
    <ScrollView
    style={{backgroundColor: colors.white}}
      contentContainerStyle={[isEmpty && styles.empty, styles.container]}
    >
      {(isEmpty && (
        <EmptyState
          image={require('../assets/empty-favorites.jpg')}
          title="You haven't liked any movie yet"
          message="Why not try to find a movie you like?"
          actionLabel="Go to Discover"
          onAction={() => navigation.navigate(SCREENS.DISCOVER)}
        />
      )) ||
        favourites?.map((fav) => {
          return (
            <View style={styles.column} key={fav.id}>
              <TouchableOpacity
                style={styles.favIconContainer}
                onPress={() => removeFav(fav.id)}
              >
                <Icon
                  name={'heart'}
                  size={sizes.xxl}
                  color={colors.primary}
                  style={styles.favIcon}
                />
              </TouchableOpacity>
              <FeaturedImage
                src={`${mediaUrl}${mediaSizes?.[2]}${fav.posterPath}`}
              />
              <Text style={textStyles.h3}>{fav.title}</Text>
            </View>
          )
        })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '100%',
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: colors.white
  },

  empty: {
    justifyContent: 'center'
  },

  column: {
    width: '48%',
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
    padding: 15,
    backgroundColor: colors.white,
    zIndex: 2,
    borderRadius: 25
  }
})
