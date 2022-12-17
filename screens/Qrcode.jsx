import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTime } from "luxon";
const Qrcode = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const scanOverlay = {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, .6)",
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const setObjectValue = async (data, type) => {
    const date = new Date();
    console.log(date);
    try {
      const jsonValue = JSON.stringify({
        codetype: "Qrcode",
        value: data,
        type: type,
        time: DateTime.toJSDate(date),
      });
      await AsyncStorage.setItem("scanned", jsonValue);
      console.log("scanned.");
    } catch (e) {
      console.log(e.message);
    }

    console.log("Done.");
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setObjectValue(data, type);
    setScanned(true);
    alert(`QRCODE with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
      />
      <View
        style={[scanOverlay, { top: 0, left: 0, width: "5%", bottom: 0 }]}
      />
      <View
        style={[
          scanOverlay,
          { top: 0, left: "5%", right: "5%", height: "25%" },
        ]}
      />
      <View
        style={[
          scanOverlay,
          { bottom: 0, left: "5%", right: "5%", height: "25%" },
        ]}
      />
      <View
        style={[scanOverlay, { top: 0, right: 0, width: "5%", bottom: 0 }]}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

export default Qrcode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  minicontainer: {
    flex: 1,
    flexDirection: "column",
  },
});
