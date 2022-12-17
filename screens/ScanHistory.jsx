import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ScanHistory = () => {

  const [history, setHistory] = useState([]);

  const getMyObject = async () => {
    console.log('started.')
    try {
      const jsonValue = await AsyncStorage.getItem("scanned");
      if(jsonValue != null){
        setHistory([JSON.parse(jsonValue)])
        console.log('data.')
      }else{
        setHistory([])
        console.log('no data')
      }
    } catch (e) {
      console.log("error.")
    }

    console.log("Done.");
  };

  useEffect(() => {
    getMyObject()
  }, []);
  console.log(history)
  const renderItem = (item) => {
    console.log(item)
    return (
      <View style={styles.container} >
        <View style={styles.top} >
          <Text style={styles.name}>{item.item.codetype}</Text>
          <Text style={styles.text}>
            {item.item.value}
          </Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.text}>
          {(item.item.time)}
          </Text>
          <Text style={styles.text}>
            {item.item.type}
          </Text>
        </View>
      </View>
    );
  };
  const keyExtractor = ((item,i) => i);
  return (
    <View>
      <FlatList
        data={history}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ScanHistory;

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
