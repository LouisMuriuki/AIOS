import { Button, Linking, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTime } from "luxon";
import MainModal from "../components/reusables/Modal";
import { ModalContext } from "../context/ModalContext";
import { A } from '@expo/html-elements';
const Qrcode = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState();
  const { mainModal, setMainModal } = useContext(ModalContext);
  const scanOverlay = {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, .6)",
  };
  const [islink, setIslink] = useState(null);
  const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression)
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  // const setObjectValue = async (data, type) => {
  //   const date = new Date();
  //   console.log(date);
  //   try {
  //     const jsonValue = JSON.stringify({
  //       codetype: "Qrcode",
  //       value: data,
  //       type: type,
  //       time: DateTime.toJSDate(date),
  //     });
  //     await AsyncStorage.setItem("scanned", jsonValue);
  //     console.log("scanned.");
  //   } catch (e) {
  //     console.log(e.message);
  //   }

  //   console.log("Done.");
  // };

  const handleBarCodeScanned = ({ type, data }) => {
    // setObjectValue(data, type);
    setScanned(true);
    setData(data);
    setMainModal(true);
  };
  console.log(data)
  useEffect(() => { 
    data?.match(regex) ? Linking.openURL(data)&&setIslink(true) : null
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
        <View style={styles.scanbtn}>
        <Button  title={"Tap to Scan Again"} onPress={() => [setScanned(false),setIslink(null)]} />
        </View>
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
          QRCODE INFORMATION
        </Text>
        {islink===true ? <A href={data} style={{color:"blue", fontSize:18,textDecorationLine:"underline"}}>{data}</A> :
          <Text style={{ whiteSpace: "pre-line", fontSize: 17 }}>
            {data?.typeof === "stringObject"
              ? JSON.stringify(data?.replace(/;/g, "\n"))
              : data?.replace(/;/g, "\n")}
          </Text>}
      </MainModal>
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
  scanbtn:{
    position:"absolute",
    bottom:0,
    width:"100%"
  }
});
