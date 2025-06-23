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

const medicines = [
  {
    id: "1",
    name: "Paracetamol",
    dosage: "500mg",
    frequency: "Twice a day",
  },
  {
    id: "2",
    name: "Ibuprofen",
    dosage: "400mg",
    frequency: "Once a day",
  },
  {
    id: "3",
    name: "Amoxicillin",
    dosage: "250mg",
    frequency: "Three times a day",
  },
  {
    id: "4",
    name: "Ciprofloxacin",
    dosage: "500mg",
    frequency: "Once a day",
  },
  {
    id: "5",
    name: "Metformin",
    dosage: "850mg",
    frequency: "Twice a day",
  },
];

const Prescription = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Active Medicines");
  const handleImageClick = (doctorId: string) => {
    router.push(`/doctor/${doctorId}` as Route);
  };
  const renderItems = ({ item, index }: any) => {
    return (
      <View
        key={index}
        style={{
          backgroundColor: "#FFF",
          borderRadius: 10,
          padding: "5%",
          marginVertical: "2%",
          marginHorizontal: "3%",
          borderWidth: 1,
          borderColor: "#E0E0E0",
        }}
      >
        <View
          style={{
            borderBottomColor: "#bbb",
            borderBottomWidth: 1,
          }}
        >
          {medicines.map((medicine) => (
            <View key={medicine.id} style={{ marginBottom: "2%" }}>
              <Text style={[patientStyles.text2, { fontWeight: "600" }]}>
                {medicine.name}
                {"  "}
                <Text style={[patientStyles.text3, { fontWeight: "400" }]}>
                  {medicine.dosage}
                </Text>
              </Text>
              <View
                style={{
                  backgroundColor: "rgba(210, 131, 207, 0.1)",
                  paddingVertical: "2%",
                  paddingHorizontal: "4%",
                  borderRadius: 10,
                  alignSelf: "flex-start",
                }}
              >
                <Text
                  style={[
                    patientStyles.text3,
                    { fontWeight: "400", color: Colors.custom.color2 },
                  ]}
                >
                  {medicine.frequency}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "5%",
          }}
        >
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
              source={require("@/assets/patient/doctor1.jpg")}
              style={patientStyles.image}
            />
          </Pressable>
          <View>
            <Text style={[patientStyles.text2, { fontWeight: "600" }]}>
              Dr. John Doe
            </Text>
            <Text style={[patientStyles.text3, { fontWeight: "400" }]}>
              Dermotologist
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[patientStyles.mainContainer, { backgroundColor: "#F5F5F5" }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={[patientStyles.heading2, { marginBottom: "2%" }]}>
            Medicines
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
            marginVertical: 5,
          }}
        >
          {["Active Medicines", "History"].map((item, index) => {
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
                  width: "48%",
                }}
              >
                <Text
                  style={{
                    fontWeight: activeTab === item ? "600" : "500",
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
            data={[1, 2, 3]}
            renderItem={renderItems}
            keyExtractor={(item) => item.toString()}
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

const styles = StyleSheet.create({});
