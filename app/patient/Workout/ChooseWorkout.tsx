import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChooseWorkout = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose Your Workout</Text>

      <View style={styles.optionsContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.optionButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push("/patient/Workout/HomeWorkout")}
        >
          <Text style={styles.optionText}>🏠 Home Workout</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.optionButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push("/patient/Workout/GymWorkout")}
        >
          <Text style={styles.optionText}>🏋️ Gym Workout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ChooseWorkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.custom.color2, // Deep background
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 40,
  },
  optionsContainer: {
    width: "100%",
    alignItems: "center",
  },
  optionButton: {
    backgroundColor: Colors.custom.color1, // Soft pink
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginBottom: 20,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
  optionText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
});
