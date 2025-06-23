import CustomButton from "@/components/common/CustomButton";
import { Colors } from "@/constants/Colors";
import { Doctor } from "@/constants/types";
import { doctors } from "@/mockData/doctors";
import { doctorTypes } from "@/mockData/doctorTypes";
import { getImages } from "@/mockData/images";
import { doctorStyles } from "@/styles/doctorStyles";
import { Route, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Book = () => {
  const [activeTab, setActiveTab] = useState(doctorTypes[0].title);
  const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);
  const router = useRouter();

  const handleImageClick = (doctorId: string) => {
    router.push(`/doctor/${doctorId}` as Route);
  };

  const handleBookAppointment = (doctorId: string) => {
    router.push(`/appointment/${doctorId}` as Route);
  };

  const renderDoctorTabs = ({ item }: any) => {
    return (
      <Pressable
        onPress={() => setActiveTab(item.title)}
        style={[
          {
            borderColor: Colors.custom.color2,
            borderWidth: 2,
            borderRadius: 99,
            paddingVertical: 5,
            paddingHorizontal: 7,
            marginHorizontal: 5,
            backgroundColor:
              activeTab === item.title ? Colors.custom.color2 : "#FFF",
          },
          activeTab === item.title && {
            shadowColor: Colors.custom.color2,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.5,
            shadowRadius: 6,
            elevation: 5,
          },
        ]}
      >
        <Text
          style={{
            color: activeTab === item.title ? "#FFF" : Colors.custom.color2,
            fontWeight: 500,
          }}
        >
          {item.title}
        </Text>
      </Pressable>
    );
  };

  const doctorsToShow = () => {
    const filteredDoctors = doctors.filter(
      (doctor) => doctor.specialty === activeTab
    );
    // console.log("sdfgfsd ", filteredDoctors);
    setDoctorsList(filteredDoctors);
  };

  useEffect(() => {
    doctorsToShow();
  }, [activeTab]);

  const renderDoctor = ({ item }: any) => (
    <Pressable style={styles.appointmentCard}>
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
            // source={require("@/assets/doctor/profile.png")}
            // src={item.image}
            src={getImages()}
            style={doctorStyles.image}
          />
        </Pressable>
        <View>
          <Text style={styles.doctorName}>{item.name}</Text>
          <Text style={styles.specialty}>{item.specialty}</Text>

          <View
            style={{
              // backgroundColor: Colors.custom.color3,
              backgroundColor: "rgba(210, 131, 207, 0.5)",
              padding: 5,
              paddingHorizontal: 7,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: Colors.custom.color2 }}>MD, MBBS, MDS</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          // transform: [
          //   {
          //     translateY: "25%",
          //   },
          // ],
        }}
      >
        <CustomButton
          style={{
            width: "48%",
            backgroundColor: "#FFF",
            borderWidth: 2,
            borderColor: Colors.custom.color2,
          }}
          title="Consult at clinic"
          fontSize={11}
          fontColor={Colors.custom.color2}
          onPress={() => handleBookAppointment(item.id)}
        />
        <CustomButton
          style={{ width: "48%" }}
          fontSize={11}
          title="Consult Online"
          onPress={() => handleBookAppointment(item.id)}
        />
      </View>

      <View
        style={{
          position: "absolute",
          backgroundColor: "#FFFF",
          borderRadius: 5,
          padding: 3,
          top: 0,
          right: 0,
        }}
      >
        <Text style={[styles.dateTime]}>{item.timing}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Explore</Text>

      {/* Doctor Type Tabs */}
      <View>
        <FlatList
          data={doctorTypes}
          keyExtractor={(item) => item.id}
          horizontal
          renderItem={renderDoctorTabs}
          contentContainerStyle={styles.list}
        />
      </View>

      <FlatList
        data={doctorsList}
        keyExtractor={(item) => item.id}
        renderItem={renderDoctor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    // paddingHorizontal: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: 700,
    marginVertical: "5%",
    marginLeft: "3%",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
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
    fontSize: 10,
    fontWeight: 600,
    color: Colors.custom.color4,
    marginRight: 5,
  },

  appointmentCard: {
    // backgroundColor: "#fff",
    backgroundColor: "rgba(210, 131, 207, 0.1)",
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    borderRadius: 20,
    marginTop: "2%",
    marginHorizontal: "5%",
    marginBottom: "5%",
    // marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    // elevation: 3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 7,
    overflow: "hidden",
  },
});

export default Book;
