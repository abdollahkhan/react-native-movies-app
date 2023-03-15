import { Image, Skeleton } from '@rneui/themed'
import { StyleSheet } from 'react-native'

export const FeaturedImage = ({ src }) => {
  return (
    <Image
      source={{
        uri: src
      }}
      containerStyle={styles.container}
      PlaceholderContent={<Skeleton style={styles.skeleton} animation="wave" />}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1 / 1.4,
    borderRadius: 12
  },

  skeleton: {
    height: '100%',
    width: '100%'
  }
})
