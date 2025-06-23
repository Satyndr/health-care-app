import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AppointmentCheckout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Appointment Checkout</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Appointment Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>2023-10-15</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Time:</Text>
          <Text style={styles.detailValue}>10:00 AM</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Doctor:</Text>
          <Text style={styles.detailValue}>Dr. John Doe</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Type:</Text>
          <Text style={styles.detailValue}>In-person Consultation</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Patient Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name:</Text>
          <Text style={styles.detailValue}>Jane Smith</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Contact:</Text>
          <Text style={styles.detailValue}>+123456789</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailValue}>jane.smith@example.com</Text>
        </View>
      </View>

      <View style={styles.priceCard}>
        <View style={styles.detailRow}>
          <Text style={styles.priceLabel}>Total Amount:</Text>
          <Text style={styles.priceValue}>$100</Text>
        </View>
        <Text style={styles.note}>
          *Payment will be processed after confirmation
        </Text>
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => alert("Payment Successful")}
      >
        <Text style={styles.confirmButtonText}>Confirm and Pay</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.custom.color2,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.custom.color2,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 15,
    color: "#666",
    fontWeight: "500",
    flex: 1,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    flex: 2,
    textAlign: "right",
  },
  priceCard: {
    backgroundColor: "rgba(210, 131, 207, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: Colors.custom.color2,
  },
  priceLabel: {
    fontSize: 17,
    color: Colors.custom.color2,
    fontWeight: "600",
    flex: 1,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.custom.color2,
    flex: 1,
    textAlign: "right",
  },
  note: {
    fontSize: 12,
    color: "#666",
    marginTop: 10,
    fontStyle: "italic",
  },
  confirmButton: {
    backgroundColor: Colors.custom.color2,
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.custom.color2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  confirmButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default AppointmentCheckout;
