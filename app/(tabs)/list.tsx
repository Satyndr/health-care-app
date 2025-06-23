import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import React from "react";
import { Route, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const doctors = [
  {
    id: "1",
    name: "Dr. John Doe",
    specialty: "Cardiologist",
    image: "https://via.placeholder.com/100",
  },
  {
    id: "2",
    name: "Dr. Jane Smith",
    specialty: "Dermatologist",
    image: "https://via.placeholder.com/100",
  },
  {
    id: "3",
    name: "Dr. Emily Johnson",
    specialty: "Pediatrician",
    image: "https://via.placeholder.com/100",
  },
];

const List = () => {
  const router = useRouter();

  const handleImageClick = (doctorId: string) => {
    router.push(`/doctor/${doctorId}` as Route);
  };

  const handleBookAppointment = (doctorId: string) => {
    router.push(`/appointment/${doctorId}` as Route);
  };

  const renderDoctor = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => handleImageClick(item.id)}
      style={styles.card}
    >
      <View>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.specialty}>{item.specialty}</Text>
      </View>
      <Button
        title="Book"
        onPress={() => handleBookAppointment(item.id)}
        color="#5391B4"
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.container}> */}
      <Text style={styles.heading}>Explore</Text>
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id}
        renderItem={renderDoctor}
        contentContainerStyle={styles.list}
      />
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: 700,
    paddingBottom: 20,
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
  specialty: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
});

export default List;
