import { Colors } from "@/constants/Colors";
import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const notifications = [
  {
    id: "1",
    title: "New Appointment Booked",
    message: "You have a new appointment with Jane Smith on 12 May, 2:00 PM.",
    time: "2 min ago",
    icon: require("@/assets/doctor/profile.png"),
  },
  {
    id: "2",
    title: "Patient Feedback",
    message: "Michael Brown left feedback on your last consultation.",
    time: "10 min ago",
    icon: require("@/assets/doctor/profile.png"),
  },
  {
    id: "3",
    title: "Schedule Reminder",
    message: "You have 3 appointments scheduled for today.",
    time: "1 hr ago",
    icon: require("@/assets/doctor/profile.png"),
  },
  {
    id: "4",
    title: "Profile Update",
    message: "Your profile was viewed 5 times today.",
    time: "2 hr ago",
    icon: require("@/assets/doctor/profile.png"),
  },
];

const DoctorNotifications = () => {
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Image source={item.icon} style={styles.icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default DoctorNotifications;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerBar: {
    width: "100%",
    backgroundColor: Colors.custom.color1,
    paddingVertical: "4%",
    alignItems: "flex-start",
    marginBottom: "3%",
    paddingLeft: "5%",
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
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.custom.color3,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "4%",
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.custom.color1,
    marginBottom: 2,
  },
  message: {
    fontSize: 14,
    color: "#444",
    marginBottom: 2,
  },
  time: {
    fontSize: 12,
    color: Colors.custom.color2,
    marginTop: 2,
    alignSelf: "flex-end",
  },
});
