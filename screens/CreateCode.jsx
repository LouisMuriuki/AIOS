import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import Button from "../components/reusables/Button";
import QRcodeGen from "../components/reusables/QRcodeGen";
import Barcode from "react-native-barcode-svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const CreateCode = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [value, setValue] = useState("qrcode");
  const [items, setItems] = useState([
    { label: "Barcode", value: "barcode" },
    { label: "QRcode", value: "qrcode" },
  ]);
  const [qRref, setQRref] = useState();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
        <View style={styles.topcontainer}>
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

          <TextInput
            placeholder="QR/Barcode value"
            values={input}
            onChangeText={(e) => setInput(e)}
            autoCorrect={false}
            style={styles.input}
          ></TextInput>
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
              <Barcode value={input} maxWidth={300} height={1220} format="CODE128" />
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
    marginTop:50,
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
