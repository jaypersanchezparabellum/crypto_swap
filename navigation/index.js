import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AppNavigation from './AppNavigation'
import AuthNavigation from './AuthNavigation'

const SwitchNavigator = createSwitchNavigator(
    {
        Auth: AuthNavigation,
        App: AppNavigation
    },
    {
        initialRouteName: 'Auth'
    }
)

const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer 