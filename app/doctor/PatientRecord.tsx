import { Colors } from "@/constants/Colors";
import { getImages } from "@/mockData/images";
import { doctorStyles } from "@/styles/doctorStyles";
import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const patients = [
  {
    id: "1",
    name: "John Doe",
    age: 45,
    gender: "Male",
    lastVisit: "2025-05-10",
    diagnosis: "Hypertension",
    notes: "Blood pressure under control. Continue medication.",
    image: require("@/assets/doctor/profile.png"),
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 38,
    gender: "Female",
    lastVisit: "2025-05-12",
    diagnosis: "Diabetes",
    notes: "Diet and exercise plan updated.",
    image: require("@/assets/doctor/profile.png"),
  },
  {
    id: "3",
    name: "Michael Brown",
    age: 29,
    gender: "Male",
    lastVisit: "2025-05-15",
    diagnosis: "Dental Cleaning",
    notes: "Routine cleaning. No issues found.",
    image: require("@/assets/doctor/profile.png"),
  },
  {
    id: "4",
    name: "Emily Davis",
    age: 34,
    gender: "Female",
    lastVisit: "2025-05-18",
    diagnosis: "Eye Check-up",
    notes: "Vision stable. Next check-up in 6 months.",
    image: require("@/assets/doctor/profile.png"),
  },
  {
    id: "5",
    name: "Chris Wilson",
    age: 52,
    gender: "Male",
    lastVisit: "2025-05-20",
    diagnosis: "Physical Therapy",
    notes: "Improvement in mobility. Continue exercises.",
    image: require("@/assets/doctor/profile.png"),
  },
];

const Patientrecord = () => {
  const renderPatient = ({ item }: any) => (
    <View style={styles.card}>
      <Image
        //   source={item.image}
        src={getImages()}
        style={styles.avatar}
      />
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.info}>
          {item.gender}, Age {item.age}
        </Text>
        <Text style={styles.info}>Last Visit: {item.lastVisit}</Text>
        <Text style={styles.diagnosis}>Diagnosis: {item.diagnosis}</Text>
        <Text style={styles.notes}>{item.notes}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[doctorStyles.mainContainer, { backgroundColor: "#f5f5f5" }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerBar}>
          <Text style={styles.headerText}>Patient Records</Text>
        </View>
        <FlatList
          data={patients}
          renderItem={renderPatient}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Patientrecord;

const styles = StyleSheet.create({
  headerBar: {
    width: "100%",
    backgroundColor: Colors.custom.color1,
    paddingVertical: "4%",
    alignItems: "flex-start",
    paddingLeft: "5%",
    marginBottom: "3%",
  },
  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: 500,
    letterSpacing: 1,
  },
  listContent: {
    paddingHorizontal: "5%",
    paddingBottom: "5%",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: "4%",
    marginBottom: "4%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.custom.color3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.custom.color1,
    marginBottom: 2,
  },
  info: {
    fontSize: 14,
    color: "#444",
    marginBottom: 2,
  },
  diagnosis: {
    fontSize: 14,
    color: Colors.custom.color2,
    fontWeight: "600",
    marginBottom: 2,
  },
  notes: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
});
