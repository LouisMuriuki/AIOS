import { Pressable, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const Button = ({
  disabled,
  onPress,
  text,
  rippleColor,
  backgroundColor,
  height,
  elevation,
  margin,
  fontSize,
  fontWeight,
  color,
  fontFamily,
  icon,
  width,
  paddingHorizontal,
  borderRadius,
  borderColor,
  borderWidth,
  justifyContent,
  alignItems,
  flexDirection,
  iconcolor,
  iconsize,
  marginHorizontal,
  marginBottom,
  marginTop
}) => {
  return (
    <View
      style={{
        borderRadius: borderRadius,
        justifyContent: justifyContent,
        elevation:elevation,
        margin: margin,
        marginBottom: marginBottom,
        marginHorizontal:marginHorizontal,
        marginTop: marginTop,
        borderColor: borderColor,
        flexDirection: flexDirection,
        borderWidth: borderWidth,
        backgroundColor: backgroundColor,
      }}
    >
      <Pressable
        disabled={disabled}
        android_ripple={{ color: { rippleColor }, borderless: true }}
        onPress={onPress}
        style={
          {
            backgroundColor: backgroundColor,
            height: height,
            width: width,
            borderRadius: borderRadius,
            paddingHorizontal: paddingHorizontal,
            borderColor: backgroundColor,
            justifyContent: justifyContent,
            alignItems: alignItems,
            flexDirection: flexDirection,
          }
        }
      >
       
        <Text
          style={{
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: color,
            fontFamily: fontFamily,
            justifyContent: justifyContent,
            alignItems: alignItems,
          }}
        >
          {text}
        </Text>
        {icon && (
          <AntDesign name={icon}  size={iconsize} style={{ marginLeft: 10 }} color={iconcolor} />
        )}
      </Pressable>
    </View>
  );
};

export default Button;

