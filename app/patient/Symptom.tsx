import CustomButton from "@/components/common/CustomButton";
import { Colors } from "@/constants/Colors";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Route, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Symptom = { id: number; name: string; icon: string };
type Doctor = {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  image: any;
  languages: string[];
  price: string;
  available: string;
};

const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "General Physician",
    rating: 4.8,
    reviews: 124,
    experience: "12 years",
    image: require("@/assets/patient/doctor1.jpg"),
    languages: ["English", "Spanish"],
    price: "$120",
    available: "Today, 4:30 PM",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    rating: 4.9,
    reviews: 89,
    experience: "15 years",
    image: require("@/assets/patient/doctor1.jpg"),
    languages: ["English", "Mandarin"],
    price: "$150",
    available: "Tomorrow, 10:00 AM",
  },
  {
    id: 3,
    name: "Dr. Priya Patel",
    specialty: "ENT Specialist",
    rating: 4.7,
    reviews: 67,
    experience: "8 years",
    image: require("@/assets/patient/doctor1.jpg"),
    languages: ["English", "Hindi"],
    price: "$110",
    available: "Today, 6:00 PM",
  },
];

const SymptomChecker = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [popularSymptoms, setPopularSymptoms] = useState<Symptom[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedSymptoms.length > 0 || searchQuery !== "") {
      findDoctors();
    } else {
      setFilteredDoctors([]);
    }
  }, [selectedSymptoms, searchQuery]);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      setTimeout(() => {
        setPopularSymptoms([
          { id: 1, name: "Fever", icon: "" },
          { id: 2, name: "Headache", icon: "" },
          { id: 3, name: "Cough", icon: "" },
          { id: 4, name: "Sore throat", icon: "" },
          { id: 5, name: "Fatigue", icon: "" },
          { id: 6, name: "Nausea", icon: "" },
        ]);
        setRefreshing(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      setRefreshing(false);
    }
  };

  // Dummy query function for demonstration
  const query = async (input: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          result: `Dummy response for query: ${input}`,
        });
      }, 500);
    });
  };

  const handleSymptomSelect = (symptom: Symptom) => {
    if (selectedSymptoms.some((s) => s.id === symptom.id)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s.id !== symptom.id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const searchSymptoms = (query: string) => {
    setSearchQuery(query);
  };

  const findDoctors = async () => {
    setLoading(true);
    setFilteredDoctors([]);
    try {
      setTimeout(() => {
        if (selectedSymptoms.length > 0 || searchQuery !== "") {
          setFilteredDoctors(mockDoctors);
        } else {
          setFilteredDoctors([]);
        }
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleImageClick = (doctorId: string) => {
    router.push(`/doctor/${doctorId}` as Route);
  };
  const handleBookAppointment = (doctorId: string) => {
    router.push(`/appointment/${doctorId}` as Route);
  };

  const renderDoctorItem = ({ item }: { item: Doctor }) => (
    <Pressable style={styles.appointmentCard}>
      <View style={{ display: "flex", flexDirection: "row", gap: "5%" }}>
        <Pressable
          onPress={() => handleImageClick(item.id.toString())}
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
            style={styles.doctorImage}
          />
        </Pressable>
        <View>
          <Text style={styles.doctorName}>{item.name}</Text>
          <Text style={styles.specialty}>{item.specialty}</Text>
          <View
            style={{
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
        }}
      >
        <CustomButton
          style={{
            width: "48%",
            backgroundColor: "#FFF",
            borderWidth: 2,
            borderColor: Colors.custom.color2,
          }}
          fontSize={14}
          fontColor={Colors.custom.color2}
          title="Consult at clinic"
          onPress={() => handleBookAppointment(item.id.toString())}
        />
        <CustomButton
          style={{ width: "48%" }}
          title="Consult Online"
          fontSize={14}
          onPress={() => handleBookAppointment(item.id.toString())}
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
        <Text style={styles.dateTime}>{item.available}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Symptom Checker</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="#333" />
        </TouchableOpacity>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={styles.searchContainer}>
          <FontAwesome
            name="search"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search symptoms..."
            value={searchQuery}
            onChangeText={(e) => searchSymptoms(e)}
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Symptoms</Text>
          <FlatList
            data={popularSymptoms}
            renderItem={({ item }) => {
              const isSelected = selectedSymptoms.some((s) => s.id === item.id);
              return (
                <TouchableOpacity
                  style={[
                    styles.symptomItem,
                    isSelected && styles.selectedSymptom,
                  ]}
                  onPress={() => handleSymptomSelect(item)}
                >
                  <Text
                    style={[
                      styles.symptomText,
                      isSelected && styles.selectedSymptomText,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.symptomsList}
          />
        </View>

        {(selectedSymptoms.length > 0 || searchQuery !== "") && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Possible Conditions</Text>
              <View style={styles.conditionsList}>
                {/* In a real app, you would connect to a medical API to get possible conditions */}
                <Text style={styles.conditionItem}>
                  {"Common Cold (30% match)"}
                </Text>
                <Text style={styles.conditionItem}>
                  {"Influenza (25% match)"}
                </Text>
                <Text style={styles.conditionItem}>
                  {"Allergies (20% match)"}
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recommended Doctors</Text>
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#2A86FF" />
                  <Text style={styles.loadingText}>
                    Finding doctors for your symptoms...
                  </Text>
                </View>
              ) : filteredDoctors.length > 0 ? (
                filteredDoctors.map((item: Doctor) => (
                  <View key={item.id}>{renderDoctorItem({ item })}</View>
                ))
              ) : (
                <View style={styles.emptyDoctorsContainer}>
                  <MaterialIcons name="search-off" size={60} color="#ccc" />
                  <Text style={styles.emptyDoctorsText}>
                    No doctors found for your symptoms
                  </Text>
                  <Text style={styles.emptyDoctorsSubtext}>
                    Try adjusting your symptoms or search criteria
                  </Text>
                  <TouchableOpacity
                    style={styles.backToSymptomsButton}
                    onPress={fetchData}
                  >
                    <Text style={styles.backToSymptomsButtonText}>
                      Adjust Symptoms
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 15,
    margin: 20,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333",
  },
  selectedContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  selectedSymptomsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  selectedSymptomPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A86FF",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedSymptomPillText: {
    color: "#fff",
    marginRight: 5,
    fontSize: 14,
  },
  smallSymptomPill: {
    backgroundColor: "#E3F2FD",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  smallSymptomPillText: {
    color: "#2A86FF",
    fontSize: 12,
  },
  findDoctorsButton: {
    backgroundColor: "#2A86FF",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 20,
  },
  findDoctorsButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backToSymptomsButton: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
    width: "70%",
  },
  backToSymptomsButtonText: {
    color: "#2A86FF",
    fontWeight: "bold",
    fontSize: 16,
  },
  section: {
    marginTop: 20,
  },
  symptomsList: {
    paddingHorizontal: 15,
  },
  symptomItem: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 4,
    marginRight: 10,
    minWidth: 100,
    borderColor: Colors.custom.color2,
    borderWidth: 2,
  },
  selectedSymptom: {
    backgroundColor: Colors.custom.color2,
  },
  symptomText: {
    // marginTop: 8,
    fontSize: 14,
    color: Colors.custom.color2,
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedSymptomText: {
    color: "#fff",
  },
  bodyPartsGrid: {
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  bodyPartItem: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: "30%",
  },
  bodyPartText: {
    marginTop: 8,
    fontSize: 14,
    color: "#4E4E4E",
    textAlign: "center",
  },
  emptyStateText: {
    color: "#888",
    paddingHorizontal: 20,
    fontStyle: "italic",
  },
  conditionsList: {
    paddingHorizontal: 20,
  },
  conditionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    color: "#333",
  },
  doctorsContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 15,
    color: "#888",
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  resultsTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  selectedSymptomsPills: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  doctorsList: {
    paddingBottom: 20,
  },
  doctorCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  doctorSpecialty: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 5,
    marginRight: 10,
  },
  reviewsText: {
    fontSize: 12,
    color: "#888",
  },
  doctorMeta: {
    marginBottom: 8,
  },
  metaText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  availabilityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2A86FF",
  },
  availableText: {
    fontSize: 12,
    color: "#4CAF50",
  },
  emptyDoctorsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyDoctorsText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 5,
  },
  emptyDoctorsSubtext: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  appointmentCard: {
    backgroundColor: "rgba(210, 131, 207, 0.1)",
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    borderRadius: 20,
    marginTop: "2%",
    marginHorizontal: "5%",
    marginBottom: "5%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 7,
    overflow: "hidden",
  },
  specialty: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 10,
    fontWeight: "600",
    color: Colors.custom.color4,
    marginRight: 5,
  },
});

export default SymptomChecker;
