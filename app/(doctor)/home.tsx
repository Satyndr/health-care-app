import RenderAppointment from "@/components/Doctor/RenderAppointment";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/context/authContext";
import { doctorStyles } from "@/styles/doctorStyles";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const appointments = [
  {
    id: "1",
    patient: "John Doe",
    age: 45,
    gender: "Male",
    query: "Routine Check-up",
    date: "2025-05-10",
    time: "10:00 AM",
    status: "Upcoming",
  },
  {
    id: "2",
    patient: "Jane Smith",
    age: 38,
    gender: "Female",
    query: "Follow-up Consultation",
    date: "2025-05-12",
    time: "2:00 PM",
    status: "Upcoming",
  },
  {
    id: "3",
    patient: "Michael Brown",
    age: 29,
    gender: "Male",
    query: "Dental Cleaning",
    date: "2025-05-15",
    time: "11:30 AM",
    status: "Upcoming",
  },
  {
    id: "4",
    patient: "Emily Davis",
    age: 34,
    gender: "Female",
    query: "Eye Check-up",
    date: "2025-05-18",
    time: "9:00 AM",
    status: "Upcoming",
  },
  {
    id: "5",
    patient: "Chris Wilson",
    age: 52,
    gender: "Male",
    query: "Physical Therapy",
    date: "2025-05-20",
    time: "3:00 PM",
    status: "Upcoming",
  },
  {
    id: "6",
    patient: "Sophia Martinez",
    age: 41,
    gender: "Female",
    query: "Nutrition Consultation",
    date: "2025-05-22",
    time: "1:00 PM",
    status: "Upcoming",
  },
  {
    id: "7",
    patient: "David Kim",
    age: 60,
    gender: "Male",
    query: "Joint pain and swelling",
    date: "2025-06-12",
    time: "4:00 PM",
    status: "Upcoming",
  },
];

const Home = () => {
  const router = useRouter();
  const { authState } = useAuth();

  useEffect(() => {
    console.log("Auth State:", authState.loginModel);
  }, [authState]);

  return (
    <SafeAreaView style={[doctorStyles.mainContainer, styles.container]}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              console.log("Refreshing...");
            }}
          />
        }
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Message */}
        <StatusBar
          backgroundColor={Colors.custom.color1}
          barStyle={"light-content"}
        />
        <View
          style={{
            position: "relative",
            paddingHorizontal: 20,
            backgroundColor: Colors.custom.color1,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          }}
        >
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text
            style={{
              fontSize: 25,
              marginLeft: 5,
              marginBottom: "7%",
              color: "#FFF",
            }}
          >
            Amit Deo!
          </Text>

          <Pressable
            onPress={() => router.push("/(doctor)/profile")}
            style={{
              overflow: "hidden",
              aspectRatio: 1 / 1,
              height: 60,
              position: "absolute",
              right: 20,
              bottom: "15%",
              borderWidth: 2,
              borderColor: "#FFF",
              borderRadius: 99,
            }}
          >
            <Image
              style={[doctorStyles.image, { borderRadius: 99 }]}
              source={require("@/assets/doctor/profile.png")}
            />
          </Pressable>
        </View>

        <View
          style={{
            flex: 1,
            paddingTop: "10%",
            // paddingHorizontal: 20,
          }}
        >
          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity
              onPress={() => router.push("/(doctor)/appointments")}
              style={styles.actionButton}
            >
              <Text style={styles.actionText}>Manage Appointments</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/doctor/PatientRecord")}
              style={styles.actionButton}
            >
              <Text style={styles.actionText}>View Patient Records</Text>
            </TouchableOpacity>
          </View>

          {/* Upcoming Appointments */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
            }}
          >
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity
              onPress={() => router.push("/(doctor)/appointments")}
            >
              <Text style={{ color: Colors.custom.color2, fontWeight: 600 }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id}
            renderItem={RenderAppointment}
            scrollEnabled={false}
            contentContainerStyle={styles.appointmentList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    // backgroundColor: "red",
    // padding: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    // marginBottom: 20,
    marginTop: "10%",
    color: "#FFF",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  actionButton: {
    backgroundColor: Colors.custom.color1,
    padding: 15,
    // paddingVertical: 50,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  appointmentList: {
    // paddingBottom: 20,
  },
  appointmentCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    margin: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  patientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  dateTime: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  reason: {
    fontSize: 14,
    color: "#666",
  },
  chatButton: {
    aspectRatio: 1 / 1,
    backgroundColor: Colors.custom.color3,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  chatButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
