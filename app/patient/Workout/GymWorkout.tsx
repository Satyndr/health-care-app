import { Colors } from "@/constants/Colors";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
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
  weight?: number;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  imageUrl?: string;
  description?: string;
};

const initialExercises: Exercise[] = [
  {
    id: "1",
    bodyPart: "Chest",
    exercise: "Bench Press",
    sets: 4,
    reps: 8,
    weight: 135,
    difficulty: "Intermediate",
    imageUrl: "https://example.com/bench-press.jpg",
    description:
      "Lie on a flat bench with feet flat on the ground. Grip the bar slightly wider than shoulder-width. Lower the bar to your chest, then press it back up.",
  },
  {
    id: "2",
    bodyPart: "Legs",
    exercise: "Squats",
    sets: 4,
    reps: 10,
    weight: 185,
    difficulty: "Intermediate",
    imageUrl: "https://example.com/squats.jpg",
    description:
      "Stand with feet shoulder-width apart. Lower your body by bending knees and hips, keeping chest up. Return to standing position.",
  },
  {
    id: "3",
    bodyPart: "Shoulders",
    exercise: "Overhead Press",
    sets: 3,
    reps: 10,
    weight: 95,
    difficulty: "Intermediate",
    imageUrl: "https://example.com/overhead-press.jpg",
    description:
      "Stand holding barbell at shoulder height. Press the weight overhead until arms are fully extended, then lower back down.",
  },
  {
    id: "4",
    bodyPart: "Back",
    exercise: "Deadlifts",
    sets: 3,
    reps: 6,
    weight: 225,
    difficulty: "Advanced",
    imageUrl: "https://example.com/deadlifts.jpg",
    description:
      "Stand with feet hip-width apart, bend at hips and knees to grip barbell. Lift by extending hips and knees to full standing position.",
  },
  {
    id: "5",
    bodyPart: "Arms",
    exercise: "Barbell Curls",
    sets: 3,
    reps: 12,
    weight: 65,
    difficulty: "Beginner",
    imageUrl: "https://example.com/barbell-curls.jpg",
    description:
      "Stand holding barbell with underhand grip. Curl the weight up while keeping elbows close to torso, then slowly lower.",
  },
  {
    id: "6",
    bodyPart: "Chest",
    exercise: "Incline Dumbbell Press",
    sets: 3,
    reps: 10,
    weight: 50,
    difficulty: "Intermediate",
    imageUrl: "https://example.com/incline-press.jpg",
    description:
      "Lie on incline bench holding dumbbells at shoulder level. Press weights up until arms are extended, then lower back down.",
  },
  {
    id: "7",
    bodyPart: "Legs",
    exercise: "Leg Press",
    sets: 3,
    reps: 12,
    weight: 270,
    difficulty: "Beginner",
    imageUrl: "https://example.com/leg-press.jpg",
    description:
      "Sit on machine with back flat against pad. Push platform away by extending knees, then slowly return to starting position.",
  },
  {
    id: "8",
    bodyPart: "Shoulders",
    exercise: "Lateral Raises",
    sets: 3,
    reps: 12,
    weight: 15,
    difficulty: "Beginner",
    imageUrl: "https://example.com/lateral-raises.jpg",
    description:
      "Stand holding dumbbells at sides. Raise arms out to sides until parallel to floor, then slowly lower back down.",
  },
];

const bodyPartFilters = ["All", "Chest", "Legs", "Shoulders", "Back", "Arms"];

