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
        <View style={{color:"#1560bd"}}></View>
      <View style={{ marginBottom: 70 }}>
        <View
          style={{
            height: 150,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 15,
            marginTop:40
          }}
        >
          {/* <Image
            source={require("../assets/iconlong.png")}
            style={{ width:"100%", height: 250 }}
          /> */}
        </View>
      </View>
      <View style={styles.draweritem}>
        <MaterialIcons name="star-rate" size={28} color="#1560bd" />
        <Text style={styles.drawertext}>Rate Us</Text>
      </View>
    
      <View style={styles.draweritem}>
        <Ionicons name="document" size={28} color="#1560bd" />
        <Text style={styles.drawertext}>Privacy Policy</Text>
      </View>
      <View style={styles.draweritem}>
        <MaterialIcons name="privacy-tip" size={28} color="#1560bd" />
        <Text style={styles.drawertext}>Disclaimer</Text>
      </View>
      <View style={styles.draweritem}>
        <Entypo name="share" size={28} color="#1560bd" />
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
      marginBottom: 20,
      paddingLeft:20
    },
    drawertext: {
      fontSize: 20,
      fontWeight: "400",
      paddingLeft:20,
      fontStyle:"bold"
    },
  });