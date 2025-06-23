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

const login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);

    // if (!email || !password) {
    //   Alert.alert("Error", "Please enter both email and password.");
    //   return;
    // }

    // Alert.alert("Success", "Logged in successfully!");
    router.replace("/(tabs)");
  };

  return (
    <View style={authStyles.mainContainer}>
      <SafeAreaView>
        <View style={{ width: "100%" }}>
          <Text style={[authStyles.text2, { textAlign: "center" }]}>LOGIN</Text>
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
            marginTop: "30%",
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

          <TouchableOpacity style={{ width: "100%" }}>
            <Text
              style={[
                authStyles.text3,
                { textAlign: "right", color: "#04238E" },
              ]}
            >
              Forgot Password!
            </Text>
          </TouchableOpacity>
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
          <Text style={[authStyles.text3]}>Don't have an Account: </Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={[authStyles.text3, { color: "#04238E" }]}>
              Click here to Register
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: "90%", alignSelf: "center", marginTop: "20%" }}>
          <CustomButton
            title="LOGIN"
            buttonColor="#5391B4"
            style={{ height: 50 }}
            onPress={handleLogin}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default login;
