import CustomButton from "@/components/common/CustomButton";
import { authStyles } from "@/styles/authStyles";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const onboarding = () => {
  const router = useRouter();
  return (
    <View
      style={[
        authStyles.mainContainer,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <View
        style={{
          height: "50%",
          width: "80%",
        }}
      >
        {/* <Image
          source={require("@/assets/auth/onboarding_bg.jpg")}
          style={authStyles.image}
        /> */}
        <Image
          source={require("@/assets/auth/onb.gif")}
          autoplay
          style={authStyles.image}
        />
      </View>
      <Text style={[authStyles.text2, { width: "80%", textAlign: "center" }]}>
        Find your best caretaker for your family member
      </Text>
      <View
        style={{
          marginTop: "7%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomButton
          style={{ width: "80%" }}
          title="Get Started"
          onPress={() => router.push("/(auth)/role")}
        />
      </View>
    </View>
  );
};

export default onboarding;

const styles = StyleSheet.create({});
