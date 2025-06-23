import { useToast } from "@/context/ToastContext";
import React, { useEffect } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

export default function Toasts() {
  const { toasts, removeToast } = useToast();

  // Only show the first toast if any exist
  const toast = toasts.length > 0 ? toasts[0] : null;

  return (
    <View style={styles.wrapper}>
      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          id={toast.id}
          removeToast={removeToast}
          type={toast.type}
        />
      )}
    </View>
  );
}

const Toast = ({
  message,
  id,
  removeToast,
  type,
}: {
  message: string;
  id: number;
  removeToast: any;
  type: "success" | "error" | "info";
}) => {
  const translateY = React.useRef(new Animated.Value(-100)).current; // Start off-screen

  useEffect(() => {
    // Animate the toast into view
    Animated.timing(translateY, {
      toValue: 0, // Move to visible position at the top
      duration: 200,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();

    // Automatically hide the toast after 3 seconds
    const timeout = setTimeout(() => {
      Animated.timing(translateY, {
        toValue: -100, // Move off-screen
        duration: 500,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }).start();
      removeToast(id);
    }, 3000);

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [translateY]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          alignSelf: "center",
          width: "90%",
          maxWidth: 400,
        },
        {
          backgroundColor:
            type === "success"
              ? "#d4edda"
              : type === "error"
              ? "#f8d7da"
              : "#cce5ff",
          borderColor:
            type === "success"
              ? "#c3e6cb"
              : type === "error"
              ? "#f5c6cb"
              : "#b8daff",
          borderWidth: 1,
        },
      ]}
    >
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: "6%", // Responsive top position
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: "center",
    pointerEvents: "box-none",
  },
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 4,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
});
