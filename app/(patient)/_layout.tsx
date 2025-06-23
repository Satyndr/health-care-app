import { Colors } from "@/constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function PatientLayout() {
  return (
    // <ProtectedRoute role="patient">
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#fff" },
        tabBarActiveTintColor: Colors.custom.color2,
      }}
      initialRouteName="home"
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="book"
        options={{
          title: "Doctors",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Community"
        options={{
          title: "Community",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="forum" size={size} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="medicines"
        options={{
          title: "Medicines",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list-alt" size={size} color={color} />
          ),
        }}
      /> */}

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
    // </ProtectedRoute>
  );
}
