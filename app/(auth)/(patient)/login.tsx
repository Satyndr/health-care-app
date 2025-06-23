import CustomInput from "@/components/auth/CustomInput";
import CustomButton from "@/components/common/CustomButton";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/context/authContext";
import { useToast } from "@/context/ToastContext";
import { sendOTP } from "@/services/auth";
import { authStyles } from "@/styles/authStyles";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const login = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const { authState, authDispatch } = useAuth();
  const [number, setNumber] = useState("");

  const handleLogin = () => {
    if (!number) {
      addToast("Please enter your phone number.", "error");
      return;
    }
    if (number.length < 10) {
      addToast("Phone number must be at least 10 digits.", "error");
      return;
    }
    sendOTP(number, authDispatch);
  };

  useEffect(() => {
    if (authState.loading) {
      // Optionally show loading indicator
    }
    if (authState.isOtpSent) {
      addToast("OTP sent successfully", "success");
      router.push("/(auth)/(patient)/otp");
    }
    if (authState.isError) {
      addToast(authState.errorMessage, "error");
    }
  }, [authState]);

  return (
    <SafeAreaView style={[authStyles.mainContainer, { flex: 1 }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar barStyle="dark-content" />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ width: "100%" }}>
            <Text
              style={[
                authStyles.text2,
                {
                  textAlign: "center",
                  fontSize: 25,
                  fontWeight: "600",
                },
              ]}
            >
              Continue
            </Text>
            <Text
              style={[
                authStyles.text2,
                { textAlign: "center", fontSize: 16, color: "#888" },
              ]}
            >
              As Patient
            </Text>
          </View>
          <View style={{ width: "100%", marginTop: "20%" }}>
            <Image
              source={require("@/assets/images/icon.png")}
              style={{
                width: "20%",
                aspectRatio: 1 / 1,
                height: 100,
                objectFit: "contain",
                alignSelf: "center",
                borderRadius: 20,
              }}
            />
          </View>
          <View
            style={{
              width: "90%",
              alignSelf: "center",
              marginTop: "5%",
            }}
          >
            <CustomInput
              type="number"
              value={number}
              onChangeText={(text) => setNumber(text)}
              placeholder="Enter your Phone Number"
            />
          </View>
          <View
            style={{ width: "90%", alignSelf: "center", marginVertical: "10%" }}
          >
            <CustomButton
              style={{ backgroundColor: Colors.custom.color2 }}
              title={authState.loading ? "Sending..." : "Send OTP"}
              onPress={handleLogin}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;
