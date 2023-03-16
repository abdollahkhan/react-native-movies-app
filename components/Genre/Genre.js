import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import { colors, sizes } from '../../lib/styles'
import { checkSeletedGenre } from '../../redux/selectors/filter.selector'

export const Genre = ({ name, onSelect, id }) => {
  
  const isSelected = useSelector(checkSeletedGenre(id))

  const handleClick = ()=>{
    onSelect(id,isSelected)
  }
  

  return (
    <TouchableOpacity
      style={[styles.genre, isSelected ? styles.selectedGenre : undefined]}
      activeOpacity={0.7}
      onPress={handleClick}
    >
      <Text style={[isSelected ? styles.selectedGenreText : undefined]}>
        {name}
      </Text>
      {isSelected && (
        <Icon name="close-outline" size={sizes.lg} color={colors.white} />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
  selectedGenre: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  selectedGenreText: {
    color: colors.white
  }
})
