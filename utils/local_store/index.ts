import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeObjectData = async (key: string, data: any) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(`Error storing data for key ${key}:`, e);
  }
};
