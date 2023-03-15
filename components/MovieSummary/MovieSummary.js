import { Text } from '@rneui/base'
import { StyleSheet, View } from 'react-native'
import { AirbnbRating } from '@rneui/themed'
import { colors, sizes, textStyles } from '../../lib/styles'
import { useSelector } from 'react-redux'
import { selectGenreByIds } from '../../redux/selectors/genre.selector'

export const MovieSummary = ({ data: { title, genres, rating, year } }) => {
  const populatedGenres = useSelector(selectGenreByIds(genres))

  const renderGenres = () => {
    return (
      <Text style={textStyles.paragraph}>{populatedGenres?.join(', ')}</Text>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={textStyles.h2}>{title}</Text>
      <AirbnbRating
        showRating={false}
        size={sizes.lg}
        isDisabled={true}
        count={rating}
        defaultRating={rating}
        ratingContainerStyle={styles.ratingContainer}
        selectedColor={colors.primary}
      />
      {renderGenres()}
      <Text style={textStyles.paragraph}>{year}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },

  ratingContainer: {
    alignItems: 'flex-start'
  }
})
