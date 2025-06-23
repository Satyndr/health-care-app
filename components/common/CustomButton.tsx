import { Colors } from "@/constants/Colors";
import React, { useRef } from "react";
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

const CustomButton = ({
  title,
  onPress,
  style,
  fontSize,
  fontColor,
}: {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  fontSize?: number;
  fontColor?: string;
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.button, { transform: [{ scale }] }, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.pressable}
      >
        <Text
          style={{
            color: fontColor || "#FFFFFF",
            fontSize: fontSize || 16,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.custom.color2,
    borderRadius: 20,
    overflow: "hidden",
  },
  pressable: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomButton;
