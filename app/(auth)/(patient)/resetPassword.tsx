import CustomInput from "@/components/auth/CustomInput";
import CustomButton from "@/components/common/CustomButton";
import { Colors } from "@/constants/Colors";
import { useToast } from "@/context/ToastContext";
import { authStyles } from "@/styles/authStyles";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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

const resetPassword = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = () => {
    if (!password || !confirmPassword) {
      addToast("Please enter and confirm your new password.", "error");
      return;
    }
    if (password !== confirmPassword) {
      addToast("Passwords do not match.", "error");
      return;
    }
    addToast("Password reset successfully!", "success");
    router.replace("/(auth)/(patient)/login");
    addToast("Login again Please", "success");
    // Optionally navigate or clear input
  };

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
                  marginTop: "5%",
                },
              ]}
            >
              Reset Password
            </Text>
            <Text
              style={[
                authStyles.text2,
                { textAlign: "center", fontSize: 16, color: "#888" },
              ]}
            >
              Enter your new password and confirm it
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
              marginTop: "20%",
            }}
          >
            <CustomInput
              type="pass"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter new password"
              secureTextEntry
            />
            <CustomInput
              type="confirm"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              secureTextEntry
            />
          </View>
          <View
            style={{ width: "90%", alignSelf: "center", marginVertical: "10%" }}
          >
            <CustomButton
              style={{ backgroundColor: Colors.custom.color2 }}
              title="Reset Password"
              onPress={handleReset}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default resetPassword;
