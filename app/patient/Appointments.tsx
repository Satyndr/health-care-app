import CustomButton from "@/components/common/CustomButton";
import { Colors } from "@/constants/Colors";
import { patientStyles } from "@/styles/patientStyles";
import { Route, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const appointments = [
  {
    id: "1",
    doctor: "Dr. Alice Brown",
    date: "2025-06-15",
    time: "9:30 AM",
    specialty: "Neurologist",
    status: "In Progress",
  },
  {
    id: "2",
    doctor: "Dr. Michael Green",
    date: "2025-06-18",
    time: "1:00 PM",
    specialty: "Orthopedic",
    status: "In Progress",
  },
  {
    id: "3",
    doctor: "Dr. Alice Brown",
    date: "2025-06-20",
    time: "11:00 AM",
    specialty: "Neurologist",
    status: "Upcoming",
  },
  {
    id: "4",
    doctor: "Dr. Michael Green",
    date: "2025-06-22",
    time: "3:00 PM",
    specialty: "Orthopedic",
    status: "Upcoming",
  },
  {
    id: "5",
    doctor: "Dr. Alice Brown",
    date: "2025-06-10",
    time: "10:30 AM",
    specialty: "Neurologist",
    status: "Completed",
  },
  {
    id: "6",
    doctor: "Dr. Michael Green",
    date: "2025-06-12",
    time: "4:00 PM",
    specialty: "Orthopedic",
    status: "Completed",
  },
];

const Prescription = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("In Progress");
  const handleImageClick = (doctorId: string) => {
    router.push(`/doctor/${doctorId}` as Route);
  };
  const filteredAppointments = appointments.filter(
    (appointment) => appointment.status === activeTab
  );

  const renderAppointment = ({ item }: any) => (
    <View style={styles.appointmentCard}>
      <View style={{ display: "flex", flexDirection: "row", gap: "5%" }}>
        <Pressable
          onPress={() => {}}
          style={{
            overflow: "hidden",
            aspectRatio: 1 / 1,
            height: 60,
            borderWidth: 2,
            borderColor: "#FFF",
            borderRadius: 99,
          }}
        >
          <Image
            source={require("@/assets/patient/doctor1.jpg")}
            // source={require("@/assets/doctor/profile.png")}
            style={patientStyles.image}
          />
        </Pressable>
        <View>
          <Text style={styles.doctorName}>{item.doctor}</Text>
          <Text style={styles.specialty}>{item.specialty}</Text>
          <Text style={styles.dateTime}>
            {item.date} at {item.time}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          transform: [
            {
              translateY: "25%",
            },
          ],
        }}
      >
        {item.status !== "Completed" && (
          <>
            <CustomButton
              style={{
                width: "48%",
                backgroundColor: "#FFF",
                borderWidth: 2,
                borderColor: Colors.custom.color2,
              }}
              title="Call"
              fontSize={11}
              fontColor={Colors.custom.color2}
              onPress={() => {}}
            />
            <CustomButton
              style={{ width: "48%" }}
              fontSize={11}
              title="Chat"
              onPress={() => router.push("/chat/[id]")}
            />
          </>
        )}

        {item.status === "Completed" && (
          <>
            <CustomButton
              style={{ width: "48%" }}
              fontSize={11}
              title="Give Feedback"
              onPress={() => router.push("/patient/Feedback")}
            />
            <CustomButton
              style={{ width: "48%" }}
              fontSize={11}
              title="Prescription"
              onPress={() => router.push("/patient/Prescription")}
            />
          </>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[patientStyles.mainContainer, { backgroundColor: "#F5F5F5" }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={[patientStyles.heading2, { marginBottom: "2%" }]}>
            Appointments
          </Text>
          <Text
            style={[
              patientStyles.text3,
              { textAlign: "left", marginLeft: "3%" },
            ]}
          >
            {new Date().toLocaleDateString("en-US", {
              //   weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </View>

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
            marginTop: "7%",
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
                    color: activeTab === item ? Colors.custom.color2 : "#666",
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
            renderItem={renderAppointment}
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

const styles = StyleSheet.create({
  appointmentCard: {
    backgroundColor: "#fff",
    paddingVertical: "10%",
    paddingHorizontal: "5%",
    borderRadius: 20,
    margin: "5%",
    // marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 7,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  specialty: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 14,
    color: "#666",
  },
});
