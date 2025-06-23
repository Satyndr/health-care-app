import SplashScreen from "@/components/SplashScreen";
import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

const index = () => {
  const router = useRouter();

  const { authState } = useAuth();
  const [appReady, setAppReady] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    console.log("Loading: ", authState.loading);
    console.log("User role:", authState.role);
    console.log("User is logged in:", authState.isLoggedIn);
  }, [authState]);

  useEffect(() => {
    if (!authState.loading) {
      setAppReady(true);
    }
  }, [authState.loading]);

  // Only run redirect logic after splash is hidden
  useEffect(() => {
    if (appReady && !splashVisible) {
      if (authState.isLoggedIn) {
        if (authState.role === "doctor") {
          router.replace("/(doctor)/home");
        } else if (authState.role === "patient") {
          router.replace("/(patient)/home");
        }
      } else {
        router.replace("/(auth)/onboarding");
      }
    }
  }, [appReady, splashVisible, authState.isLoggedIn, authState.role]);

  useEffect(() => {
    if (appReady) {
      const timer = setTimeout(() => {
        setSplashVisible(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [appReady]);

  if (!appReady || splashVisible) {
    return <SplashScreen />;
  }
};

export default index;
