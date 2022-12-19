import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import Button from "../components/reusables/Button";
import QRcodeGen from "../components/reusables/QRcodeGen";
import Barcode from "react-native-barcode-svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const CreateCode = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [value, setValue] = useState("qrcode");
  const [pressed, setPressed] = useState(false);
  const [contact, setContact] = useState({ name: "", number: "" });
  const [items, setItems] = useState([
    { label: "Barcode", value: "barcode" },
    { label: "QRcode", value: "qrcode" },
  ]);

  const [pressableitems, setPressableItems] = useState([
    "Text",
    "Contact",
    "Link",
  ]);
  const [pressablevalue, setPressableValue] = useState();
  const [qRref, setQRref] = useState();
  const ref = useRef();
  useEffect(() => {
    const firstRender = ref.current;
    if (firstRender) {
      ref.current = false;
    } else {
      setInput([contact]);
    }
  }, [contact]);
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
                  backgroundColor={pressablevalue?"#d3d3d3":"#FFA500"}
                  borderColor="#FFA500"
                  color="#ffffff"
                  onPress={() => {
                    setPressableValue(items)
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

          {pressablevalue === "Text" || "Link" ? (
            <TextInput
              placeholder={
                pressablevalue === "Text" ? "Enter text" : "Enter url"
              }
              values={input}
              onChangeText={(e) => setInput(e)}
              autoCorrect={false}
              style={styles.input}
            ></TextInput>
          ) : null}
          {pressablevalue === "Contact" ? (
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
