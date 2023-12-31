import { StyleSheet, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'

import Favorites from './screens/Favorites'
import Discover from './screens/Discover'
import Settings from './screens/Settings'

import { colors, sizes } from './lib/styles'
import { Provider } from 'react-redux'
import store from './redux/store'
import { fetchGenres } from './redux/thunks/genres.thunk'
import { fetchMediaConfig } from './redux/thunks/media.thunk'
import { SCREENS } from './lib/constants'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const tabOptions = ({ route }) => ({
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.neutral,
  tabBarIcon: ({ focused, color }) => {
    let iconName
    if (route.name === SCREENS.HOME) {
      if (focused) {
        iconName = 'home'
      } else {
        iconName = 'home-outline'
      }
    }
    if (route.name === SCREENS.DISCOVER) {
      if (focused) {
        iconName = 'compass'
      } else {
        iconName = 'compass-outline'
      }
    }
    if (route.name === SCREENS.FAVOURITES) {
      if (focused) {
        iconName = 'heart'
      } else {
        iconName = 'heart-outline'
      }
    }
    return <Icon name={iconName} size={27} color={color} />
  }
})

const stackOptions = ({ route, navigation }) => ({
  title: route.params?.name,
  headerBackVisible: false,
  headerLeft: ({ canGoBack }) => {
    if (!canGoBack) {
      return null
    }

    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back" size={sizes.xxl} color={colors.black} />
      </TouchableOpacity>
    )
  }
})

const renderSettingsBtn = (navigation) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(SCREENS.SETTINGS)}
      style={styles.button}
    >
      <Icon name="filter" size={sizes.xxl} />
    </TouchableOpacity>
  )
}

function Main() {
  return (
    <Tab.Navigator screenOptions={tabOptions}>
      <Tab.Screen
        name={SCREENS.DISCOVER}
        component={Discover}
        options={({ navigation }) => ({
          headerTitle: SCREENS.DISCOVER,
          headerRight: () => renderSettingsBtn(navigation)
        })}
      />
      <Tab.Screen name={SCREENS.FAVOURITES} component={Favorites} />
    </Tab.Navigator>
  )
}

store.dispatch(fetchGenres())
store.dispatch(fetchMediaConfig())

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={stackOptions}>
            <Stack.Screen
              name={SCREENS.MAIN}
              component={Main}
              options={{ headerShown: false }}
            />
            <Stack.Screen name={SCREENS.SETTINGS} component={Settings} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 5
  }
})

export default App
