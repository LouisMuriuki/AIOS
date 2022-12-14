import { Button, Linking, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTime } from "luxon";
import { ModalContext } from "../context/ModalContext";
import MainModal from "../components/reusables/Modal";
import { A } from '@expo/html-elements';
const Barcode = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState();
  const { mainModal, setMainModal } = useContext(ModalContext);
  const [data, setData] = useState();
  const [islink, setIslink] = useState(false);
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression)
  // const setObjectValue = async (data, type) => {
  //   const date = new Date();

  //   try {
  //     const jsonValue = JSON.stringify({
  //       codetype: "Barcode",
  //       value: data,
  //       type: type,
  //       time: DateTime.toJSDate(date),
  //     });
  //     await AsyncStorage.setItem("scanned", jsonValue);
  //   } catch (e) {
  //     // save error
  //   }

  //   console.log("Done.");
  // };

  const handleBarCodeScanned = ({ type, data }) => {
    // setObjectValue(data, type);
    setScanned(true);
    setData(data);
    setMainModal(true);
  };
  useEffect(() => {
    data?.match(regex) ? Linking.openURL(data)&&setIslink(true): null
  }, [data])
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
        style={[StyleSheet.absoluteFillObject, styles.minicontainer]}
      />
      <View style={styles.layerTop} />
      <View style={styles.layerCenter}>
        <View style={styles.layerLeft} />
        <View style={styles.focused} />
        <View style={styles.layerRight} />
      </View>
      <View style={styles.layerBottom} />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => [setScanned(false),setIslink(null)] }/>
      )}
      <MainModal>
        <Text
          style={{
            justifyContent: "center",
            alignItems: "center",
            fontSize: 20,
            textDecorationLine: "underline",
            marginBottom: 20,
          }}
        >
          BARCODE INFORMATION
        </Text>
        {islink===true ? <A href={data} style={{color:"blue", fontSize:18,textDecorationLine:"underline"}}>{data}</A> : <Text style={{ whiteSpace: "pre-line", fontSize: 17 }}>
          {data?.replace(/;/g, "\n")}
        </Text>}


      </MainModal>
    </View>
  );
};

export default Barcode;
const opacity = "rgba(0, 0, 0, .6)";
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
  layerTop: {
    flex: 2,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 1,
    flexDirection: "row",
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  focused: {
    flex: 10,
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity,
  },
});
