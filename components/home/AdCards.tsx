import React, { useRef } from "react";
import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";
import CustomButton from "../CustomButton";

const AdCards = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const slideAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }).start();
  };

  React.useEffect(() => {
    slideAnimation();
  }, []);

  const card1Transform = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [300, 0],
        }),
      },
    ],
  };

  const card2Transform = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [300, 0],
        }),
      },
    ],
  };

  const card3Transform = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-300, 0],
        }),
      },
    ],
  };

  const firstCardContent = () => {
    return (
      <View
        style={{
          flex: 1,
          padding: "5%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "80%" }}>
          <Text style={styles.text1}>{"Get the Best\nMedical Service"}</Text>
          <Text style={styles.text2}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Necessitatibus excepturi doloremque voluptatem minima, harum
            veritatis!
          </Text>
        </View>
        <Image
          style={{ height: "100%", width: "20%", objectFit: "contain" }}
          source={require("@/assets/images/doctor.png")}
        />
      </View>
    );
  };

  const secondCardContent = () => {
    return (
      <View
        style={{
          flex: 1,
          padding: "5%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.text1}>{"Get the Best\nMedical Service"}</Text>
          <CustomButton title="SHOP NOW" />
        </View>
        <Image
          style={{ height: "100%", width: "35%", objectFit: "contain" }}
          source={require("@/assets/images/vitamin.png")}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, styles.card1, card1Transform]}>
        {firstCardContent()}
      </Animated.View>
      <Animated.View style={[styles.card, styles.card2, card2Transform]}>
        {secondCardContent()}
      </Animated.View>
      <Animated.View
        style={[styles.card, styles.card3, card3Transform]}
      ></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    height: 140,
    width: 300,
    borderRadius: 10,
    position: "absolute",
  },
  card1: { backgroundColor: "#C8F5C4", zIndex: 3, top: 0 },
  card2: { backgroundColor: "#D7D0FF", zIndex: 2, top: "50%" },
  card3: { backgroundColor: "#F5E1E9", zIndex: 1, left: "-50%" },
  text1: {
    color: "#3A3A3A",
    fontFamily: "Thambi",
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 25,
  },
  text2: {
    marginTop: "3%",
    color: "#3A3A3A",
    fontFamily: "Thambi",
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "700",
  },
});

export default AdCards;
