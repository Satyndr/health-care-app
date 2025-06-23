import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PatientDetails = () => {
  const router = useRouter();
  const patient = {
    id: 1,
    name: "Jane Doe",
    age: 32,
    gender: "Female",
    contact: "+1 987 654 321",
    address: "123 Main Street, Downtown",
    medicalHistory: [
      { id: "1", date: "2025-04-20", description: "Routine check-up" },
      { id: "2", date: "2025-03-15", description: "Flu treatment" },
    ],
    upcomingAppointments: [
      { id: "1", date: "2025-05-15", time: "10:00 AM", doctor: "Dr. John Doe" },
      {
        id: "2",
        date: "2025-05-20",
        time: "2:00 PM",
        doctor: "Dr. Jane Smith",
      },
    ],
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.profilePictureContainer}>
          <Image
            source={{
              uri: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
            }}
            style={styles.profilePicture}
          />
        </View>
        {/* Patient Details */}
        <Text style={styles.name}>{patient.name}</Text>
        <Text style={styles.details}>Age: {patient.age}</Text>
        <Text style={styles.details}>Gender: {patient.gender}</Text>
        <Text style={styles.details}>Contact: {patient.contact}</Text>
        <Text style={styles.details}>Address: {patient.address}</Text>

        {/* Medical History */}
        <Text style={styles.sectionTitle}>Medical History</Text>
        {patient.medicalHistory.map((record) => (
          <View key={record.id} style={styles.recordCard}>
            <Text style={styles.recordDate}>{record.date}</Text>
            <Text style={styles.recordDescription}>{record.description}</Text>
          </View>
        ))}

        {/* Upcoming Appointments */}
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        {patient.upcomingAppointments.map((appointment) => (
          <View key={appointment.id} style={styles.appointmentCard}>
            <Text style={styles.appointmentDate}>{appointment.date}</Text>
            <Text style={styles.appointmentDetails}>
              Time: {appointment.time}
            </Text>
            <Text style={styles.appointmentDetails}>
              Doctor: {appointment.doctor}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  profilePictureContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#5391B4",
  },
  details: {
    fontSize: 16,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  recordCard: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  recordDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  recordDescription: {
    fontSize: 14,
    color: "#666",
  },
  appointmentCard: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  appointmentDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  appointmentDetails: {
    fontSize: 14,
    color: "#666",
  },
});

export default PatientDetails;
