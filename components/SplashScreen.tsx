import { Colors } from "@/constants/Colors";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

const SplashScreen = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start the spring animation
    Animated.spring(scaleAnim, {
      toValue: 1.5,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start(() => {
      // After spring, scale the circle and fade out simultaneously
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 50,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);

  return (
    <View style={styles.splashContainer}>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ scale: scaleAnim }],
            opacity: fadeAnim,
          },
        ]}
      >
        <Text style={styles.text}>Healthcare</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // White background
  },
  circle: {
    width: 150, // Circle width
    height: 150, // Circle height
    borderRadius: 75, // Half of width/height to make it a circle
    backgroundColor: Colors.custom.color2, // Blue color
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff", // White text inside the circle
  },
});

export default SplashScreen;
