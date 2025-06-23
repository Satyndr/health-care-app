import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import {
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
type Meal = {
  id: string;
  name: string;
  category: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
  preparation: string;
  dietaryTags: (
    | "Vegetarian"
    | "Vegan"
    | "Gluten-Free"
    | "High-Protein"
    | "Low-Carb"
  )[];
  imageUrl: string;
  timeRequired: string;
};

const initialMeals: Meal[] = [
  {
    id: "1",
    name: "Avocado Toast with Eggs",
    category: "Breakfast",
    calories: 350,
    protein: 15,
    carbs: 25,
    fats: 20,
    ingredients: [
      "2 slices whole grain bread",
      "1/2 avocado",
      "2 eggs",
      "Salt and pepper to taste",
      "Red pepper flakes (optional)",
    ],
    preparation:
      "Toast bread. Mash avocado and spread on toast. Cook eggs as desired (fried or scrambled). Place eggs on avocado toast. Season with salt, pepper, and red pepper flakes.",
    dietaryTags: ["Vegetarian", "High-Protein"],
    imageUrl: "https://example.com/avocado-toast.jpg",
    timeRequired: "10 mins",
  },
  {
    id: "2",
    name: "Grilled Chicken Salad",
    category: "Lunch",
    calories: 420,
    protein: 35,
    carbs: 15,
    fats: 25,
    ingredients: [
      "150g grilled chicken breast",
      "2 cups mixed greens",
      "1/4 cup cherry tomatoes",
      "1/4 cucumber",
      "1 tbsp olive oil",
      "1 tbsp balsamic vinegar",
    ],
    preparation:
      "Chop vegetables. Slice grilled chicken. Combine all ingredients in a bowl. Drizzle with olive oil and balsamic vinegar. Toss gently to combine.",
    dietaryTags: ["Gluten-Free", "High-Protein"],
    imageUrl: "https://example.com/chicken-salad.jpg",
    timeRequired: "15 mins",
  },
  {
    id: "3",
    name: "Quinoa Buddha Bowl",
    category: "Dinner",
    calories: 380,
    protein: 18,
    carbs: 45,
    fats: 15,
    ingredients: [
      "1/2 cup cooked quinoa",
      "1/2 cup roasted sweet potatoes",
      "1/4 avocado",
      "1/2 cup chickpeas",
      "1 cup baby spinach",
      "1 tbsp tahini dressing",
    ],
    preparation:
      "Cook quinoa according to package. Roast sweet potatoes. Arrange all ingredients in a bowl. Drizzle with tahini dressing.",
    dietaryTags: ["Vegan", "Vegetarian", "Gluten-Free"],
    imageUrl: "https://example.com/buddha-bowl.jpg",
    timeRequired: "25 mins",
  },
  {
    id: "4",
    name: "Greek Yogurt with Berries",
    category: "Snack",
    calories: 180,
    protein: 12,
    carbs: 20,
    fats: 5,
    ingredients: [
      "150g Greek yogurt",
      "1/2 cup mixed berries",
      "1 tbsp honey",
      "1 tbsp granola",
    ],
    preparation:
      "Scoop yogurt into bowl. Top with berries, honey, and granola.",
    dietaryTags: ["Vegetarian", "High-Protein"],
    imageUrl: "https://example.com/yogurt-berries.jpg",
    timeRequired: "5 mins",
  },
  {
    id: "5",
    name: "Salmon with Asparagus",
    category: "Dinner",
    calories: 450,
    protein: 40,
    carbs: 10,
    fats: 28,
    ingredients: [
      "150g salmon fillet",
      "10 asparagus spears",
      "1 tbsp olive oil",
      "1/2 lemon",
      "Salt and pepper to taste",
    ],
    preparation:
      "Preheat oven to 400°F. Season salmon and asparagus with olive oil, salt, and pepper. Bake for 12-15 minutes. Serve with lemon wedges.",
    dietaryTags: ["Gluten-Free", "High-Protein", "Low-Carb"],
    imageUrl: "https://example.com/salmon-asparagus.jpg",
    timeRequired: "20 mins",
  },
];

// Filter options
const categoryFilters = ["All", "Breakfast", "Lunch", "Dinner", "Snack"];
const dietaryFilters = [
  "All",
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "High-Protein",
  "Low-Carb",
];

const DietSuggestionScreen = () => {
  // State
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDietary, setSelectedDietary] = useState("All");
  const [calorieRange, setCalorieRange] = useState<[number, number]>([0, 1000]);

  // Filter meals
  const filteredMeals = meals.filter((meal) => {
    const matchesSearch = meal.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || meal.category === selectedCategory;
    const matchesDietary =
      selectedDietary === "All" ||
      meal.dietaryTags.includes(
        selectedDietary as
          | "Vegetarian"
          | "Vegan"
          | "Gluten-Free"
          | "High-Protein"
          | "Low-Carb"
      );
    const matchesCalories =
      meal.calories >= calorieRange[0] && meal.calories <= calorieRange[1];

    return (
      matchesSearch && matchesCategory && matchesDietary && matchesCalories
    );
  });

  // Handlers
  const handleMealPress = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsModalVisible(true);
  };

  const handleCalorieChange = (index: number, value: string) => {
    const newRange = [...calorieRange] as [number, number];
    newRange[index] = parseInt(value) || 0;
    setCalorieRange(newRange);
  };

  // Render functions
  const renderMealItem = ({ item }: { item: Meal }) => (
    <TouchableOpacity
      style={styles.mealItem}
      onPress={() => handleMealPress(item)}
    >
      <Image
        //   source={{ uri: item.imageUrl }}
        source={require("@/assets/patient/food.webp")}
        objectFit="cover"
        style={styles.mealImage}
      />
      <View style={styles.mealInfo}>
        <Text style={styles.mealName}>{item.name}</Text>
        <View style={styles.mealMeta}>
          <Text style={styles.mealCategory}>{item.category}</Text>
          <Text style={styles.mealCalories}>{item.calories} kcal</Text>
        </View>
        <View style={styles.tagContainer}>
          {item.dietaryTags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <View style={styles.macroContainer}>
          <View style={styles.macroItem}>
            <Text style={styles.macroLabel}>Protein</Text>
            <Text style={styles.macroValue}>{item.protein}g</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroLabel}>Carbs</Text>
            <Text style={styles.macroValue}>{item.carbs}g</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroLabel}>Fats</Text>
            <Text style={styles.macroValue}>{item.fats}g</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFilterChips = (
    items: string[],
    selected: string,
    setSelected: (item: string) => void
  ) => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterContainer}
    >
      {items.map((item) => (
        <TouchableOpacity
          key={item}
          style={[
            styles.filterChip,
            selected === item && styles.filterChipSelected,
          ]}
          onPress={() => setSelected(item)}
        >
          <Text
            style={[
              styles.filterChipText,
              selected === item && styles.filterChipTextSelected,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Diet Suggestions</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Feather name="filter" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search meals..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>

        {/* Category Filters */}
        <Text style={styles.filterTitle}>Meal Category</Text>
        <View>
          {renderFilterChips(
            categoryFilters,
            selectedCategory,
            setSelectedCategory
          )}
        </View>

        {/* Dietary Filters */}
        <View>
          <Text style={styles.filterTitle}>Dietary Preference</Text>
          {renderFilterChips(
            dietaryFilters,
            selectedDietary,
            setSelectedDietary
          )}
        </View>

        {/* Calorie Range */}
        <Text style={styles.filterTitle}>Calorie Range</Text>
        <View style={styles.calorieRangeContainer}>
          <View style={styles.calorieInputContainer}>
            <Text style={styles.calorieLabel}>Min:</Text>
            <TextInput
              style={styles.calorieInput}
              value={calorieRange[0].toString()}
              onChangeText={(text) => handleCalorieChange(0, text)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.rangeSeparator} />
          <View style={styles.calorieInputContainer}>
            <Text style={styles.calorieLabel}>Max:</Text>
            <TextInput
              style={styles.calorieInput}
              value={calorieRange[1].toString()}
              onChangeText={(text) => handleCalorieChange(1, text)}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Meal List */}
        <FlatList
          data={filteredMeals}
          renderItem={renderMealItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="fast-food-outline" size={50} color="#ccc" />
              <Text style={styles.emptyText}>No meals found</Text>
              <Text style={styles.emptySubtext}>
                Try adjusting your filters
              </Text>
            </View>
          }
        />

        {/* Meal Detail Modal */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}
        >
          {selectedMeal && (
            <ScrollView style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <AntDesign name="close" size={24} color="#333" />
              </TouchableOpacity>

              <Image
                // source={{ uri: selectedMeal.imageUrl }}
                source={require("@/assets/patient/food.webp")}
                objectFit="cover"
                style={styles.modalImage}
              />

              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{selectedMeal.name}</Text>
                <View style={styles.mealTypeBadge}>
                  <Text style={styles.mealTypeText}>
                    {selectedMeal.category}
                  </Text>
                </View>
              </View>

              <View style={styles.macroSummary}>
                <View style={styles.macroSummaryItem}>
                  <Text style={styles.macroSummaryValue}>
                    {selectedMeal.calories}
                  </Text>
                  <Text style={styles.macroSummaryLabel}>Calories</Text>
                </View>
                <View style={styles.macroSummaryItem}>
                  <Text style={styles.macroSummaryValue}>
                    {selectedMeal.protein}g
                  </Text>
                  <Text style={styles.macroSummaryLabel}>Protein</Text>
                </View>
                <View style={styles.macroSummaryItem}>
                  <Text style={styles.macroSummaryValue}>
                    {selectedMeal.carbs}g
                  </Text>
                  <Text style={styles.macroSummaryLabel}>Carbs</Text>
                </View>
                <View style={styles.macroSummaryItem}>
                  <Text style={styles.macroSummaryValue}>
                    {selectedMeal.fats}g
                  </Text>
                  <Text style={styles.macroSummaryLabel}>Fats</Text>
                </View>
                <View style={styles.macroSummaryItem}>
                  <Text style={styles.macroSummaryValue}>
                    {selectedMeal.timeRequired}
                  </Text>
                  <Text style={styles.macroSummaryLabel}>Time</Text>
                </View>
              </View>

              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Dietary Tags</Text>
                <View style={styles.tagContainer}>
                  {selectedMeal.dietaryTags.map((tag) => (
                    <View key={tag} style={styles.detailTag}>
                      <Text style={styles.detailTagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Ingredients</Text>
                {selectedMeal.ingredients.map((ingredient, index) => (
                  <View key={index} style={styles.ingredientItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.ingredientText}>{ingredient}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Preparation</Text>
                <Text style={styles.preparationText}>
                  {selectedMeal.preparation}
                </Text>
              </View>

              <TouchableOpacity style={styles.addToPlanButton}>
                <Text style={styles.addToPlanButtonText}>
                  Add to My Meal Plan
                </Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 8,
  },
  filterContainer: {
    paddingBottom: 8,
  },
  filterChip: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  filterChipSelected: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  filterChipText: {
    fontSize: 14,
    color: "#666",
  },
  filterChipTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  calorieRangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  calorieInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  calorieLabel: {
    marginRight: 8,
    color: "#666",
  },
  calorieInput: {
    flex: 1,
    color: "#333",
  },
  rangeSeparator: {
    width: 10,
    height: 1,
    backgroundColor: "#999",
  },
  listContainer: {
    paddingBottom: 20,
  },
  mealItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mealImage: {
    width: "100%",
    height: 180,
  },
  mealInfo: {
    padding: 16,
  },
  mealName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  mealMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  mealCategory: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "600",
  },
  mealCalories: {
    fontSize: 14,
    color: "#666",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  tag: {
    backgroundColor: "#e8f5e9",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: "#2e7d32",
  },
  macroContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  macroItem: {
    alignItems: "center",
    flex: 1,
  },
  macroLabel: {
    fontSize: 12,
    color: "#999",
  },
  macroValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    padding: 8,
  },
  modalImage: {
    width: "100%",
    height: 250,
  },
  modalHeader: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  mealTypeBadge: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 12,
  },
  mealTypeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  macroSummary: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "#f5f5f5",
    marginHorizontal: 20,
    borderRadius: 12,
  },
  macroSummaryItem: {
    alignItems: "center",
  },
  macroSummaryValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  macroSummaryLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  detailTag: {
    backgroundColor: "#e8f5e9",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  detailTagText: {
    fontSize: 14,
    color: "#2e7d32",
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4CAF50",
    marginRight: 12,
  },
  ingredientText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  preparationText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  addToPlanButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 16,
    margin: 20,
    alignItems: "center",
  },
  addToPlanButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DietSuggestionScreen;
