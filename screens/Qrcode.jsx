import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";

const Qrcode = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const scanOverlay = {
    position: "absolute",
    backgroundColor: "rgba(255,0,0,0.5)",
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
      />
      <View
        style={[scanOverlay, { top: 0, left: 0, width: "25%", bottom: 0 }]}
      />
      <View
        style={[
          scanOverlay,
          { top: 0, left: "25%", right: "25%", height: "25%" },
        ]}
      />
      <View
        style={[
          scanOverlay,
          { bottom: 0, left: "25%", right: "25%", height: "25%" },
        ]}
      />
      <View
        style={[scanOverlay, { top: 0, right: 0, width: "25%", bottom: 0 }]}
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
