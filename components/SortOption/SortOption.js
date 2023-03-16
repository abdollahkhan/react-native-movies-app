import { Text } from "@rneui/base"
import { StyleSheet, TouchableOpacity } from "react-native"
import Icon  from "react-native-vector-icons/Ionicons"
import { colors, sizes } from "../../lib/styles"

export const  SortOption =({ name, selected, onSelect }) =>{
  return (
    <TouchableOpacity
      style={styles.sortOption}
      activeOpacity={0.7}
      onPress={onSelect}
    >
      <Text>{name}</Text>
      <Icon
        name={selected ? 'checkmark-circle' : 'ellipse-outline'}
        size={sizes.xxl}
        color={selected ? colors.primary : colors.black}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: colors.light,
    borderBottomWidth: 1
  },

})