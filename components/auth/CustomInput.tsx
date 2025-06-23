import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface CustomInputProps extends TextInputProps {
  type: "number" | "mail" | "pass" | "confirm"; // Input type for determining label and icon
  label?: string; // Optional custom label
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "pass" || type === "confirm";
  return (
    <View style={styles.container}>
      <Text
        style={[styles.label, { width: type === "confirm" ? "32%" : "20%" }]}
      >
        {label
          ? label
          : type === "number"
          ? "Phone No."
          : type === "mail"
          ? "Email Id"
          : type === "confirm"
          ? "Confirm Password"
          : "Password"}
      </Text>
      <Image
        style={styles.icon}
        source={
          type === "number"
            ? require("@/assets/images/phone.png")
            : type === "mail"
            ? require("@/assets/images/mail.png")
            : require("@/assets/images/lock.png")
        }
      />
      {type === "number" && (
        <Text
          style={{
            marginLeft: 8,
            color: "#888",
            borderRightColor: "#888",
            borderRightWidth: 1,
            paddingRight: 8,
          }}
        >
          +91
        </Text>
      )}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={
          placeholder
            ? placeholder
            : type === "mail"
            ? "Enter email"
            : "Enter password"
        }
        placeholderTextColor={"#888"}
        secureTextEntry={isPasswordType ? !showPassword : false}
        keyboardType={
          keyboardType ??
          (type === "number"
            ? "numeric"
            : type === "mail"
            ? "email-address"
            : "default")
        }
        maxLength={type === "number" ? 10 : undefined}
        autoCapitalize="none"
        autoCorrect={false}
        {...rest} // Pass any additional props
      />
      {isPasswordType && (
        <Text
          style={{
            marginLeft: 8,
            color: "#888",
            fontSize: 12,
            fontWeight: "bold",
          }}
          onPress={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "Hide" : "Show"}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "5%",
    marginVertical: "3%",
  },
  label: {
    position: "absolute",
    backgroundColor: "#fff",
    top: "-20%",
    left: "2%",
    textAlign: "center",
    fontSize: 10,
  },
  icon: {
    width: "5%",
    objectFit: "contain",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#000",
  },
});

export default CustomInput;
