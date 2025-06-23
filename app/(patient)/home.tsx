import CustomButton from "@/components/common/CustomButton";
import { Colors } from "@/constants/Colors";
import { doctorTypes } from "@/mockData/doctorTypes";
import { doctorStyles } from "@/styles/doctorStyles";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const appointments = [
  {
    id: "1",
    doctor: "Dr. John Doe",
    date: "2025-05-10",
    time: "10:00 AM",
    specialty: "Cardiologist",
  },
  {
    id: "2",
    doctor: "Dr. Jane Smith",
    date: "2025-05-12",
    time: "2:00 PM",
    specialty: "Dermatologist",
  },
];

const Home = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);

  const renderDoctorTypes = ({ item }: any) => {
    return (
      <View style={{ alignItems: "center", marginHorizontal: 10 }}>
        <Pressable
          onPress={() => {
            router.push("/(patient)/book");
          }}
          style={{
            overflow: "hidden",
            aspectRatio: 1 / 1,
            height: 80,
            borderWidth: 2,
            borderColor: Colors.custom.color2,
            borderRadius: 99,
          }}
        >
          <Image
            source={item.image}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 99,
              objectFit: "cover",
            }}
          />
        </Pressable>
        <Text
          style={{
            marginTop: 10,
            fontSize: 14,
            fontWeight: 500,
            color: "#666",
          }}
        >
          {item.title}
        </Text>
      </View>
    );
  };
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
            style={doctorStyles.image}
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
          transform: [
            {
              translateY: "25%",
            },
          ],
        }}
      >
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
      </View>
    </View>
  );

  // Refresh handler
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate network request
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={[doctorStyles.mainContainer, styles.container]}>
      <StatusBar
        backgroundColor={Colors.custom.color2}
        barStyle={"light-content"}
      />
      {/* <CommunityBall /> */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        overScrollMode="never"
        // bounces={false}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Message */}
        <View
          style={{
            position: "relative",
            paddingHorizontal: 20,
            backgroundColor: Colors.custom.color2,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            elevation: 10,
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
            onPress={() => router.push("/profile")}
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
              onPress={() => router.push("/patient/Appointments")}
              style={styles.actionButton}
            >
              <Text style={styles.actionText}>All Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push("/patient/Prescription")}
            >
              <Text style={styles.actionText}>Your Prescription</Text>
            </TouchableOpacity>
          </View>

          {/* Find Doctors */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
            }}
          >
            <Text style={styles.sectionTitle}>Find Your Doctor</Text>
            <Text
              onPress={() => router.push("/(patient)/book")}
              style={{ color: Colors.custom.color2, fontWeight: 600 }}
            >
              See All
            </Text>
          </View>
          <FlatList
            data={doctorTypes}
            keyExtractor={(item) => item.id}
            // scrollEnabled={false}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderDoctorTypes}
            contentContainerStyle={styles.appointmentList}
          />

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

            <Text
              onPress={() => router.push("/patient/Appointments")}
              style={{ color: Colors.custom.color2, fontWeight: 600 }}
            >
              See All
            </Text>
          </View>
          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={renderAppointment}
            contentContainerStyle={styles.appointmentList}
          />
        </View>

        {/* workout and diet */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <Text style={styles.sectionTitle}>Explore more</Text>
        </View>
        <View style={{ width: "100%", height: "30%" }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: 20,
              gap: 20,
            }}
          >
            <Pressable onPress={() => router.push("/patient/Symptom")}>
              <Image
                source={require("@/assets/patient/symptom.png")}
                style={{
                  width: 200,
                  height: 300,
                  borderRadius: 20,
                  objectFit: "cover",
                }}
              />
            </Pressable>
            <Pressable
              onPress={() => router.push("/patient/Workout/ChooseWorkout")}
            >
              <Image
                source={require("@/assets/patient/workout.png")}
                style={{
                  width: 200,
                  height: 300,
                  borderRadius: 20,
                  objectFit: "cover",
                }}
              />
            </Pressable>
            <Pressable onPress={() => router.push("/patient/Diet")}>
              <Image
                source={require("@/assets/patient/diet.png")}
                style={{
                  width: 200,
                  height: 300,
                  borderRadius: 20,
                  objectFit: "cover",
                }}
              />
            </Pressable>
          </ScrollView>
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
    display: "flex",
    flexWrap: "wrap",
    gap: "4%",
  },
  actionButton: {
    backgroundColor: Colors.custom.color2,
    padding: 15,
    // paddingVertical: 50,
    borderRadius: 20,
    // marginHorizontal: "1%",
    alignItems: "center",
    width: "48%",
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  appointmentList: {
    paddingBottom: 20,
  },
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

export default Home;
