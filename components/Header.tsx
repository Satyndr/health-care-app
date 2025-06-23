import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const Header = ({ onMenuPress }: { onMenuPress: () => void }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftPart}>
        <TouchableOpacity
          style={{
            height: "100%",
            width: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={onMenuPress}
        >
          <Image
            style={{
              height: "90%",
              width: "90%",
              objectFit: "contain",
            }}
            source={require("@/assets/images/burger.png")}
          />
        </TouchableOpacity>
        <Image
          style={styles.hamburger}
          source={require("@/assets/images/logo.png")}
        />
      </View>
      <View style={styles.circle}>
        <Image style={styles.mic} source={require("@/assets/images/mic.png")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "10%",
    width: "100%",
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  leftPart: {
    height: "90%",
    width: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hamburger: {
    height: "100%",
    width: "30%",
    objectFit: "contain",
  },
  mic: {
    height: "100%",
    width: "45%",
    objectFit: "contain",
  },
  circle: {
    height: "90%",
    width: "15%",
    aspectRatio: 1 / 1,
    borderRadius: 99,
    // backgroundColor: "black",
    borderWidth: 2,
    borderColor: "#5F5B5B",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Header;
