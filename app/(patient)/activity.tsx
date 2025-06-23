import { Colors } from "@/constants/Colors";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const activity = () => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const today = dayjs();
    const startOfMonth = today.startOf("month");
    const selectedIndex = today.diff(startOfMonth, "day"); // Calculate the index of today's date in the month
    const offset = selectedIndex * 50; // Assuming each date item is approximately 70px wide
    scrollViewRef.current?.scrollTo({ x: offset, animated: true });
  }, []);

  const renderCalendar = () => {
    const days = [];
    const today = dayjs();
    const startOfMonth = today.startOf("month");
    let currentDate = startOfMonth;

    while (currentDate.isBefore(today) || currentDate.isSame(today)) {
      days.push(currentDate);
      currentDate = currentDate.add(1, "day");
    }
    return days.map((date) => {
      const isSelected = date.format("YYYY-MM-DD") === selectedDate;
      const isToday = date.format("YYYY-MM-DD") === today.format("YYYY-MM-DD");
      return (
        <TouchableOpacity
          key={date.format("YYYY-MM-DD")}
          onPress={() => setSelectedDate(date.format("YYYY-MM-DD"))}
          style={{
            padding: 10,
            marginHorizontal: 5,
            borderRadius: 20,
            backgroundColor: isSelected ? Colors.custom.color2 : "transparent",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            borderWidth: isToday ? 2 : 0,
            borderColor: isToday ? Colors.custom.color2 : "transparent",
          }}
        >
          <Text style={{ color: isSelected ? "#FFF" : "#000" }}>
            {date.format("DD")}
          </Text>
          <Text style={{ color: isSelected ? "#FFF" : "#000" }}>
            {date.format("MMM")}
          </Text>
        </TouchableOpacity>
      );
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* <StatusBar
        backgroundColor={"#f5f5f5"}
        barStyle={"dark-content"}
        animated={true}
      /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 700,
            marginVertical: "5%",
            marginLeft: "3%",
          }}
        >
          My Activity
        </Text>
        {/* calender */}
        <View>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          >
            {renderCalendar()}
          </ScrollView>
          <Text style={{ marginLeft: "3%", marginTop: 10 }}>
            Selected Date: {selectedDate}
          </Text>
        </View>

        {/* steps */}
        <View style={styles.box}>
          <View style={styles.boxHeader}>
            <Image
              source={require("@/assets/patient/walk.png")}
              style={styles.headerImage}
            />
            <Text style={styles.boxHeading}>Steps</Text>
          </View>
          <Text style={{ fontSize: 30, fontWeight: 700, marginTop: 10 }}>
            10,000
          </Text>
          <Text style={{ fontSize: 16, color: "#666", marginTop: 10 }}>
            You have walked 10,000 steps today
          </Text>
        </View>

        {/* water */}
        <View style={styles.box}>
          <View style={styles.boxHeader}>
            <Image
              source={require("@/assets/patient/water.png")}
              style={styles.headerImage}
            />
            <Text style={styles.boxHeading}>Water Intake</Text>
          </View>
          <Text style={{ fontSize: 30, fontWeight: 700, marginTop: 10 }}>
            2.5L
          </Text>
          <Text style={{ fontSize: 16, color: "#666", marginTop: 10 }}>
            You have drunk 2.5L of water today
          </Text>
        </View>
        {/* sleep */}
        <View style={styles.box}>
          <View style={styles.boxHeader}>
            <Image
              source={require("@/assets/patient/sleep.png")}
              style={styles.headerImage}
            />
            <Text style={styles.boxHeading}>Sleep</Text>
          </View>
          <Text style={{ fontSize: 30, fontWeight: 700, marginTop: 10 }}>
            8 hours
          </Text>
          <Text style={{ fontSize: 16, color: "#666", marginTop: 10 }}>
            You have slept for 8 hours today
          </Text>
        </View>
        {/* exercise */}
        <View style={styles.box}>
          <View style={styles.boxHeader}>
            <Image
              source={require("@/assets/patient/exercise.png")}
              style={styles.headerImage}
            />
            <Text style={styles.boxHeading}>Exercise</Text>
          </View>
          <Text style={{ fontSize: 30, fontWeight: 700, marginTop: 10 }}>
            1 hour
          </Text>
          <Text style={{ fontSize: 16, color: "#666", marginTop: 10 }}>
            You have exercised for 1 hour today
          </Text>
        </View>

        {/* calories */}
        <View style={styles.box}>
          <View style={styles.boxHeader}>
            <Image
              source={require("@/assets/patient/calorie.png")}
              style={styles.headerImage}
            />
            <Text style={styles.boxHeading}>Calories</Text>
          </View>
          <Text style={{ fontSize: 30, fontWeight: 700, marginTop: 10 }}>
            2000 kcal
          </Text>
          <Text style={{ fontSize: 16, color: "#666", marginTop: 10 }}>
            You have consumed 2000 kcal today
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default activity;

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#fff",
    padding: "5%",
    borderRadius: 20,
    margin: 10,
    shadowColor: Colors.custom.color2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxHeader: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  headerImage: {
    width: 40,
    height: 40,
    objectFit: "contain",
    borderRadius: 10,
  },
  boxHeading: { fontSize: 20, fontWeight: 700, marginLeft: "3%" },
});
