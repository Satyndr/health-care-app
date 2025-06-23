import CustomButton from "@/components/CustomButton";
import UploadBox from "@/components/nearbyPharmacy/UploadBox";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Nearby from "../../components/nearbyPharmacy/nearbyList";

export default function explore() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.leftPart}>
        <TouchableOpacity
          style={styles.hamburger}
          onPress={() => router.back()}
        >
          <Image
            style={{ height: "100%", objectFit: "contain" }}
            source={require("@/assets/images/left_arrow.png")}
          />
        </TouchableOpacity>
        <Image
          style={styles.hamburger}
          source={require("@/assets/images/location.gif")}
          autoplay
        />
        <Text style={{ fontSize: 15, fontWeight: "600" }}>Mohali</Text>
      </View>
      <View style={styles.container}>
        {/* Pharmacy nearby */}
        <Nearby />
        <View style={{ marginTop: "10%", width: "90%", alignSelf: "center" }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Upload Prescription
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              textAlign: "center",
              lineHeight: 30,
              marginTop: "5%",
            }}
          >
            We will show the pharmacy that fits as per your Prescription
          </Text>
        </View>

        <UploadBox />

        <View style={{ width: "90%", marginTop: "5%" }}>
          <CustomButton
            title="Continue"
            buttonColor="#41B592"
            style={{ height: 50 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  container: {
    width: "100%",
    flex: 1,
    // backgroundColor: "red",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
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
  leftPart: {
    height: "10%",
    width: "100%",
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  hamburger: {
    height: "100%",
    width: "10%",
    objectFit: "contain",
    marginRight: "5%",
  },
});