const GymWorkout = () => {
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
    weight: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedBodyPart, setSelectedBodyPart] = useState("All");

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
        } as Exercise,
      ]);
      setIsLoading(false);
      setIsAddModalVisible(false);
      setNewExercise({
        bodyPart: "",
        exercise: "",
        sets: 3,
        reps: 10,
        weight: 0,
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
    const matchesBodyPart =
      selectedBodyPart === "All" || ex.bodyPart === selectedBodyPart;
    return matchesSearch && matchesBodyPart;
  });

  // Render Functions
  const renderExercise = ({ item }: { item: Exercise }) => (
    <TouchableOpacity
      style={styles.exerciseItem}
      onPress={() => handleExercisePress(item)}
    >
      <View style={styles.exerciseHeader}>
        <Text style={styles.bodyPart}>{item.exercise}</Text>
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
      <Text style={styles.exercise}>{item.bodyPart}</Text>
      <View style={styles.exerciseDetails}>
        <View style={styles.detailItem}>
          <MaterialIcons name="fitness-center" size={16} color="#666" />
          <Text style={styles.detailText}>{item.sets} sets</Text>
        </View>
        <View style={styles.detailItem}>
          <FontAwesome name="repeat" size={16} color="#666" />
          <Text style={styles.detailText}>{item.reps} reps</Text>
        </View>
        <View style={styles.detailItem}>
          <FontAwesome name="balance-scale" size={16} color="#666" />
          <Text style={styles.detailText}>{item.weight} lbs</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="fitness-center" size={50} color="#ccc" />
      <Text style={styles.emptyText}>No exercises found</Text>
      <Text style={styles.emptySubtext}>Try changing your filters</Text>
    </View>
  );

  const renderBodyPartFilter = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterContainer}
    >
      {bodyPartFilters.map((part) => (
        <TouchableOpacity
          key={part}
          style={[
            styles.filterItem,
            selectedBodyPart === part && styles.filterItemSelected,
            {
              marginLeft: part === "All" ? 20 : 0,
            },
          ]}
          onPress={() => setSelectedBodyPart(part)}
        >
          <Text
            style={[
              styles.filterText,
              selectedBodyPart === part && styles.filterTextSelected,
            ]}
          >
            {part}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gym Workout</Text>
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
      <View>{renderBodyPartFilter()}</View>

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
            />

            <View style={styles.modalDetails}>
              <View style={styles.modalDetailItem}>
                <Text style={styles.modalDetailLabel}>Sets</Text>
                <Text style={styles.modalDetailValue}>
                  {selectedExercise.sets}
                </Text>
              </View>
              <View style={styles.modalDetailItem}>
                <Text style={styles.modalDetailLabel}>Reps</Text>
                <Text style={styles.modalDetailValue}>
                  {selectedExercise.reps}
                </Text>
              </View>
              <View style={styles.modalDetailItem}>
                <Text style={styles.modalDetailLabel}>Weight</Text>
                <Text style={styles.modalDetailValue}>
                  {selectedExercise.weight} lbs
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
                <AntDesign name="star" size={16} color="#4a90e2" />
                <Text style={styles.tipText}>
                  Warm up with lighter weights before your working sets
                </Text>
              </View>
              <View style={styles.tipItem}>
                <AntDesign name="star" size={16} color="#4a90e2" />
                <Text style={styles.tipText}>
                  Maintain proper form throughout the movement
                </Text>
              </View>
              {selectedExercise.difficulty === "Advanced" && (
                <View style={styles.tipItem}>
                  <AntDesign name="star" size={16} color="#4a90e2" />
                  <Text style={styles.tipText}>
                    Use a spotter for heavy lifts
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
            <View style={styles.bodyPartOptions}>
              {["Chest", "Legs", "Shoulders", "Back", "Arms"].map((part) => (
                <TouchableOpacity
                  key={part}
                  style={[
                    styles.bodyPartOption,
                    newExercise.bodyPart === part &&
                      styles.bodyPartOptionSelected,
                  ]}
                  onPress={() =>
                    setNewExercise({ ...newExercise, bodyPart: part })
                  }
                >
                  <Text
                    style={[
                      styles.bodyPartOptionText,
                      newExercise.bodyPart === part &&
                        styles.bodyPartOptionTextSelected,
                    ]}
                  >
                    {part}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Exercise Name</Text>
            <TextInput
              style={styles.input}
              value={newExercise.exercise}
              onChangeText={(text) =>
                setNewExercise({ ...newExercise, exercise: text })
              }
              placeholder="e.g. Bench Press, Squats"
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
              <Text style={styles.inputLabel}>Reps</Text>
              <TextInput
                style={styles.input}
                value={newExercise.reps?.toString()}
                onChangeText={(text) =>
                  setNewExercise({ ...newExercise, reps: parseInt(text) || 0 })
                }
                keyboardType="numeric"
                placeholder="10"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Weight (lbs)</Text>
            <TextInput
              style={styles.input}
              value={newExercise.weight?.toString()}
              onChangeText={(text) =>
                setNewExercise({ ...newExercise, weight: parseInt(text) || 0 })
              }
              keyboardType="numeric"
              placeholder="0"
            />
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

export default GymWorkout;

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
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: Colors.custom.color1,
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
  filterContainer: {
    paddingBottom: 15,
    marginBottom: 15,
  },
  filterItem: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  filterItemSelected: {
    backgroundColor: Colors.custom.color1,
    borderColor: Colors.custom.color1,
  },
  filterText: {
    fontSize: 14,
    color: "#666",
  },
  filterTextSelected: {
    color: "white",
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 20,
    marginHorizontal: 20,
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
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
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
  },
  modalDetailItem: {
    alignItems: "center",
    minWidth: 100,
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
  bodyPartOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  bodyPartOption: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
    marginBottom: 10,
  },
  bodyPartOptionSelected: {
    backgroundColor: "#e3f2fd",
    borderColor: "#4a90e2",
  },
  bodyPartOptionText: {
    color: "#666",
  },
  bodyPartOptionTextSelected: {
    color: "#4a90e2",
    fontWeight: "bold",
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
    backgroundColor: "#e3f2fd",
    borderColor: "#4a90e2",
  },
  difficultyOptionText: {
    color: "#666",
  },
  difficultyOptionTextSelected: {
    color: "#4a90e2",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: Colors.custom.color2,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 50,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
