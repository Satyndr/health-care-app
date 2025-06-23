import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Medicines = () => {
  const [medicineList, setMedicineList] = useState([
    {
      id: "1",
      name: "Paracetamol",
      timing: "Morning",
      whenToTake: "After Food",
      taken: false,
    },
    {
      id: "2",
      name: "Ibuprofen",
      timing: "Evening",
      whenToTake: "Before Food",
      taken: false,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    timing: "",
    whenToTake: "",
  });

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Medicine",
      "Are you sure you want to delete this medicine?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            setMedicineList(
              medicineList.filter((medicine) => medicine.id !== id)
            ),
        },
      ]
    );
  };

  const handleAddMedicine = () => {
    if (
      newMedicine.name.trim() &&
      newMedicine.timing.trim() &&
      newMedicine.whenToTake.trim()
    ) {
      setMedicineList([
        ...medicineList,
        {
          id: (medicineList.length + 1).toString(),
          ...newMedicine,
          taken: false,
        },
      ]);
      setNewMedicine({ name: "", timing: "", whenToTake: "" });
      setModalVisible(false);
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  const toggleTaken = (id: string) => {
    setMedicineList((prevList) =>
      prevList.map((medicine) =>
        medicine.id === id ? { ...medicine, taken: !medicine.taken } : medicine
      )
    );
  };

  const renderMedicineItem = ({
    item,
  }: {
    item: {
      id: string;
      name: string;
      timing: string;
      whenToTake: string;
      taken: boolean;
    };
  }) => (
    <View style={styles.medicineItem}>
      <View style={styles.medicineInfo}>
        <TouchableOpacity
          style={[styles.checkbox, item.taken && styles.checkboxChecked]}
          onPress={() => toggleTaken(item.id)}
        >
          {item.taken && <Text style={styles.checkboxText}>✔</Text>}
        </TouchableOpacity>
        <View>
          <Text style={styles.medicineName}>{item.name}</Text>
          <Text style={styles.medicineDetails}>Timing: {item.timing}</Text>
          <Text style={styles.medicineDetails}>
            When to Take: {item.whenToTake}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Your Medicines</Text>
      <FlatList
        data={medicineList}
        keyExtractor={(item) => item.id}
        renderItem={renderMedicineItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No medicines added yet.</Text>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add Medicine</Text>
      </TouchableOpacity>

      {/* Modal for Adding Medicine */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Medicine</Text>
            <TextInput
              style={styles.input}
              placeholder="Medicine Name"
              value={newMedicine.name}
              onChangeText={(text) =>
                setNewMedicine({ ...newMedicine, name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Timing (e.g., Morning)"
              value={newMedicine.timing}
              onChangeText={(text) =>
                setNewMedicine({ ...newMedicine, timing: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="When to Take (e.g., After Food)"
              value={newMedicine.whenToTake}
              onChangeText={(text) =>
                setNewMedicine({ ...newMedicine, whenToTake: text })
              }
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddMedicine}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Medicines;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  medicineItem: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  medicineInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 4,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#28a745",
    borderColor: "#28a745",
  },
  checkboxText: {
    color: "#fff",
    fontWeight: "bold",
  },
  medicineName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  medicineDetails: {
    fontSize: 14,
    color: "#6c757d",
  },
  deleteButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: "#dc3545",
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  addButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: Colors.custom.color2,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#6c757d",
    marginTop: 20,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    padding: 10,
    backgroundColor: "#dc3545",
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  cancelButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  saveButton: {
    padding: 10,
    backgroundColor: Colors.custom.color2,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
