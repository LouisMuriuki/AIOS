import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import CreateCode from "../screens/CreateCode";
import ScanHistory from "../screens/ScanHistory";
import StackNavigator from "./StackNavigator";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Scan" component={StackNavigator} />
      <Tab.Screen name="Create" component={CreateCode} />
      <Tab.Screen name="History" component={ScanHistory} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
