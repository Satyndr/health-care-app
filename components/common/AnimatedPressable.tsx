import React, { useRef } from "react";
import { Animated, Pressable, StyleProp, ViewStyle } from "react-native";

const AnimatedPressableComponent = Animated.createAnimatedComponent(Pressable);

const AnimatedPressable = ({
  children,
  onPress,
  style,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
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
    <AnimatedPressableComponent
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={[style, { transform: [{ scale }] }]}
    >
      {children}
    </AnimatedPressableComponent>
  );
};

export default AnimatedPressable;
