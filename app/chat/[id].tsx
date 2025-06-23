import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatScreen = () => {
  type Message = {
    id: string;
    sender: string;
    text?: string;
    image?: string;
  };

  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hello! How can I help you?", sender: "doctor" },
    {
      id: "2",
      text: "I have a question about my prescription.",
      sender: "user",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), text: newMessage, sender: "user" },
      ]);
      setNewMessage("");
    }
    if (
      selectedFile &&
      selectedFile.mimeType &&
      selectedFile.mimeType.startsWith("image/")
    ) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: (Date.now() + 1).toString(),
          image: selectedFile.uri,
          sender: "user",
        },
      ]);
      setSelectedFile(null);
    }
  };

  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*"],
        copyToCacheDirectory: true,
        multiple: false,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets[0]);
      }
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  const renderMessage = ({
    item,
  }: {
    item: { id: string; text?: string; image?: string; sender: string };
  }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMessage : styles.doctorMessage,
      ]}
    >
      {item.text ? <Text style={styles.messageText}>{item.text}</Text> : null}
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          style={{ width: 160, height: 160, borderRadius: 10, marginTop: 5 }}
          resizeMode="cover"
        />
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>John Doe</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messageList}
        />
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                paddingHorizontal: 12,
                paddingVertical: 10,
                marginRight: "3%",
              },
            ]}
            onPress={handlePickFile}
          >
            <Ionicons name="attach" size={22} color="#fff" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={"#aaa"}
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
        {selectedFile && (
          <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
            <Text style={{ color: Colors.custom.color1, fontSize: 12 }}>
              Selected: {selectedFile.name}
            </Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 16,
    backgroundColor: Colors.custom.color1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  messageList: {
    padding: 16,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "75%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: Colors.custom.color2,
  },
  doctorMessage: {
    alignSelf: "flex-start",
    backgroundColor: Colors.custom.color3,
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    backgroundColor: "#f8f9fa",
    color: "#000",
  },
  sendButton: {
    backgroundColor: Colors.custom.color1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
