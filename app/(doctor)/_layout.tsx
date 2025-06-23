import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function DoctorLayout() {
  const tabBarOptions = {
    tabBarStyle: { backgroundColor: "white" },
    tabBarActiveTintColor: "green",
  };

  return (
    // <ProtectedRoute role="doctor">
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#fff" },
        tabBarActiveTintColor: Colors.custom.color1,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: "Appointments",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list-alt" size={size} color={color} />
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
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="notifications" size={size} color={color} />
          ),
          tabBarBadge: 5,
          tabBarBadgeStyle: {
            backgroundColor: Colors.custom.color1,
            color: "#fff",
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
    // </ProtectedRoute>
  );
}
