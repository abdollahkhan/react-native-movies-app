import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { Genre, SortOption } from '../components'
import { SORT_OPTIONS } from '../lib/constants'

import {
  colors,
  containerStyles,
  fontWeights,
  sizes,
  textStyles
} from '../lib/styles'
import {
  addSortFilter,
  addYearFilter,
  removeGenreFilter,
  removeSortFilter,
  addGenreFilter,
  addRuntimeFromFilter,
  addRuntimeToFilter
} from '../redux/reducers/filters.reducer'
import {
  selectRuntimeFromFilter,
  selectRuntimeToFilter,
  selectSortFilter,
  selectYearFilter
} from '../redux/selectors/filter.selector'
import { selectAllgenre } from '../redux/selectors/genre.selector'
import { fetchMovies } from '../redux/thunks/movies.thunk'

export default function Settings({ navigation }) {
  const insets = useSafeAreaInsets()
  const dispatch = useDispatch()

  const year = useSelector(selectYearFilter)
  const runtimeFrom = useSelector(selectRuntimeFromFilter)
  const runtimeTo = useSelector(selectRuntimeToFilter)

  return (
    <View
      style={[
        containerStyles,
        {
          paddingBottom: insets.bottom
        }
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.wrapper}>
          <View>
            <Text style={textStyles.h2}>Sort by</Text>
            <View>
              <SortOptions />
            </View>
          </View>
          <View>
            <Text style={textStyles.h2}>Genres</Text>
            <View style={styles.genreList}>
              <Genres />
            </View>
          </View>
          <View>
            <Text style={textStyles.h2}>Year</Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              maxLength={4}
              value={year}
              onChangeText={(val) => dispatch(addYearFilter(val))}
            />
          </View>
          <View>
            <Text style={textStyles.h2}>Runtime</Text>
            <View style={styles.runtime}>
              <TextInput
                keyboardType="number-pad"
                style={styles.input}
                placeholder="From"
                placeholderTextColor={colors.neutral}
                maxLength={3}
                value={runtimeFrom}
                onChangeText={(val) => dispatch(addRuntimeFromFilter(val))}
              />
              <Text style={textStyles.small}>-</Text>
              <TextInput
                keyboardType="number-pad"
                style={styles.input}
                placeholder="To"
                placeholderTextColor={colors.neutral}
                maxLength={3}
                value={runtimeTo}
                onChangeText={(val) => dispatch(addRuntimeToFilter(val))}
              />
              <Text style={textStyles.small}>minutes</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            underlayColor={colors.neutral}
            style={styles.button}
            onPress={() => {
              dispatch(fetchMovies())
              navigation.goBack()
            }}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const SortOptions = () => {
  const dispatch = useDispatch()
  const sortFilter = useSelector(selectSortFilter)

  return Object.keys(SORT_OPTIONS).map((item) => {
    return (
      <SortOption
        key={item}
        name={item}
        selected={item === sortFilter}
        onSelect={() =>
          SORT_OPTIONS[item] !== sortFilter && item !== sortFilter
            ? dispatch(addSortFilter(item))
            : dispatch(removeSortFilter())
        }
      />
    )
  })
}

const Genres = () => {
  const dispatch = useDispatch()

  const genres = useSelector(selectAllgenre)

  const toggleGenreSelect = (id, isSelected) => {
    isSelected ? dispatch(removeGenreFilter(id)) : dispatch(addGenreFilter(id))
  }

  const handleSelect = (id, isSelected) => toggleGenreSelect(id, isSelected)

  return Object.values(genres)?.map((genre) => {
    return (
      <Genre
        key={genre.id}
        id={genre.id}
        name={genre.name}
        onSelect={handleSelect}
      />
    )
  })
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    gap: 30
  },

  input: {
    backgroundColor: colors.light,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 14,
    width: 80
  },

  genreList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },

  genre: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center'
  },

  runtime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },

  buttonContainer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.light,
    paddingVertical: 16,
    paddingHorizontal: 30
  },

  button: {
    backgroundColor: colors.black,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center'
  },

  buttonText: {
    color: colors.white,
    fontWeight: fontWeights.bold,
    fontSize: sizes.md
  },

  keyboardView: {
    flex: 1
  }
})
