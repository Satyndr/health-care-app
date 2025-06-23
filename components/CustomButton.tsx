import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle,
} from "react-native";

interface CustomButtonProps {
  title: string;
  onPress?: () => void;
  buttonColor?: string;
  style?: StyleProp<ViewStyle>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  buttonColor,
  style,
}) => {
  const animatedValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: animatedValue }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          style,
          styles.button,
          { backgroundColor: buttonColor ? buttonColor : "#2196F3" },
        ]}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default CustomButton;
