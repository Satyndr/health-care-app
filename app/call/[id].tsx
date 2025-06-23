import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CallScreen = () => {
  // Dummy data for demonstration
  const patient = {
    name: "John Doe",
    image: require("@/assets/doctor/profile.png"),
  };
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [callStatus, setCallStatus] = useState("Ongoing");
  const [timer, setTimer] = useState("00:15"); // Example timer

  // Add ringing state
  const [isRinging, setIsRinging] = useState(true);
  const [showUnavailable, setShowUnavailable] = useState(false);
  const [isCallActive, setIsCallActive] = useState(true);

  // Simulate ringing for up to 10 seconds, then show unavailable if not answered
  React.useEffect(() => {
    if (isRinging) {
      setCallStatus("Ringing...");
      const timeout = setTimeout(() => {
        setIsRinging(false);
        setShowUnavailable(true);
        setCallStatus("Not available right now, try again later.");
        setIsCallActive(false);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [isRinging]);

  // Handle cut call (end call button)
  const handleEndCall = () => {
    setIsCallActive(false);
    setIsRinging(false);
    setShowUnavailable(false);
    setCallStatus("Call Ended");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={patient.image} style={styles.profileImage} />
        <Text style={styles.patientName}>{patient.name}</Text>
        <Text style={styles.statusText}>{callStatus}</Text>
        {/* Show timer only if not ringing, not unavailable, and call is active */}
        {!isRinging && !showUnavailable && isCallActive && (
          <Text style={styles.timer}>{timer}</Text>
        )}
        {/* Unavailable message */}
        {showUnavailable && (
          <View style={styles.ringingIconContainer}>
            <TouchableOpacity
              style={styles.callAgainButton}
              onPress={() => {
                setIsRinging(true);
                setShowUnavailable(false);
                setCallStatus("Ringing...");
                setIsCallActive(true);
              }}
            >
              <Ionicons name="call" size={24} color="#fff" />
              <Text style={styles.callAgainText}>Call Again</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Call ended message */}
        {!isCallActive && !showUnavailable && (
          <View style={styles.ringingIconContainer}>
            <Ionicons
              name="call"
              size={36}
              color="#aaa"
              style={{ marginTop: 10 }}
            />
            <Text
              style={[styles.ringingText, { color: "#aaa", marginTop: 10 }]}
            >
              Call Ended
            </Text>
            <TouchableOpacity
              style={styles.callAgainButton}
              onPress={() => {
                setIsRinging(true);
                setShowUnavailable(false);
                setCallStatus("Ringing...");
                setIsCallActive(true);
              }}
            >
              <Ionicons name="call" size={24} color="#fff" />
              <Text style={styles.callAgainText}>Call Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* Show controls only if call is active and not unavailable */}
      {isCallActive && !showUnavailable && callStatus === "Ringing..." && (
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={[styles.controlButton, isMuted && styles.activeButton]}
            onPress={() => setIsMuted((prev) => !prev)}
            disabled={isRinging || showUnavailable}
          >
            <Ionicons
              name={isMuted ? "mic-off" : "mic"}
              size={32}
              color={isMuted ? "#fff" : "#333"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.endCallButton}
            onPress={handleEndCall}
          >
            <MaterialIcons name="call-end" size={36} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.controlButton, isSpeaker && styles.activeButton]}
            onPress={() => setIsSpeaker((prev) => !prev)}
            disabled={isRinging || showUnavailable}
          >
            <Ionicons
              name={isSpeaker ? "volume-high" : "volume-medium"}
              size={32}
              color={isSpeaker ? "#fff" : "#333"}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 60,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#4e8cff",
  },
  patientName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 5,
  },
  statusText: {
    fontSize: 16,
    color: "#4e8cff",
    marginBottom: 5,
  },
  timer: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  controlButton: {
    backgroundColor: "#e0e0e0",
    borderRadius: 40,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  activeButton: {
    backgroundColor: "#4e8cff",
  },
  endCallButton: {
    backgroundColor: "#ff4e4e",
    borderRadius: 40,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    elevation: 3,
  },
  // Add ringing styles
  ringingIconContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  ringingText: {
    color: "#4e8cff",
    fontSize: 16,
    marginTop: 5,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  // Add styles for call again button
  callAgainButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4e8cff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  callAgainText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
});
