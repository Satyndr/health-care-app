import CustomButton from "@/components/common/CustomButton";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/context/authContext";
import { useToast } from "@/context/ToastContext";
import { verifyOTP } from "@/services/auth";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const otp = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const { authState, authDispatch } = useAuth();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const otpRef = useRef<Array<TextInput | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return; // Only allow single digit
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: { nativeEvent: { key: string } },
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index]) {
      if (index > 0) {
        otpRef.current[index - 1]?.focus();
      }
    }
  };

  const handleVerify = () => {
    if (otp.some((digit) => digit === "")) {
      addToast("Please enter otp", "error");
      return;
    }
    const otpString = otp.join("");
    // addToast("OTP verified successfully", "success");
    console.log("OTP Verified :", otpString);
    console.log("Number from Context:", authState.phoneNumber);
    verifyOTP(otpString, authState.phoneNumber, authState.role, authDispatch);
  };

  const handleResend = () => {
    addToast("OTP resent successfully", "success");
    // Handle OTP resend logic here
    console.log("OTP Resent");
  };

  useEffect(() => {
    if (authState.loading) {
      console.log("Loading...");
    }
    if (authState.isLoggedIn) {
      addToast("Logged in successfully", "success");
      router.replace("/(doctor)/home");
    }
  }, [authState]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 25,
            fontWeight: "600",
            marginTop: "30%",
          }}
        >
          OTP Verification
        </Text>
        <Text style={{ textAlign: "center", fontSize: 16, color: "#888" }}>
          Enter the OTP sent to your email
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "10%",
        }}
      >
        {Array.from({ length: 6 }, (_, index) => (
          <TextInput
            key={index}
            value={otp[index]}
            ref={(ref) => {
              otpRef.current[index] = ref;
            }}
            onChangeText={(value) => handleChange(value, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            maxLength={1}
            style={{
              borderColor: "#888",
              borderWidth: 1,
              width: 40,
              height: 60,
              borderRadius: 10,
              fontSize: 24,
              textAlign: "center",
              margin: 5,
              color: "#000",
            }}
            keyboardType="number-pad"
            returnKeyType="done"
            autoFocus={index === 0}
          />
        ))}
      </View>
      <View style={{ alignItems: "center", marginTop: "10%" }}>
        <Text style={{ color: "#888" }}>
          Didn't receive the OTP?{" "}
          <Text
            style={{ color: "#000", fontWeight: "bold" }}
            onPress={handleResend}
          >
            Resend
          </Text>
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: 20,
          width: "80%",
          alignSelf: "center",
        }}
      >
        <Text style={{ color: "#888", textAlign: "center" }}>
          By verifying, you agree to our{" "}
          <Text style={{ color: "#000", fontWeight: "bold" }}>
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text style={{ color: "#000", fontWeight: "bold" }}>
            Privacy Policy
          </Text>
        </Text>
      </View>
      <CustomButton
        // title={isLoading ? "Verifying..." : "Verify"}
        title={"Verify"}
        onPress={handleVerify}
        style={{
          width: "90%",
          alignSelf: "center",
          marginTop: "20%",
          backgroundColor: Colors.custom.color1,
          borderRadius: 10,
        }}
        fontColor="#fff"
        fontSize={18}
      />
    </SafeAreaView>
  );
};

export default otp;
