import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ViewShot, { captureRef } from "react-native-view-shot";
import DropDownPicker from "react-native-dropdown-picker";
import Button from "../components/reusables/Button";
import QRcodeGen from "../components/reusables/QRcodeGen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import Barcode from "@kichiyaki/react-native-barcode-generator";
const CreateCode = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [value, setValue] = useState("qrcode");
  const [pressed, setPressed] = useState(0);
  const [textinput, setTextInput] = useState("");
  const [linkinput, setLinkInput] = useState("");
  const [requestpermission, setRequestPermission] = useState(false);
  const [contact, setContact] = useState({ name: '', number: '' });
  const [items, setItems] = useState([
    { label: "BARCODE", value: "barcode" },
    { label: "QRCODE", value: "qrcode" },
  ]);

  const [hasmediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(null);
  const [pressableitems, setPressableItems] = useState([
    "Text",
    "Contact",
    "Link",
  ]);
  const [pressablevalue, setPressableValue] = useState("Text");
  const [qRref, setQRref] = useState();
  const BarcodeRef = useRef();
  const QRref = useRef();
  const renderref = useRef();
  useEffect(() => {
    const firstrender = renderref.current;
    if (firstrender) {
      renderref.current = false;
    } else {
      const getmedialibrarypermission = async () => {
        const mediaLibraryPermission =
          await MediaLibrary.requestPermissionsAsync();
        setHasMediaLibraryPermission(
          mediaLibraryPermission.status === "granted"
        );
      };
      getmedialibrarypermission();
    }
  }, [requestpermission]);

  const ShareCode = async () => {
    try {
      const uri = await captureRef(value === "qrcode" ? QRref : BarcodeRef, {
        format: "png",
        quality: 1,
      });
      console.log(uri);
      await Sharing.shareAsync(uri).then(() => {});
    } catch (error) {
      console.log(error);
    }
  };

  const saveFile = async () => {
    try {
      const uri = await captureRef(value === "qrcode" ? QRref : BarcodeRef, {
        format: "png",
        quality: 0.8,
      });
      console.log(uri);
      await MediaLibrary.saveToLibraryAsync(uri).then(() => {
        ToastAndroid.show(
          value === "qrcode"
            ? "Saved QRcode to Gallery"
            : "Saved Barcode to Gallery",
          ToastAndroid.LONG
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (pressablevalue === "Contact") {
      if (contact?.name?.length > 0 || contact?.number?.length > 0) {
        let contactarray = [];
        contactarray.push(contact);
        setInput(contactarray);
      } else {
        setInput("");
      }
    }
  }, [contact?.name, contact?.number, pressablevalue]);

  useEffect(() => {
    if (pressablevalue === "Link") {
      setInput(linkinput);
    }
  }, [linkinput, pressablevalue]);

  useEffect(() => {
    if (pressablevalue === "Text") {
      setInput(textinput);
    }
  }, [textinput, pressablevalue]);

  console.log(input)

  if (hasmediaLibraryPermission === null) {
    return <Text>Requesting for media storage permission</Text>;
  }
  if (hasmediaLibraryPermission === false) {
    return <Text>No access to media storage</Text>;
  }
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
        <View style={styles.topcontainer}>
          <ScrollView
            horizontal={true}
            style={{
              flexDirection: "row",
              width: "100%",
              marginHorizontal: 80,
              marginBottom: 20,
            }}
            contentContainerStyle={{
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {pressableitems.map((items, i) => {
              return (
                <Button
                  text={items}
                  key={i}
                  width={90}
                  height={32}
                  borderRadius={35}
                  borderWidth={1}
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="row"
                  fontSize={18}
                  rippleColor="#FF7D54"
                  backgroundColor={pressed === i ? "#FF7D54" : "#d3d3d3"}
                  borderColor={pressed === i ? "#FF7D54" : "#d3d3d3"}
                  color={pressed === i ? "#FFFFFF" : "#303030"}
                  onPress={() => {
                    [setPressableValue(items), setPressed(i)];
                  }}
                />
              );
            })}
          </ScrollView>
          <View style={styles.dropdown}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              listMode="SCROLLVIEW"
            />
          </View>

          {pressed === 0 ? (
            <TextInput
              placeholder="Enter text..."
              placeholderTextColor="#FF7D54"
              value={textinput}
              onChangeText={(e) => setTextInput(e)}
              autoCorrect={false}
              style={styles.input}
            ></TextInput>
          ) : null}
          {pressed === 1 ? (
            <>
              <TextInput
                placeholder="Contact Name"
                value={contact.name}
                placeholderTextColor="#FF7D54"
                onChangeText={(e) =>
                  setContact((prev) => ({ ...prev, name: e }))
                }
                autoCorrect={false}
                style={styles.input}
              ></TextInput>
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor="#FF7D54"
                value={contact.number}
                onChangeText={(e) =>
                  setContact((prev) => ({ ...prev, number: e }))
                }
                autoCorrect={false}
                style={styles.input}
              ></TextInput>
            </>
          ) : null}
          {pressed === 2 ? (
            <TextInput
              placeholder="Enter url..."
              placeholderTextColor="#FF7D54"
              value={linkinput}
              onChangeText={(e) => setLinkInput(e)}
              autoCorrect={false}
              style={styles.input}
            ></TextInput>
          ) : null}
        </View>
        <View style={styles.bottom}>
          {value === "qrcode" ? (
            input ? (
              <View style={styles.qrcode}>
                <ViewShot style={{ margin: 20 }} ref={QRref}>
                  <QRcodeGen value={`${input}`} getRef={(e) => setQRref(e)} />
                </ViewShot>
              </View>
            ) : null
          ) : input ? (
            <View style={styles.barcode}>
              <ViewShot style={{ margin: 20 }} ref={BarcodeRef}>
                <Barcode
                  value={input}
                  maxWidth={300}
                  height={120}
                  format="CODE128"
                  onError={() => {
                    ToastAndroid.show(
                      "Unfortunately, Barcode does not supported contact Information!",
                      ToastAndroid.LONG
                    );
                  }}
                />
              </ViewShot>
            </View>
          ) : null}
          {input ? (
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-around",
                alignItems: "center",
                marginLeft: 45,
              }}
            >
              <Button
                text="Save"
                color="#ffffff"
                icon="download"
                iconcolor="#fff"
                iconsize={20}
                elevation={1}
                borderRadius={5}
                marginBottom={40}
                marginTop={50}
                paddingHorizontal={20}
                backgroundColor="#FF7D54"
                alignItems="center"
                justifyContent="center"
                flexDirection="row"
                height={45}
                fontSize={20}
                fontWeight="bold"
                onPress={() => {
                  [setRequestPermission((prev) => !prev), saveFile()];
                }}
              />
              <Button
                text="Share"
                color="#ffffff"
                elevation={1}
                icon="sharealt"
                iconcolor="#fff"
                iconsize={20}
                borderRadius={5}
                marginBottom={40}
                marginTop={50}
                flexDirection="row"
                paddingHorizontal={20}
                backgroundColor="#FF7D54"
                alignItems="center"
                justifyContent="center"
                height={45}
                fontSize={20}
                fontWeight="bold"
                onPress={() => {
                  ShareCode();
                }}
              />
            </View>
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
    marginBottom: 50,
    marginHorizontal: 30,
  },
  input: {
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    width: 300,
    height: 45,
    backgroundColor: "#ffffff",
    fontSize: 16,
    borderRadius: 5,
    marginBottom: 20,
  },
  bottomcontainer: {
    flex: 1,
  },
  qrcode: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 40,
  },
  barcode: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    marginTop: 80,
  },
});
