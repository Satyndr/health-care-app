import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import Toasts from "@/components/Toasts";
import { Colors } from "@/constants/Colors";
import { AuthProvider } from "@/context/authContext";
import { ToastProvider } from "@/context/ToastContext";
import { StatusBar } from "react-native";

const MainLayout = () => {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{ navigationBarColor: "#fff", headerShown: false }}
    >
      <Stack.Screen
        name="index"
        options={{
          statusBarTranslucent: true,
        }}
      />
      <Stack.Screen name="(auth)" />
      <Stack.Screen
        name="(patient)"
        options={{
          statusBarBackgroundColor: Colors.custom.color2,
        }}
      />
      <Stack.Screen
        name="(doctor)"
        options={{
          statusBarBackgroundColor: Colors.custom.color1,
        }}
      />
      <Stack.Screen name="doctor/[id]" />
      <Stack.Screen name="patient/Profile/[id]" />
      <Stack.Screen name="patient/Prescription" />
      <Stack.Screen name="patient/Appointments" />
      <Stack.Screen name="patient/Feedback" />
      <Stack.Screen name="patient/Community" />
      <Stack.Screen name="patient/Symptom" />
      <Stack.Screen name="patient/Workout/ChooseWorkout" />
      <Stack.Screen name="patient/Workout/GymWorkout" />
      <Stack.Screen name="patient/Workout/HomeWorkout" />
      <Stack.Screen name="patient/Diet" />
      <Stack.Screen name="doctor/PatientRecord" />
      <Stack.Screen name="appointment/[id]" />
      <Stack.Screen name="chat/[id]" />
      <Stack.Screen name="call/[id]" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProvider>
        <AuthProvider>
          <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"} />
          <Toasts />
          <MainLayout />
        </AuthProvider>
      </ToastProvider>
    </GestureHandlerRootView>
  );
}
