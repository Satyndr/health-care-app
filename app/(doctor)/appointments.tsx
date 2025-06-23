import RenderAppointment from "@/components/Doctor/RenderAppointment";
import { Colors } from "@/constants/Colors";
import { patientStyles } from "@/styles/patientStyles";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const appointments = [
  {
    id: "1",
    patient: "John Doe",
    age: 32,
    gender: "Male",
    query: "Headache and dizziness",
    date: "2025-06-15",
    time: "9:30 AM",
    status: "In Progress",
  },
  {
    id: "2",
    patient: "Jane Smith",
    age: 28,
    gender: "Female",
    query: "Knee pain after running",
    date: "2025-06-18",
    time: "1:00 PM",
    status: "In Progress",
  },
  {
    id: "3",
    patient: "Emily Johnson",
    age: 45,
    gender: "Female",
    query: "Migraine and vision issues",
    date: "2025-06-20",
    time: "11:00 AM",
    status: "Upcoming",
  },
  {
    id: "4",
    patient: "Michael Brown",
    age: 39,
    gender: "Male",
    query: "Back pain",
    date: "2025-06-22",
    time: "3:00 PM",
    status: "Upcoming",
  },
  {
    id: "5",
    patient: "Sarah Lee",
    age: 51,
    gender: "Female",
    query: "Regular checkup",
    date: "2025-06-10",
    time: "10:30 AM",
    status: "Completed",
    feedback: "Very thorough and kind. Answered all my questions!",
  },
  {
    id: "6",
    patient: "David Kim",
    age: 60,
    gender: "Male",
    query: "Joint pain and swelling",
    date: "2025-06-12",
    time: "4:00 PM",
    status: "Completed",
    feedback: "Treatment was effective. Highly recommend!",
  },
  {
    id: "7",
    patient: "Priya Sharma",
    age: 36,
    gender: "Female",
    query: "Diabetes management",
    date: "2025-06-25",
    time: "2:00 PM",
    status: "Upcoming",
  },
  {
    id: "8",
    patient: "Carlos Mendez",
    age: 48,
    gender: "Male",
    query: "Chest pain and shortness of breath",
    date: "2025-06-27",
    time: "10:00 AM",
    status: "In Progress",
  },
  {
    id: "9",
    patient: "Fatima Noor",
    age: 29,
    gender: "Female",
    query: "Allergy and skin rash",
    date: "2025-06-29",
    time: "4:30 PM",
    status: "Upcoming",
  },
  {
    id: "10",
    patient: "James Lee",
    age: 54,
    gender: "Male",
    query: "Follow-up for hypertension",
    date: "2025-07-01",
    time: "11:15 AM",
    status: "Completed",
    feedback: "Doctor explained everything clearly.",
  },
  {
    id: "11",
    patient: "Aisha Khan",
    age: 41,
    gender: "Female",
    query: "Thyroid checkup",
    date: "2025-07-03",
    time: "9:45 AM",
    status: "Upcoming",
  },
  {
    id: "12",
    patient: "Robert Brown",
    age: 67,
    gender: "Male",
    query: "Arthritis pain",
    date: "2025-07-05",
    time: "3:30 PM",
    status: "Completed",
    feedback: "Very patient and attentive.",
  },
];

const Prescription = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("In Progress");

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.status === activeTab
  );

  return (
    <SafeAreaView
      style={[patientStyles.mainContainer, { backgroundColor: "#F5F5F5" }]}
    >
      {/* Header Bar like notifications */}
      <View
        style={{
          width: "100%",
          backgroundColor: Colors.custom.color1,
          paddingVertical: "4%",
          paddingLeft: "5%",
          alignItems: "flex-start",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: 1,
          }}
        >
          Appointments
        </Text>
        <Text
          style={[patientStyles.text3, { textAlign: "left", color: "#fff" }]}
        >
          {new Date().toLocaleDateString("en-US", {
            //   weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* tabs */}
        <View
          style={{
            width: "95%",
            backgroundColor: "#FFF",
            alignSelf: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "2%",
            borderRadius: 10,
            marginTop: "2%",
            marginBottom: "2%",
          }}
        >
          {["In Progress", "Upcoming", "Completed"].map((item, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => setActiveTab(item)}
                style={{
                  backgroundColor:
                    activeTab === item ? "rgba(210, 131, 207, 0.1)" : "#FFF",
                  paddingVertical: "2%",
                  paddingHorizontal: "4%",
                  borderRadius: 10,
                  width: "30%",
                }}
              >
                <Text
                  style={{
                    fontWeight: activeTab === item ? "600" : "500",
                    fontSize: 13,
                    color: activeTab === item ? Colors.custom.color1 : "#666",
                    textAlign: "center",
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View>
          <FlatList
            data={filteredAppointments}
            renderItem={RenderAppointment}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: "10%",
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Prescription;
