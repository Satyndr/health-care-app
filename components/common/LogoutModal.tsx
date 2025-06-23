import { Colors } from "@/constants/Colors";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

const LogoutModal = ({
  showLogoutModal,
  cancelLogout,
  confirmLogout,
  from,
}: {
  showLogoutModal: boolean;
  cancelLogout: () => void;
  confirmLogout: () => void;
  from?: "doctor" | "patient";
}) => {
  return (
    <Modal
      visible={showLogoutModal}
      transparent
      animationType="fade"
      onRequestClose={cancelLogout}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.3)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 12,
            padding: 24,
            width: "80%",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>
            Confirm Logout
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#555",
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            Are you sure you want to logout?
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={cancelLogout}
              style={{
                flex: 1,
                marginRight: 8,
                backgroundColor: "#eee",
                borderRadius: 8,
                paddingVertical: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#333", fontWeight: "bold" }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={confirmLogout}
              style={{
                flex: 1,
                marginLeft: 8,
                backgroundColor:
                  from === "doctor"
                    ? Colors.custom.color1
                    : Colors.custom.color2,
                borderRadius: 8,
                paddingVertical: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
