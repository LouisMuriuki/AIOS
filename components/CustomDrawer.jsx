import { StyleSheet, Text, View, Image } from "react-native";
import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
const CustomDrawer = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginBottom: 20 }}>
        <View
          style={{
            height: 300,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop:0,
            backgroundColor:"#FF7D54"
          }}
        >
          <Image
            source={require("../assets/drawericon.png")}
            style={{ width:"100%", height: 270 }}
          />
        </View>
      </View>
      <View style={styles.draweritem}>
        <MaterialIcons name="star-rate" size={28} color="#FF7D54" />
        <Text style={styles.drawertext}>Rate Us</Text>
      </View>
      <View style={styles.draweritem}>
        <MaterialIcons name="privacy-tip" size={28} color="#FF7D54" />
        <Text style={styles.drawertext}>Disclaimer</Text>
      </View>
      <View style={styles.draweritem}>
        <Entypo name="share" size={28} color="#FF7D54" />
        <Text style={styles.drawertext}>Share with Friends</Text>
      </View>
    </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({
    draweritem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 30,
      paddingLeft:20
    },
    drawertext: {
      fontSize: 20,
      fontWeight: "400",
      paddingLeft:20,
      fontStyle:"bold"
    },
  });