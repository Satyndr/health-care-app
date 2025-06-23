import LogoutModal from "@/components/common/LogoutModal";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/context/authContext";
import { logout } from "@/services/auth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  const doctorInitial = {
    name: "Dr. John Doe",
    specialty: "Cardiologist",
    experience: "10 years",
    degree: "MBBS, MD (Cardiology)",
    patientsCured: 1200,
    availableTimings: "Mon-Fri, 9:00 AM - 5:00 PM",
    location: "City Hospital, Downtown",
    contact: "+1 234 567 890",
    bio: "Dr. John Doe is a highly experienced cardiologist specializing in heart health and cardiovascular diseases. He is dedicated to providing the best care for his patients.",
    image:
      "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
  };
  const [doctor, setDoctor] = React.useState(doctorInitial);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editDoctor, setEditDoctor] = React.useState(doctorInitial);
  const { authDispatch } = useAuth();
  const handleEditProfile = () => {
    setEditDoctor(doctor);
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setDoctor(editDoctor);
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setEditDoctor((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout(authDispatch);
    authDispatch({ type: "LOGOUT", payload: { message: "User logged out" } });
    console.log("User logged out");
    setShowLogoutModal(false);
    router.replace("/(auth)/role");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileCard}>
          <View style={styles.profilePictureShadow}>
            <Image
              source={{ uri: isEditing ? editDoctor.image : doctor.image }}
              style={styles.profilePicture}
            />
          </View>
          {isEditing ? (
            <>
              <TextInput
                style={[
                  styles.name,
                  {
                    backgroundColor: "#f5f5f5",
                    borderRadius: 6,
                    paddingHorizontal: 8,
                  },
                ]}
                value={editDoctor.name}
                onChangeText={(text) => handleChange("name", text)}
              />
              <TextInput
                style={[
                  styles.specialty,
                  {
                    backgroundColor: "#f5f5f5",
                    borderRadius: 6,
                    paddingHorizontal: 8,
                  },
                ]}
                value={editDoctor.specialty}
                onChangeText={(text) => handleChange("specialty", text)}
              />
              <View style={styles.infoRow}>
                <Ionicons
                  name="school-outline"
                  size={18}
                  color={Colors.custom.color1}
                  style={{ marginRight: 6 }}
                />
                <TextInput
                  style={styles.infoText}
                  value={editDoctor.degree}
                  onChangeText={(text) => handleChange("degree", text)}
                />
              </View>
              <View style={styles.infoRow}>
                <Ionicons
                  name="medal-outline"
                  size={18}
                  color={Colors.custom.color1}
                  style={{ marginRight: 6 }}
                />
                <TextInput
                  style={styles.infoText}
                  value={editDoctor.experience}
                  onChangeText={(text) => handleChange("experience", text)}
                />
              </View>
              <View style={styles.infoRow}>
                <Ionicons
                  name="people-outline"
                  size={18}
                  color={Colors.custom.color1}
                  style={{ marginRight: 6 }}
                />
                <TextInput
                  style={styles.infoText}
                  value={editDoctor.patientsCured.toString()}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    handleChange("patientsCured", text.replace(/[^0-9]/g, ""))
                  }
                />
              </View>
              <View style={styles.infoRow}>
                <Ionicons
                  name="calendar-outline"
                  size={18}
                  color={Colors.custom.color1}
                  style={{ marginRight: 6 }}
                />
                <TextInput
                  style={styles.infoText}
                  value={editDoctor.availableTimings}
                  onChangeText={(text) =>
                    handleChange("availableTimings", text)
                  }
                />
              </View>
              <View style={styles.infoRow}>
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={Colors.custom.color1}
                  style={{ marginRight: 6 }}
                />
                <TextInput
                  style={styles.infoText}
                  value={editDoctor.location}
                  onChangeText={(text) => handleChange("location", text)}
                />
              </View>
              <View style={styles.infoRow}>
                <Ionicons
                  name="call-outline"
                  size={18}
                  color={Colors.custom.color1}
                  style={{ marginRight: 6 }}
                />
                <TextInput
                  style={styles.infoText}
                  value={editDoctor.contact}
                  onChangeText={(text) => handleChange("contact", text)}
                />
              </View>
              <TextInput
                style={[
                  styles.bio,
                  {
                    backgroundColor: "#f5f5f5",
                    borderRadius: 6,
                    paddingHorizontal: 8,
                  },
                ]}
                value={editDoctor.bio}
                onChangeText={(text) => handleChange("bio", text)}
                multiline
              />
              <TouchableOpacity
                style={styles.editButton}
                onPress={handleSaveProfile}
              >
                <Ionicons
                  name="save-outline"
                  size={18}
                  color="#fff"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.editButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.editButton,
                  { backgroundColor: "#aaa", marginTop: 8 },
                ]}
                onPress={() => setIsEditing(false)}
              >
                <Ionicons
                  name="close-outline"
                  size={18}
                  color="#fff"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.editButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.name}>{doctor.name}</Text>
              <Text style={styles.specialty}>{doctor.specialty}</Text>
              <View style={styles.infoRow}>
                <Ionicons
                  name="school-outline"
                  size={18}
                  color={Colors.custom.color1}
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.infoText}>{doctor.degree}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons
                  name="medal-outline"
                  size={18}
                  color={Colors.custom.color1}
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.infoText}>
                  Experience: {doctor.experience}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons
                  name="people-outline"
                  size={18}
                  color={Colors.custom.color1}
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.infoText}>
                  Patients Cured: {doctor.patientsCured}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons
                  name="calendar-outline"
                  size={18}
                  color={Colors.custom.color1}
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.infoText}>{doctor.availableTimings}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={Colors.custom.color1}
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.infoText}>{doctor.location}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons
                  name="call-outline"
                  size={18}
                  color={Colors.custom.color1}
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.infoText}>{doctor.contact}</Text>
              </View>
              <Text style={styles.bio}>{doctor.bio}</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={handleEditProfile}
              >
                <Ionicons
                  name="create-outline"
                  size={18}
                  color="#fff"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
      <LogoutModal
        showLogoutModal={showLogoutModal}
        cancelLogout={cancelLogout}
        confirmLogout={confirmLogout}
        from="doctor"
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  scrollContent: {
    padding: 0,
    backgroundColor: "#f5f5f5",
    minHeight: "100%",
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 18,
    marginBottom: 10,
  },
  logoutButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(210,131,207,0.08)",
  },
  logoutText: {
    color: Colors.custom.color1,
    fontWeight: "bold",
    fontSize: 16,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 24,
    marginHorizontal: 18,
    marginBottom: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
  profilePictureShadow: {
    shadowColor: "#5391B4",
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    borderRadius: 70,
    marginBottom: 10,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: Colors.custom.color1,
    backgroundColor: "#e6e6e6",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.custom.color1,
    textAlign: "center",
    marginBottom: 2,
    marginTop: 6,
  },
  specialty: {
    fontSize: 18,
    color: Colors.custom.color2,
    textAlign: "center",
    marginBottom: 18,
    fontWeight: "600",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  infoText: {
    fontSize: 15,
    color: "#444",
  },
  bio: {
    fontSize: 15,
    marginVertical: 18,
    lineHeight: 22,
    color: "#666",
    textAlign: "center",
  },
  editButton: {
    backgroundColor: Colors.custom.color1,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
