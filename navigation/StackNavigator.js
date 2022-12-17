import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Barcode from '../screens/Barcode';
import Qrcode from '../screens/Qrcode';
const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Barcode" component={Barcode}/>
        <Stack.Screen name="Qrcode" component={Qrcode}/>
    </Stack.Navigator>
  )
}

export default StackNavigator