import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';
const AppStack = () => {
  return (
    <NavigationContainer>
        <DrawerNavigator/>
    </NavigationContainer>
  )
}

export default AppStack