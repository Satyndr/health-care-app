import React from "react";
import { FlatList, Image, Text, View } from "react-native";

const pharmasyList = [
  {
    image: require("@/assets/images/img1.png"),
    name: "Path lab Pharmacy",
    distance: "5km away",
    rating: 4.5,
    reviewCount: 120,
  },
  {
    image: require("@/assets/images/img2.png"),
    name: "24 Pharmacy",
    distance: "5km away",
    rating: 4.5,
    reviewCount: 120,
  },
  {
    image: require("@/assets/images/img1.png"),
    name: "New Pharmacy",
    distance: "5km away",
    rating: 4.5,
    reviewCount: 120,
  },
  {
    image: require("@/assets/images/img2.png"),
    name: "Path lab Pharmacy",
    distance: "5km away",
    rating: 4.5,
    reviewCount: 120,
  },
];

const Nearby = () => {
  const renderItems = ({ item }: any) => {
    return (
      <View
        style={{
          height: 150,
          width: 150,
          flexDirection: "column",
          borderRadius: 12,
          borderWidth: 0.5,
          borderColor: "#000",
          marginHorizontal: 10,
          backgroundColor: "#fff",
          overflow: "hidden",
        }}
      >
        <Image
          style={{
            height: "50%",
            width: "100%",
            objectFit: "cover",
          }}
          source={item.image}
        />
        <View
          style={{
            flex: 1,
            padding: "5%",
            justifyContent: "space-evenly",
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>{item.name}</Text>
          <Text style={{ fontSize: 12, color: "#555" }}>{item.distance}</Text>
          <Text style={{ fontSize: 12, color: "#555" }}>
            {`⭐ ${item.rating} (${item.reviewCount} reviews)`}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{ width: "90%", alignSelf: "center" }}>
      <View style={{ paddingVertical: "5%" }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          Pharmacy Nearby
        </Text>
      </View>
      <FlatList
        data={pharmasyList}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        renderItem={(item) => renderItems(item)}
      />
    </View>
  );
};

export default Nearby;
