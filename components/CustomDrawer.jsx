import {
  Share,
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as StoreReview from "expo-store-review";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const RateUs = async () => {
    if (await StoreReview.isAvailableAsync()) {
       StoreReview.requestReview()
      .then(function(response){
        console.log("response is",response)
       })
      .catch(e => { console.log(e) })
     }
};
const ShareApp = async () => {
  const url =
    "https://play.google.com/store/apps/details?id=com.muriuki.AIOS&hl=en&gl=US";
  try {
    const result = await Share.share({
      title: "App link",
      message:
        "Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=com.muriuki.AIOS&hl=en&gl=US",
      url: "https://play.google.com/store/apps/details?id=com.muriuki.AIOS&hl=en&gl=US",
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
      } else {
      }
    } else if (result.action === Share.dismissedAction) {
    }
  } catch (error) {
    alert(error.message);
  }
};
const CustomDrawer = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginBottom: 20 }}>
        <View
          style={{
            height: 300,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 0,
            backgroundColor: "#FF7D54",
          }}
        >
          <Image
            source={require("../assets/drawericon.png")}
            style={{ width: "100%", height: 270 }}
          />
        </View>
      </View>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#FF7D54", false)}
      >
        <View style={styles.draweritem} onTouchStart={() =>
            Linking.openURL(
              "https://play.google.com/store/apps/details?id=com.muriuki.AIOS&showAllReviews=true"
            )}>
          <MaterialIcons name="star-rate" size={28} color="#FF7D54" />
          <Text style={styles.drawertext}>Rate Us</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#FF7D54", false)}
      >
        <View
          style={styles.draweritem}
          onTouchStart={() =>
            Linking.openURL(
              "https://pages.flycricket.io/all-in-one-scanner-1/privacy.html"
            )
          }
        >
          <MaterialIcons name="privacy-tip" size={28} color="#FF7D54" />
          <Text style={styles.drawertext}>Privacy Policy</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#FF7D54", false)}
      >
        <View style={styles.draweritem} onTouchStart={ShareApp}>
          <Entypo name="share" size={28} color="#FF7D54" />
          <Text style={styles.drawertext}>Share with Friends</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  draweritem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingLeft: 20,
    height: 45,
  },
  drawertext: {
    fontSize: 20,
    fontWeight: "400",
    paddingLeft: 20,
    fontStyle: "bold",
  },
});
