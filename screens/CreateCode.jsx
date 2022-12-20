import { StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import DropDownPicker from "react-native-dropdown-picker";
import Button from "../components/reusables/Button";
import QRcodeGen from "../components/reusables/QRcodeGen";
import Barcode from "react-native-barcode-svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
const CreateCode = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [value, setValue] = useState("qrcode");
  const [pressed, setPressed] = useState(0);
  const [textinput, setTextInput] = useState("");
  const [linkinput, setLinkInput] = useState("");
  const [contact, setContact] = useState({ name: "", number: "" });
  const [items, setItems] = useState([
    { label: "BARCODE", value: "barcode" },
    { label: "QRCODE", value: "qrcode" },
  ]);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  console.log(input);
  console.log(pressed);
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
      if (contact?.name?.length > 0 || contact?.number?.length > 0) {
        setInput([contact]);
      } else {
        setInput("");
      }
    }
  }, [contact.name, contact.number, pressablevalue]);

  useEffect(() => {
    if (pressablevalue === "Link") {
      setInput(linkinput);
    }
  }, [linkinput, pressablevalue]);
  console.log("link " + linkinput);

  useEffect(() => {
    if (pressablevalue === "Text") {
      setInput(textinput);
    }
  }, [textinput, pressablevalue]);

  console.log("text " + textinput);

  const saveFile = async (fileUri) => {
    if (permission === "granted") {
      console.log(fileUri)
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
      console.log("generated")
    }
    console.log(fileUri)
  };

  const download = () => {
    console.log("fisrt run")
    try {
      if (value === "qrcode") {
        saveFile(qRref?.toDataURL());
        console.log("trying to save")
      } else if (value === "barcode") {
      }
    } catch (error) {
      console.error(error);
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
          </View>
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
                    "Unfortunately Barcode does not supported contact Information!",
                    ToastAndroid.LONG
                  );
                }}
              />
            </View>
          ) : null}

          {/* {input ? (
            <Button
              text="Save"
              color="#ffffff"
              elevation={1}
              borderRadius={5}
              marginBottom={40}
              marginTop={50}
              marginHorizontal={10}
              paddingHorizontal={20}
              backgroundColor="#FF7D54"
              alignItems="center"
              justifyContent="center"
              height={45}
              fontSize={20}
              fontWeight="bold"
              onPress={() => {
                download();
              }}
            />
          ) : null} */}
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
