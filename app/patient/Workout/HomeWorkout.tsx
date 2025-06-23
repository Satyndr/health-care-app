import { Colors } from "@/constants/Colors";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Types
type Exercise = {
  id: string;
  bodyPart: string;
  exercise: string;
  sets?: number;
  reps?: number;
  duration?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  imageUrl?: string;
  description?: string;
  equipment?: string[];
};

const initialExercises: Exercise[] = [
  {
    id: "1",
    bodyPart: "Chest",
    exercise: "Push-ups",
    sets: 3,
    reps: 15,
    difficulty: "Beginner",
    imageUrl: "https://example.com/push-ups.jpg",
    description:
      "Start in a plank position with hands shoulder-width apart. Lower your body until your chest nearly touches the floor, then push back up.",
    equipment: ["None"],
  },
  {
    id: "2",
    bodyPart: "Legs",
    exercise: "Squats",
    sets: 4,
    reps: 20,
    difficulty: "Beginner",
    imageUrl: "https://example.com/squats.jpg",
    description:
      "Stand with feet shoulder-width apart. Lower your body as if sitting in a chair, keeping knees behind toes. Return to standing position.",
    equipment: ["None"],
  },
  {
    id: "3",
    bodyPart: "Core",
    exercise: "Plank",
    sets: 3,
    duration: "30-60 sec",
    difficulty: "Intermediate",
    imageUrl: "https://example.com/plank.jpg",
    description:
      "Hold a push-up position with your body straight from head to heels. Engage your core and hold for time.",
    equipment: ["Yoga mat"],
  },
  {
    id: "4",
    bodyPart: "Arms",
    exercise: "Tricep Dips",
    sets: 3,
    reps: 12,
    difficulty: "Intermediate",
    imageUrl: "https://example.com/tricep-dips.jpg",
    description:
      "Use a sturdy chair or bench. Sit on the edge, place hands beside hips, slide off and lower body by bending elbows to 90 degrees, then push back up.",
    equipment: ["Chair", "Bench"],
  },
  {
    id: "5",
    bodyPart: "Full Body",
    exercise: "Burpees",
    sets: 3,
    reps: 10,
    difficulty: "Advanced",
    imageUrl: "https://example.com/burpees.jpg",
    description:
      "From standing, drop into squat with hands on floor. Kick feet back to plank, do a push-up, return to squat, then jump up explosively.",
    equipment: ["None"],
  },
  {
    id: "6",
    bodyPart: "Back",
    exercise: "Superman",
    sets: 3,
    duration: "30 sec",
    difficulty: "Beginner",
    imageUrl: "https://example.com/superman.jpg",
    description:
      "Lie face down with arms extended. Lift arms, chest and legs off the floor, hold briefly, then lower back down.",
    equipment: ["Yoga mat"],
  },
];

