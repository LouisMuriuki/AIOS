import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from 'react'
import AnimatedLottieView from "lottie-react-native";
const navigate = useNavigation();
const Home = () => {
  return (
    <View style={styles.container}>
    <View style={styles.barcodeimg}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height:300,
          width:300,
        }}
      >
        <AnimatedLottieView
          source={require("../assets/barcode-scanner.json")}
          autoPlay
          loop
        />
      </View>  
    </View>
    <View style={styles.info}>
      <Text style={{ fontSize: 24, fontWeight: "900", marginBottom: 20 }}>
        Asset Verifier
      </Text>
      <Text style={{ fontSize: 16 }}>
        Please place the barcode in the image
      </Text>
      <Text style={{ fontSize: 16 }}>view so that we can scan and</Text>
      <Text style={{ fontSize: 16 }}>verify the assets.</Text>
    </View>
    <View style={styles.btncontainer}>
      <Pressable
        onPress={() => navigate.navigate("Scanner")}
        style={styles.Scanbtn}
        android_ripple={{ color: "#FFD994", borderless: true }}
      >
        <Text style={styles.text}>Scan</Text>
      </Pressable>
    </View>
  </View>

  )
}

export default Home

const styles = StyleSheet.create({})