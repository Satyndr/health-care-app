import { Colors } from "@/constants/Colors";
import { getImages } from "@/mockData/images";
import { doctorStyles } from "@/styles/doctorStyles";
import { Route, useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import CustomButton from "../common/CustomButton";

const RenderAppointment = ({ item }: any) => {
  const router = useRouter();
  const handleImageClick = (doctorId: string) => {
    router.push(`/patient/Profile/${doctorId}` as Route);
  };
  return (
    <View style={styles.appointmentCard}>
      <View style={{ display: "flex", flexDirection: "row", gap: "5%" }}>
        <Pressable
          onPress={() => handleImageClick(item.id)}
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
            // source={require("@/assets/patient/doctor1.jpg")}
            src={getImages()}
            style={doctorStyles.image}
          />
        </Pressable>
        <View>
          <Text style={styles.doctorName}>{item.patient}</Text>
          <Text style={styles.specialty}>
            Age: {item.age} | Gender: {item.gender}
          </Text>
          <Text style={styles.specialty}>Query: {item.query}</Text>
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
                borderColor: Colors.custom.color1,
              }}
              title="Call"
              fontSize={11}
              fontColor={Colors.custom.color1}
              onPress={() => router.push("/call/[id]")}
            />
            <CustomButton
              style={{ width: "48%", backgroundColor: Colors.custom.color1 }}
              fontSize={11}
              title="Chat"
              onPress={() => router.push("/chat/[id]")}
            />
          </>
        )}

        {item.status === "Completed" && (
          <View style={{ width: "100%" }}>
            <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
              Feedback:
            </Text>
            <Text style={{ color: "#333" }}>
              {item.feedback ? item.feedback : "No feedback given."}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default RenderAppointment;

const styles = StyleSheet.create({
  appointmentCard: {
    backgroundColor: "#fff",
    paddingVertical: "10%",
    paddingHorizontal: "5%",
    borderRadius: 20,
    marginHorizontal: "5%",
    marginTop: "3%",
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
