import CustomButton from "@/components/common/CustomButton";
import { patientStyles } from "@/styles/patientStyles";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Feedback = () => {
  const router = useRouter();
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = () => {
    if (!feedback || !rating) {
      Alert.alert("Error", "Please provide both feedback and a rating.");
      return;
    }
    Alert.alert("Thank you!", "Your feedback has been submitted.");
    setFeedback("");
    setRating("");
    router.back();
  };

  return (
    <SafeAreaView style={[patientStyles.mainContainer, { padding: "15%" }]}>
      <Text style={styles.title}>Give Feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your feedback here..."
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Rate the doctor (1-5)"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />
      <CustomButton title="Submit" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
});
