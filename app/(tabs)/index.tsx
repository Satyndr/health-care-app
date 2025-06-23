import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";
import AdCards from "@/components/home/AdCards";
import Tabs from "@/components/home/Tabs";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;

  const onMenuPress = () => {
    // Add this state at the top of your component

    // Animated.timing(slideAnim, {
    //   toValue: menuVisible ? 0 : -300,
    //   duration: 300,
    //   useNativeDriver: true,
    // }).start();

    setMenuVisible(!menuVisible);
  };

  const handleOnPress = () => {
    //
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header onMenuPress={onMenuPress} />
      <View style={styles.container}>
        <Tabs />
        <View style={styles.para}>
          <Text style={styles.text1}>UPLOAD PRESCRIPTION</Text>
          <Text style={styles.text2}>
            Upload a prescription and tell us about what you Need. We do the
            Rest.!
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Text style={styles.text2}>{"Flat 20% OFF ON \nMEDICINES"}</Text>
            <CustomButton title={"ORDER NOW"} onPress={handleOnPress} />
          </View>
        </View>
      </View>
      {/* Animated Bottom Cards */}
      <AdCards />
      {menuVisible && (
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: 300,
            backgroundColor: "white",
            elevation: 5,
            padding: 20,
            zIndex: 100,
            // transform: [{ translateX: slideAnim }],
          }}
        >
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <Text
              style={{ fontSize: 24, fontFamily: "Thambi", color: "#3A3A3A" }}
            >
              Menu
            </Text>
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 10,
                top: 10,
                padding: 10,
              }}
              onPress={() => setMenuVisible(false)}
            >
              <Image
                style={{ width: 20, height: 20, objectFit: "contain" }}
                source={require("@/assets/images/left_arrow.png")}
              />
            </TouchableOpacity>
            <CustomButton
              title="Logout"
              onPress={() => {
                router.replace("/signin");
              }}
            />
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    // backgroundColor: "red",
    flex: 1,
  },
  para: {
    paddingLeft: "8%",
    paddingRight: "12%",
  },
  text1: {
    color: "#3A3A3A",
    fontFamily: "Thambi",
    fontWeight: "700",
    fontSize: 15,
  },
  text2: {
    marginTop: "3%",
    color: "#3A3A3A",
    fontFamily: "Thambi",
    fontSize: 10,
    fontWeight: "700",
  },
});
