import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateCode from "../screens/CreateCode";
import ScanHistory from "../screens/ScanHistory";
import StackNavigator from "./StackNavigator";
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Scan" component={StackNavigator}  options={{
      tabBarLabel: 'Scan',
      tabBarIcon: () => (
        <Ionicons name="scan" size={24} color="black" />
      ),
    }}/>
      <Tab.Screen name="Create" component={CreateCode}  options={{
      tabBarLabel: 'Create',
      tabBarIcon: () => (
        <Ionicons name="create" size={24} color="black" />
      ),
    }}/>
      {/* <Tab.Screen name="History" component={ScanHistory}  options={{
      tabBarLabel: 'History',
      tabBarIcon: () => (
        <MaterialIcons name="history" size={24} color="black" />
      ),
    }}/> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
