import React, { useEffect } from "react";
import {
  Animated,
  FlatList,
  Image,
  ImageProps,
  StyleSheet,
  Text,
  useAnimatedValue,
  View,
} from "react-native";

type List = {
  title: string;
  image: ImageProps;
};

const TabsList: List[] = [
  {
    title: "Questions",
    image: require("@/assets/images/questions.png"),
  },
  {
    title: "Reminders",
    image: require("@/assets/images/reminders.png"),
  },
  {
    title: "Messages",
    image: require("@/assets/images/messages.png"),
  },
  {
    title: "Calender",
    image: require("@/assets/images/calender.png"),
  },
];

const Tabs = () => {
  const animVal = useAnimatedValue(0);

  const fadeAnimation = () => {
    Animated.timing(animVal, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeAnimation();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: animVal.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      ]}
    >
      <FlatList
        data={TabsList}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.box}>
            <Text style={styles.text}>{item.title}</Text>
            <Image source={item.image} style={styles.image} />
          </View>
        )}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1
    // backgroundColor: "red",
    paddingHorizontal: "6%",
    paddingVertical: "5%",
  },
  box: {
    width: "45%",
    height: 50,
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    alignItems: "center",
    // backgroundColor: "blue",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
  },
  image: {
    height: "60%",
    width: "30%",
    objectFit: "contain",
  },
  text: {
    color: "#6C6060",
    fontFamily: "Thambi",
    fontWeight: "bold",
  },
});

export default Tabs;
