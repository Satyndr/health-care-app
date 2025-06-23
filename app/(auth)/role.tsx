import { useAuth } from "@/context/authContext";
import { authStyles } from "@/styles/authStyles";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

const CustomPressable = Animated.createAnimatedComponent(Pressable);

export default function RoleSelectionScreen() {
  const patientScale = useRef(new Animated.Value(1)).current;
  const doctorScale = useRef(new Animated.Value(1)).current;
  const { authDispatch } = useAuth();

  const handlePressIn = (scale: Animated.Value) => {
    Animated.spring(scale, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (scale: Animated.Value) => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleDoctorPress = () => {
    authDispatch({ type: "SET_ROLE", payload: { role: "doctor" } });
    router.push("/(auth)/(doctor)/login");
  };

  const handlePatientPress = () => {
    authDispatch({ type: "SET_ROLE", payload: { role: "patient" } });
    router.push("/(auth)/(patient)/login");
  };

  return (
    <View style={[authStyles.mainContainer, styles.container]}>
      <Text style={[authStyles.text2, { position: "absolute", top: "7%" }]}>
        Select Your Role
      </Text>

      {/* Patient Card */}
      <CustomPressable
        style={[
          styles.card,
          {
            // backgroundColor: Colors.custom.color4,
            transform: [{ scale: patientScale }],
          },
        ]}
        onPressIn={() => handlePressIn(patientScale)}
        onPressOut={() => handlePressOut(patientScale)}
        onPress={handlePatientPress}
      >
        <View style={styles.cardContent}>
          <Image
            source={require("@/assets/auth/patient.mp4")}
            autoplay
            style={[
              authStyles.image,
              { height: 200, marginTop: 20, objectFit: "contain" },
            ]}
          />
          {/* <AntDesign name="user" size={32} color="#3b82f6" /> */}
          <Text style={styles.cardTitle}>Patient</Text>
          <Text style={styles.cardDescription}>
            Book appointments with doctors and manage your health records
          </Text>
        </View>
      </CustomPressable>

      {/* Doctor Card */}
      <CustomPressable
        style={[
          styles.card,
          {
            // backgroundColor: Colors.custom.color2,
            transform: [{ scale: doctorScale }],
          },
        ]}
        onPressIn={() => handlePressIn(doctorScale)}
        onPressOut={() => handlePressOut(doctorScale)}
        onPress={handleDoctorPress}
      >
        <View style={styles.cardContent}>
          <Image
            source={require("@/assets/auth/doctor.mp4")}
            autoplay
            style={[authStyles.image, { height: 200, objectFit: "contain" }]}
          />
          {/* <AntDesign name="medicinebox" size={32} color="#10b981" /> */}
          <Text style={styles.cardTitle}>Doctor</Text>
          <Text style={styles.cardDescription}>
            Manage appointments and view patient records
          </Text>
        </View>
      </CustomPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#555",
  },
  card: {
    backgroundColor: "transparent",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    width: "80%",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
    // elevation: 3,
  },
  cardContent: {
    alignItems: "center",
    // gap: "5%",
    objectFit: "contain",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  cardDescription: {
    textAlign: "center",
    color: "#64748b",
  },
});
