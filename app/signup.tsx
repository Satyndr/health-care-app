import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { authStyles } from "@/styles/authStyles";
import CustomInput from "@/components/auth/CustomInput";
import { useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { Signup } from "@/services/auth";
import { useToast } from "@/context/ToastContext";

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
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    // Alert.alert("Success", "Account created successfully!");

    const data = await Signup({ email, password });
    addToast(data, "success");
  };

  return (
    <View style={authStyles.mainContainer}>
      <SafeAreaView>
        <View style={{ width: "100%" }}>
          <Text style={[authStyles.text2, { textAlign: "center" }]}>
            REGISTER
          </Text>
        </View>
        <View style={{ width: "100%", marginTop: "30%" }}>
          <Text style={[authStyles.text1, { textAlign: "center" }]}>
            Healthcare
          </Text>
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
            marginTop: "10%",
          }}
        >
          <Text style={[authStyles.text3]}>Already have an Account: </Text>
          <TouchableOpacity onPress={() => router.push("/signin")}>
            <Text style={[authStyles.text3, { color: "#04238E" }]}>
              Click here to Login
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: "90%", alignSelf: "center", marginTop: "20%" }}>
          <CustomButton
            title="SIGNUP"
            buttonColor="#5391B4"
            style={{ height: 50 }}
            onPress={handleSignup}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default signup;
