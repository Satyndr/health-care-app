import { Colors } from "@/constants/Colors";
import { Route, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DoctorDetails = () => {
  const router = useRouter();
  const doctor = {
    id: 1,
    name: "Dr. John Doe",
    specialty: "Cardiologist",
    experience: "10 years",
    rating: 4.8,
    reviews: "128 reviews",
    location: "City Hospital, Downtown",
    contact: "+1 234 567 890",
    availability: "Mon-Fri, 9:00 AM - 5:00 PM",
    bio: "Dr. John Doe is a highly experienced cardiologist specializing in heart health and cardiovascular diseases. He is dedicated to providing the best care for his patients.",
    image: require("@/assets/doctor/profile.png"),
    fees: "$100 per consultation",
    qualifications: "MD, MBBS, MDS",
  };

  const handleBookAppointment = (doctorId: number) => {
    router.push(`/appointment/${doctorId}` as Route);
  };

  const handleVideoCall = (doctorId: number) => {
    router.push(`/video-call/${doctorId}` as Route);
  };

  const handleChat = (doctorId: number) => {
    router.push(`/chat/${doctorId}` as Route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <Image source={doctor.image} style={styles.image} />
          <View style={styles.headerText}>
            <Text style={styles.name}>{doctor.name}</Text>
            <Text style={styles.specialty}>{doctor.specialty}</Text>

            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{doctor.rating} ⭐</Text>
              <Text style={styles.reviewsText}>({doctor.reviews})</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Experience</Text>
            <Text style={styles.infoValue}>{doctor.experience}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>{doctor.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Availability</Text>
            <Text style={styles.infoValue}>{doctor.availability}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Fees</Text>
            <Text style={styles.infoValue}>{doctor.fees}</Text>
          </View>
          <View style={styles.qualifications}>
            <Text style={styles.qualificationsText}>
              {doctor.qualifications}
            </Text>
          </View>
        </View>

        <View style={styles.bioCard}>
          <Text style={styles.sectionTitle}>About Doctor</Text>
          <Text style={styles.bioText}>{doctor.bio}</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            onPress={() => handleBookAppointment(doctor.id)}
          >
            <Text style={styles.buttonText}>Book Appointment</Text>
          </TouchableOpacity>

          <View style={styles.secondaryActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={() => handleVideoCall(doctor.id)}
            >
              <Text style={styles.buttonText}>Video Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={() => handleChat(doctor.id)}
            >
              <Text style={styles.buttonText}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 15,
    margin: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.custom.color2,
  },
  headerText: {
    flex: 1,
    marginLeft: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  specialty: {
    fontSize: 16,
    color: Colors.custom.color2,
    fontWeight: "600",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFA500",
    marginRight: 5,
  },
  reviewsText: {
    fontSize: 14,
    color: "#666",
  },
  infoCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 15,
    color: "#666",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  qualifications: {
    backgroundColor: "rgba(210, 131, 207, 0.2)",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  qualificationsText: {
    color: Colors.custom.color2,
    fontWeight: "600",
  },
  bioCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  bioText: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
  },
  actionButtons: {
    paddingHorizontal: 15,
  },
  primaryButton: {
    backgroundColor: Colors.custom.color2,
    marginBottom: 15,
  },
  secondaryActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  secondaryButton: {
    width: "48%",
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: Colors.custom.color2,
  },
  actionButton: {
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryButtonText: {
    color: "#FFF",
  },
  secondaryButtonText: {
    color: Colors.custom.color2,
  },
});

export default DoctorDetails;
