import CustomInput from "@/components/auth/CustomInput";
import CustomButton from "@/components/common/CustomButton";
import { Colors } from "@/constants/Colors";
// import CustomButton from "@/components/CustomButton";
import { useToast } from "@/context/ToastContext";
import { authStyles } from "@/styles/authStyles";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const signup = () => {
  const router = useRouter();

  const { addToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    if (!email || !password || !confirmPassword) {
      addToast("Please fill all fields", "error");
      return;
    }

    if (password !== confirmPassword) {
      addToast("Passwords do not match", "error");
      return;
    }

    addToast("Login Successfully", "success");
    router.push("/(auth)/(patient)/otp");

    // Alert.alert("Success", "Account created successfully!");

    // const data = await Signup({ email, password });
    // addToast(data, "success");
  };

  return (
    <SafeAreaView style={[authStyles.mainContainer, { flex: 1 }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 50}
      >
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
              Register
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
                // objectFit: "contain",
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
              type="mail"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter your email"
            />
            <CustomInput
              type="pass"
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Enter your password"
              secureTextEntry
            />
            <CustomInput
              type="confirm"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              placeholder="Confirm your password"
              secureTextEntry
            />
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginTop: "5%",
            }}
          >
            <Text style={[authStyles.text3]}>Already have an Account: </Text>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/(patient)/login")}
            >
              <Text
                style={[
                  authStyles.text3,
                  { color: Colors.custom.color2, fontWeight: "600" },
                ]}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ width: "90%", alignSelf: "center", marginVertical: "10%" }}
          >
            <CustomButton title="Sign Up" onPress={handleSignup} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default signup;
