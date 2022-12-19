import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Button from "../components/reusables/Button";
import React from "react";
import AnimatedLottieView from "lottie-react-native";

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={{ fontSize: 24, fontWeight: "900", marginBottom: 20 }}>
          All in One Scanner
        </Text>
        <Text style={{ fontSize: 16 }}>
          Please place the bar/Qr code in 
        </Text>
        <Text style={{ fontSize: 16 }}>the image view so that we </Text>
        <Text style={{ fontSize: 16 }}>can scan it for you.</Text>
      </View>
      <View style={styles.btncontainer}>
          <Button
        text="QR CODE"
        color="#ffffff"
        elevation={1}
        borderRadius={5}
        marginBottom={40}
        marginHorizontal={30}
        backgroundColor="#FFA500"
        alignItems="center"
        justifyContent="center"
        height={55}
        fontSize={20}
        fontWeight="bold"
        alignSelf="center"
        onPress={()=> navigation.navigate('Qrcode')}
      />
      <Button
        text="BARCODE"
        color="#ffffff"
        elevation={1}
        borderRadius={5}
        marginBottom={90}
        marginHorizontal={30}
        backgroundColor="#FFA500"
        alignItems="center"
        justifyContent="center"
        height={55}
        fontSize={20}
        fontWeight="bold"
        alignSelf="center"
        onPress={()=> navigation.navigate("Barcode")}
      />
      </View>
    
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  barcodeimg: {
    marginTop: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  btncontainer: {
    flex: 1,
  },
 
});
