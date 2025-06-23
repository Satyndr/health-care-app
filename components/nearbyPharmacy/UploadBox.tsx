import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const UploadBox = () => {
  return (
    <View
      style={{
        height: "28%",
        width: "90%",
        borderWidth: 0.5,
        borderColor: "#000",
        borderRadius: 16,
        marginTop: "3%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "20%",
      }}
    >
      <TouchableOpacity style={{}}>
        <Image
          source={require("@/assets/images/upload_link.gif")}
          style={styles.gif}
          autoplay
        />
        <Text>Upload Link</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require("@/assets/images/upload.gif")}
          style={styles.gif}
          autoplay
        />
        <Text>Upload File</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gif: {
    height: 100,
    objectFit: "contain",
  },
});

export default UploadBox;