const HomeWorkout = () => {
  // State
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newExercise, setNewExercise] = useState<Partial<Exercise>>({
    bodyPart: "",
    exercise: "",
    sets: 3,
    reps: 10,
    equipment: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<string>("All");

  // Equipment filter options
  const equipmentOptions = [
    "All",
    "None",
    "Yoga mat",
    "Chair",
    "Resistance bands",
    "Dumbbells",
  ];

  // Handlers
  const handleExercisePress = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsModalVisible(true);
  };

  const handleAddExercise = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setExercises([
        ...exercises,
        {
          ...newExercise,
          id: (exercises.length + 1).toString(),
          difficulty: newExercise.difficulty || "Beginner",
          equipment: newExercise.equipment || ["None"],
        } as Exercise,
      ]);
      setIsLoading(false);
      setIsAddModalVisible(false);
      setNewExercise({
        bodyPart: "",
        exercise: "",
        sets: 3,
        reps: 10,
        equipment: [],
      });
    }, 1000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch =
      ex.exercise.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.bodyPart.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEquipment =
      selectedEquipment === "All" || ex.equipment?.includes(selectedEquipment);
    return matchesSearch && matchesEquipment;
  });

  // Render Functions
  const renderExercise = ({ item }: { item: Exercise }) => (
    <TouchableOpacity
      style={styles.exerciseItem}
      onPress={() => handleExercisePress(item)}
    >
      <View style={styles.exerciseHeader}>
        <Text style={styles.bodyPart}>{item.bodyPart}</Text>
        <View
          style={[
            styles.difficultyBadge,
            item.difficulty === "Beginner" && { backgroundColor: "#e8f5e9" },
            item.difficulty === "Intermediate" && {
              backgroundColor: "#fff8e1",
            },
            item.difficulty === "Advanced" && { backgroundColor: "#ffebee" },
          ]}
        >
          <Text
            style={[
              styles.difficultyText,
              item.difficulty === "Beginner" && { color: "#2e7d32" },
              item.difficulty === "Intermediate" && { color: "#ff8f00" },
              item.difficulty === "Advanced" && { color: "#c62828" },
            ]}
          >
            {item.difficulty}
          </Text>
        </View>
      </View>
      <Text style={styles.exercise}>{item.exercise}</Text>
      <View style={styles.exerciseDetails}>
        <View style={styles.detailItem}>
          <MaterialIcons name="fitness-center" size={16} color="#666" />
          <Text style={styles.detailText}>{item.sets} sets</Text>
        </View>
        {item.reps ? (
          <View style={styles.detailItem}>
            <FontAwesome name="repeat" size={16} color="#666" />
            <Text style={styles.detailText}>{item.reps} reps</Text>
          </View>
        ) : (
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.duration}</Text>
          </View>
        )}
        <View style={styles.detailItem}>
          <MaterialIcons name="handyman" size={16} color="#666" />
          <Text style={styles.detailText}>
            {item.equipment?.join(", ") || "None"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="sad-outline" size={50} color="#ccc" />
      <Text style={styles.emptyText}>No exercises found</Text>
      <Text style={styles.emptySubtext}>Try changing your filters</Text>
    </View>
  );

  const renderEquipmentFilter = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.equipmentFilterContainer}
    >
      {equipmentOptions.map((item) => (
        <TouchableOpacity
          key={item}
          style={[
            styles.equipmentFilterItem,
            selectedEquipment === item && styles.equipmentFilterItemSelected,
            {
              marginLeft: item === "All" ? 20 : 0,
            },
          ]}
          onPress={() => setSelectedEquipment(item)}
        >
          <Text
            style={[
              styles.equipmentFilterText,
              selectedEquipment === item && styles.equipmentFilterTextSelected,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Home Workout</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAddModalVisible(true)}
        >
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search exercises..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <View
        style={{
          marginBottom: 15,
        }}
      >
        {renderEquipmentFilter()}
      </View>

      <FlatList
        data={filteredExercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyComponent}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
      />

      {/* Exercise Detail Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setIsModalVisible(false)}
      >
        {selectedExercise && (
          <ScrollView style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <AntDesign name="close" size={24} color="#333" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>{selectedExercise.exercise}</Text>
            <Text style={styles.modalSubtitle}>
              {selectedExercise.bodyPart}
            </Text>

            <View style={styles.modalBadgeContainer}>
              <View
                style={[
                  styles.modalBadge,
                  selectedExercise.difficulty === "Beginner" && {
                    backgroundColor: "#e8f5e9",
                  },
                  selectedExercise.difficulty === "Intermediate" && {
                    backgroundColor: "#fff8e1",
                  },
                  selectedExercise.difficulty === "Advanced" && {
                    backgroundColor: "#ffebee",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.modalBadgeText,
                    selectedExercise.difficulty === "Beginner" && {
                      color: "#2e7d32",
                    },
                    selectedExercise.difficulty === "Intermediate" && {
                      color: "#ff8f00",
                    },
                    selectedExercise.difficulty === "Advanced" && {
                      color: "#c62828",
                    },
                  ]}
                >
                  {selectedExercise.difficulty}
                </Text>
              </View>
            </View>

            <Image
              source={{ uri: selectedExercise.imageUrl }}
              style={styles.exerciseImage}
              objectFit="cover"
              defaultSource={require("@/assets/patient/workout2.png")}
            />

            <View style={styles.modalDetails}>
              <View style={styles.modalDetailItem}>
                <Text style={styles.modalDetailLabel}>Sets</Text>
                <Text style={styles.modalDetailValue}>
                  {selectedExercise.sets}
                </Text>
              </View>
              {selectedExercise.reps ? (
                <View style={styles.modalDetailItem}>
                  <Text style={styles.modalDetailLabel}>Reps</Text>
                  <Text style={styles.modalDetailValue}>
                    {selectedExercise.reps}
                  </Text>
                </View>
              ) : (
                <View style={styles.modalDetailItem}>
                  <Text style={styles.modalDetailLabel}>Duration</Text>
                  <Text style={styles.modalDetailValue}>
                    {selectedExercise.duration}
                  </Text>
                </View>
              )}
              <View style={styles.modalDetailItem}>
                <Text style={styles.modalDetailLabel}>Equipment</Text>
                <Text style={styles.modalDetailValue}>
                  {selectedExercise.equipment?.join(", ") || "None"}
                </Text>
              </View>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Instructions</Text>
              <Text style={styles.descriptionText}>
                {selectedExercise.description}
              </Text>
            </View>

            <View style={styles.tipsContainer}>
              <Text style={styles.tipsTitle}>Pro Tips</Text>
              <View style={styles.tipItem}>
                <Ionicons name="bulb-outline" size={18} color="#4a90e2" />
                <Text style={styles.tipText}>
                  Focus on form rather than speed
                </Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="bulb-outline" size={18} color="#4a90e2" />
                <Text style={styles.tipText}>
                  Engage your core throughout the movement
                </Text>
              </View>
              {selectedExercise.difficulty === "Advanced" && (
                <View style={styles.tipItem}>
                  <Ionicons name="bulb-outline" size={18} color="#4a90e2" />
                  <Text style={styles.tipText}>
                    Try variations to increase difficulty
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </Modal>

      {/* Add Exercise Modal */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <ScrollView style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsAddModalVisible(false)}
          >
            <AntDesign name="close" size={24} color="#333" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Add New Exercise</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Body Part</Text>
            <TextInput
              style={styles.input}
              value={newExercise.bodyPart}
              onChangeText={(text) =>
                setNewExercise({ ...newExercise, bodyPart: text })
              }
              placeholder="e.g. Core, Legs, Full Body"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Exercise Name</Text>
            <TextInput
              style={styles.input}
              value={newExercise.exercise}
              onChangeText={(text) =>
                setNewExercise({ ...newExercise, exercise: text })
              }
              placeholder="e.g. Burpees, Mountain Climbers"
            />
          </View>

          <View style={styles.rowInputContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.inputLabel}>Sets</Text>
              <TextInput
                style={styles.input}
                value={newExercise.sets?.toString()}
                onChangeText={(text) =>
                  setNewExercise({ ...newExercise, sets: parseInt(text) || 0 })
                }
                keyboardType="numeric"
                placeholder="3"
              />
            </View>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={styles.inputLabel}>
                {newExercise.duration ? "Duration" : "Reps"}
              </Text>
              <TextInput
                style={styles.input}
                value={newExercise.reps?.toString() || newExercise.duration}
                onChangeText={(text) =>
                  setNewExercise({
                    ...newExercise,
                    reps: text.match(/^\d+$/) ? parseInt(text) : undefined,
                    duration: text.match(/^\d+$/) ? undefined : text,
                  })
                }
                placeholder={newExercise.duration ? "30 sec" : "10"}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Difficulty</Text>
            <View style={styles.difficultyOptions}>
              {(["Beginner", "Intermediate", "Advanced"] as const).map(
                (level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.difficultyOption,
                      newExercise.difficulty === level &&
                        styles.difficultyOptionSelected,
                    ]}
                    onPress={() =>
                      setNewExercise({ ...newExercise, difficulty: level })
                    }
                  >
                    <Text
                      style={[
                        styles.difficultyOptionText,
                        newExercise.difficulty === level &&
                          styles.difficultyOptionTextSelected,
                      ]}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Equipment Needed</Text>
            <View style={styles.equipmentOptions}>
              {[
                "None",
                "Yoga mat",
                "Chair",
                "Resistance bands",
                "Dumbbells",
              ].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.equipmentOption,
                    newExercise.equipment?.includes(item) &&
                      styles.equipmentOptionSelected,
                  ]}
                  onPress={() => {
                    const newEquipment = newExercise.equipment || [];
                    if (item === "None") {
                      setNewExercise({ ...newExercise, equipment: ["None"] });
                    } else if (newEquipment.includes(item)) {
                      setNewExercise({
                        ...newExercise,
                        equipment: newEquipment.filter(
                          (e) => e !== item && e !== "None"
                        ),
                      });
                    } else {
                      setNewExercise({
                        ...newExercise,
                        equipment: [
                          ...newEquipment.filter((e) => e !== "None"),
                          item,
                        ],
                      });
                    }
                  }}
                >
                  <Text
                    style={[
                      styles.equipmentOptionText,
                      newExercise.equipment?.includes(item) &&
                        styles.equipmentOptionTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: "top" }]}
              value={newExercise.description}
              onChangeText={(text) =>
                setNewExercise({ ...newExercise, description: text })
              }
              placeholder="Describe the exercise movement..."
              multiline
            />
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleAddExercise}
            disabled={
              isLoading || !newExercise.bodyPart || !newExercise.exercise
            }
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.saveButtonText}>Save Exercise</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeWorkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: Colors.custom.color2,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  equipmentFilterContainer: {
    // paddingBottom: 15,
    // marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    // Ensure horizontal scroll and all items are visible
    // minHeight: 45,
  },
  equipmentFilterItem: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    minWidth: 60, // Ensure each item is wide enough
    alignItems: "center",
    justifyContent: "center",
  },
  equipmentFilterItemSelected: {
    backgroundColor: Colors.custom.color2,
    borderColor: Colors.custom.color2,
  },
  equipmentFilterText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  equipmentFilterTextSelected: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  exerciseItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 20,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  bodyPart: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: "600",
  },
  exercise: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  exerciseDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  modalBadgeContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  modalBadge: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  modalBadgeText: {
    fontSize: 14,
    fontWeight: "600",
  },
  exerciseImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#eee",
  },
  modalDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    flexWrap: "wrap",
  },
  modalDetailItem: {
    alignItems: "center",
    minWidth: 100,
    marginVertical: 5,
  },
  modalDetailLabel: {
    fontSize: 14,
    color: "#999",
    marginBottom: 5,
  },
  modalDetailValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  tipsContainer: {
    marginBottom: 20,
    backgroundColor: "#f5f9ff",
    borderRadius: 10,
    padding: 15,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4a90e2",
    marginBottom: 10,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 10,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 15,
  },
  rowInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  difficultyOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  difficultyOption: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
    alignItems: "center",
  },
  difficultyOptionSelected: {
    backgroundColor: "#e8f5e9",
    borderColor: "#4CAF50",
  },
  difficultyOptionText: {
    color: "#666",
  },
  difficultyOptionTextSelected: {
    color: "#2e7d32",
    fontWeight: "bold",
  },
  equipmentOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  equipmentOption: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
    marginBottom: 10,
  },
  equipmentOptionSelected: {
    backgroundColor: "#e8f5e9",
    borderColor: "#4CAF50",
  },
  equipmentOptionText: {
    color: "#666",
  },
  equipmentOptionTextSelected: {
    color: "#2e7d32",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
