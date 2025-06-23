import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";

const CommunityBall = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        position: "absolute",
        bottom: "3%",
        right: "7%",
        zIndex: 100,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.custom.color1,
        padding: 10,
        borderRadius: 50,
        height: 70,
        width: 70,
      }}
    >
      <Ionicons name="add" size={40} color="#fff" />
    </Pressable>
  );
};

export default CommunityBall;
