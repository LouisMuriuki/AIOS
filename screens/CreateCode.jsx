import { StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Camera } from 'expo-camera';
import DropDownPicker from "react-native-dropdown-picker";
import Button from "../components/reusables/Button";
import QRcodeGen from "../components/reusables/QRcodeGen";
import Barcode from "react-native-barcode-svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Print from "expo-print";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from "expo-file-system";
const CreateCode = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();
  const [value, setValue] = useState("qrcode");
  const [pressed, setPressed] = useState(0);
  const [contact, setContact] = useState({ name: "", number: "" });
  const [items, setItems] = useState([
    { label: "Barcode", value: "barcode" },
    { label: "QRcode", value: "qrcode" },
  ]);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  let dataUrl = "";
  console.log(input);
  const [pressableitems, setPressableItems] = useState([
    "Text",
    "Contact",
    "Link",
  ]);
  const [pressablevalue, setPressableValue] = useState("Text");
  const [qRref, setQRref] = useState();
  const ref = useRef();
  useEffect(() => {
    if (pressablevalue === "Contact") {
      const firstRender = ref.current;
      if (firstRender) {
        ref.current = false;
      } else {
        setInput([contact]);
      }
    }
  }, [contact]);

  const getDataURL = () => {
    qRref?.toDataURL(callback);
  };

  function callback(dataURL) {
    dataUrl = dataURL;
  }
  saveFile = async (fileUri) => {
    if (permission === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
    }
  };
  const downloadFile = async () => {
    getDataURL();
    try {
      let filePath = await Print.printToFileAsync({
        html:
          ' <div style = "margin-top: 40%; margin-left: 30%;"><h2 style = "margin-left: 50px; font-size: 45px;">LetMeIn</h2>' +
          '<img src="' +
          dataUrl +
          '"' +
          'alt="Red dot" style = "margin-left: 20px; margin-top: 10px;" />' +
          "</div>",
        width: 612,
        height: 792,
      });

      const pdfName = `${filePath.uri.slice(
        0,
        filePath.uri.lastIndexOf("/") + 1
      )}QRCode.pdf`;

      await FileSystem.moveAsync({
        from: filePath.uri,
        to: pdfName,
      });

      console.log("PDF Generated", pdfName);
      saveFile(dataUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const download = () => {
    if (value === "qrcode") {
      console.log("i run");
      downloadFile();
    } else if (value === "barcode") {
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
        <View style={styles.topcontainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              marginHorizontal: 80,
              marginBottom: 20,
            }}
          >
            {pressableitems.map((items, i) => {
              return (
                <Button
                  text={items}
                  key={i}
                  width={70}
                  height={45}
                  borderRadius={5}
                  borderWidth={1}
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="row"
                  fontSize={18}
                  rippleColor="#FFA500"
                  backgroundColor={pressed === i ? "#FFA500" : "#d3d3d3"}
                  borderColor={pressed === i ? "#FFA500" : "#d3d3d3"}
                  color="#ffffff"
                  onPress={() => {
                    [setPressableValue(items), setPressed(i)];
                  }}
                />
              );
            })}
          </View>
          <View style={styles.dropdown}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>

          {pressed === 0 ? (
            <TextInput
              placeholder="Enter text"
              values={input}
              onChangeText={(e) => setInput(e)}
              autoCorrect={false}
              style={styles.input}
            ></TextInput>
          ) : null}
          {pressed === 1 ? (
            <>
              <TextInput
                placeholder="Contact Name"
                values={input}
                onChangeText={(e) =>
                  setContact((prev) => ({ ...prev, name: e }))
                }
                autoCorrect={false}
                style={styles.input}
              ></TextInput>
              <TextInput
                placeholder="Phone Number"
                values={input}
                onChangeText={(e) =>
                  setContact((prev) => ({ ...prev, Number: e }))
                }
                autoCorrect={false}
                style={styles.input}
              ></TextInput>
            </>
          ) : null}
          {pressed === 2 ? (
            <TextInput
              placeholder="Enter url"
              values={input}
              onChangeText={(e) => setInput(e)}
              autoCorrect={false}
              style={styles.input}
            ></TextInput>
          ) : null}
        </View>
        <View style={styles.bottom}>
          {value === "qrcode" ? (
            input ? (
              <View style={styles.qrcode}>
                <QRcodeGen value={input} getRef={(e) => setQRref(e)} />
              </View>
            ) : null
          ) : input ? (
            <View style={styles.barcode}>
              <Barcode
                value={input}
                maxWidth={300}
                height={120}
                format="CODE128"
                onError={() => {
                  ToastAndroid.show(
                    "Barcode Contact not supported!",
                    ToastAndroid.SHORT
                  );
                }}
              />
            </View>
          ) : null}

          {input ? (
            <Button
              text="Save"
              color="#ffffff"
              elevation={1}
              borderRadius={5}
              marginBottom={40}
              marginTop={50}
              marginHorizontal={10}
              paddingHorizontal={20}
              backgroundColor="#FFA500"
              alignItems="center"
              justifyContent="center"
              height={45}
              fontSize={20}
              fontWeight="bold"
              onPress={() => {
                download();
              }}
            />
          ) : null}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CreateCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  dropdown: {
    marginBottom: 90,
    marginHorizontal: 30,
  },
  input: {
    borderColor: "#1560bd",
    borderWidth: 1,
    padding: 10,
    width: 300,
    height: 45,
    backgroundColor: "#ffffff",
    fontSize: 16,
    borderRadius: 5,
    marginBottom: 50,
  },
  bottomcontainer: {
    flex: 1,
  },
  qrcode: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  barcode: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    marginTop: 80,
  },
});
