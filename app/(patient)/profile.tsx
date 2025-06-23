import LogoutModal from "@/components/common/LogoutModal";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/context/authContext";
import { logout } from "@/services/auth";
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

const healthSummary = [
  {
    id: 1,
    label: "Blood Pressure",
    value: "120/80 mmHg",
    image: "https://example.com/images/blood_pressure.png",
  },
  {
    id: 2,
    label: "Heart Rate",
    value: "72 bpm",
    image: "https://example.com/images/heart_rate.png",
  },
  {
    id: 3,
    label: "Cholesterol",
    value: "180 mg/dL",
    image: "https://example.com/images/cholesterol.png",
  },
  {
    id: 4,
    label: "Blood Sugar",
    value: "90 mg/dL",
    image: "https://example.com/images/blood_sugar.png",
  },
  {
    id: 5,
    label: "Weight",
    value: "70 kg",
    image: "https://example.com/images/weight.png",
  },
  {
    id: 6,
    label: "Height",
    value: "175 cm",
    image: "https://example.com/images/height.png",
  },
  {
    id: 7,
    label: "BMI",
    value: "22.9",
    image: "https://example.com/images/bmi.png",
  },
];

const Profile = () => {
  const router = useRouter();
  const { authDispatch } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [patient, setPatient] = React.useState({
    name: "Amit Deo",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    age: 30,
    gender: "Male",
    address: "123 Main Street, City, Country",
  });
  const [editPatient, setEditPatient] = React.useState(patient);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout(authDispatch);
    setShowLogoutModal(false);
    router.replace("/(auth)/role");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleEditProfile = () => {
    setEditPatient(patient);
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    // Save changes locally
    // In real app, send to backend
    setPatient(editPatient);
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setEditPatient((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1, paddingHorizontal: "5%", paddingBottom: 500 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={handleLogout}
            style={{ padding: 8, borderRadius: 8 }}
          >
            <Text
              style={{
                color: Colors.custom.color2,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          <Image
            source={{
              uri: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
            }}
            style={styles.profilePicture}
          />
        </View>

        {/* Patient Details */}
        <View>
          {isEditing ? (
            <>
              <TextInput
                style={[
                  styles.name,
                  styles.editDetailValue,
                  {
                    backgroundColor: "#f5f5f5",
                    borderRadius: 6,
                    paddingHorizontal: 8,
                    textAlign: "center",
                  },
                ]}
                value={editPatient.name}
                onChangeText={(text) => handleChange("name", text)}
              />
              <TextInput
                style={[
                  styles.email,
                  styles.editDetailValue,

                  {
                    backgroundColor: "#f5f5f5",
                    borderRadius: 6,
                    paddingHorizontal: 8,
                    textAlign: "center",
                  },
                ]}
                value={editPatient.email}
                onChangeText={(text) => handleChange("email", text)}
              />
              <TextInput
                style={[
                  styles.phone,
                  styles.editDetailValue,
                  {
                    backgroundColor: "#f5f5f5",
                    borderRadius: 6,
                    paddingHorizontal: 8,
                    textAlign: "center",
                  },
                ]}
                value={editPatient.phone}
                onChangeText={(text) => handleChange("phone", text)}
              />
              <View style={styles.detailsContainer}>
                <Text style={styles.detailLabel}>Age:</Text>
                <TextInput
                  style={[
                    styles.editDetailValue,
                    {
                      backgroundColor: "#f5f5f5",
                      borderRadius: 6,
                      paddingHorizontal: 8,
                    },
                  ]}
                  value={editPatient.age.toString()}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    handleChange("age", text.replace(/[^0-9]/g, ""))
                  }
                />
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailLabel}>Gender:</Text>
                <TextInput
                  style={[
                    styles.editDetailValue,
                    {
                      backgroundColor: "#f5f5f5",
                      borderRadius: 6,
                      paddingHorizontal: 8,
                    },
                  ]}
                  value={editPatient.gender}
                  onChangeText={(text) => handleChange("gender", text)}
                />
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailLabel}>Address:</Text>
                <TextInput
                  style={[
                    styles.editDetailValue,
                    {
                      backgroundColor: "#f5f5f5",
                      borderRadius: 6,
                      paddingHorizontal: 8,
                    },
                  ]}
                  value={editPatient.address}
                  onChangeText={(text) => handleChange("address", text)}
                />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.name}>{patient.name}</Text>
              <Text style={styles.email}>{patient.email}</Text>
              <Text style={styles.phone}>{patient.phone}</Text>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailLabel}>Age:</Text>
                <Text style={styles.detailValue}>{patient.age}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailLabel}>Gender:</Text>
                <Text style={styles.detailValue}>{patient.gender}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailLabel}>Address:</Text>
                <Text style={styles.detailValue}>{patient.address}</Text>
              </View>
            </>
          )}
        </View>

        {/* Edit Profile Button */}
        {isEditing ? (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleSaveProfile}
            >
              <Text style={styles.editButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: "#aaa" }]}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.editButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}

        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            marginVertical: 20,
          }}
        />

        <Text style={styles.healthSummaryTitle}>Health Summary</Text>

        {/* Health summary*/}
        <View style={styles.healthSummaryContainer}>
          {healthSummary.map((item) => (
            <View key={item.id} style={styles.healthSummaryItem}>
              <Text style={styles.healthSummaryLabel}>{item.label}</Text>
              <Text style={styles.healthSummaryValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <LogoutModal
        showLogoutModal={showLogoutModal}
        cancelLogout={cancelLogout}
        confirmLogout={confirmLogout}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  profilePictureContainer: {
    marginBottom: 20,
    alignSelf: "center",
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#5391B4",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    alignSelf: "center",
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
    alignSelf: "center",
  },
  phone: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    alignSelf: "center",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    width: "30%",
  },
  detailValue: {
    fontSize: 16,
    color: "#666",
    width: "70%",
  },
  editDetailValue: {
    fontSize: 16,
    color: "#666",
    width: "70%",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  editButton: {
    backgroundColor: Colors.custom.color2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "45%",
    alignSelf: "center",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  healthSummaryContainer: {
    // backgroundColor: "#fff",
    paddingTop: 20,
    borderRadius: 10,
    width: "100%",
    // marginTop: 20,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "4%",
    marginBottom: 100,
  },
  healthSummaryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  healthSummaryItem: {
    backgroundColor: "#fff",
    height: 120,
    aspectRatio: 1 / 1,
    borderRadius: 25,
    width: "48%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  healthSummaryLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.custom.color2,
    // marginBottom: 5,
  },
  healthSummaryValue: {
    fontSize: 14,
    color: "#333",
  },
  healthSummaryIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
});
