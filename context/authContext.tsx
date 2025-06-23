import { LoginModel } from "@/utils/models/authetication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useReducer } from "react";

interface authStateType {
  loading: boolean;
  isLoggedIn: boolean;
  role: "doctor" | "patient" | "";
  phoneNumber: string;
  loginModel: LoginModel;
  isOtpSent: boolean;
  isOtpVerifiedSuccess: boolean;
  isOtpVerifiedFailure: boolean;
  message: string;
  isError: boolean;
  errorMessage: string;
}

type AuthActionType =
  | { type: "INIT" }
  | { type: "SET_PHONE_NUMBER"; payload: { phoneNumber: string } }
  | {
      type: "OTP_SENT_SUCCESS";
      payload: { phoneNumber: string; message: string };
    }
  | { type: "OTP_SENT_FAILURE"; payload: { message: string } }
  | { type: "SET_ROLE"; payload: { role: "doctor" | "patient" } }
  | { type: "LOGIN_SUCCESS"; payload: { loginModel: LoginModel } }
  | { type: "LOGIN_FAILURE"; payload: { message: string } }
  | { type: "LOGOUT"; payload: { message: string } }
  | { type: "OTP_VERIFICATION_SUCCESS"; payload: { message: string } }
  | { type: "OTP_VERIFICATION_FAILURE"; payload: { message: string } }
  | {
      type: "RESTORE_TOKEN";
      payload: {
        token: string;
        user?: LoginModel["user"];
        role?: "doctor" | "patient" | "";
      };
    }
  | { type: "RESEND_OTP_SUCCESS"; payload: { otp: string; message: string } }
  | { type: "RESEND_OTP_FAILURE"; payload: { message: string } }
  | { type: "SET_MESSAGE"; payload: { message: string } }
  | { type: "SET_ERROR"; payload: { isError: boolean; errorMessage?: string } }
  | { type: "RESET" };

interface AuthContextType {
  authState: authStateType;
  authDispatch: React.Dispatch<AuthActionType>;
}

const initialauthState: authStateType = {
  loading: false,
  isLoggedIn: false,
  role: "",
  phoneNumber: "",
  loginModel: {
    token: "",
    message: "",
    user: {
      userId: "",
      username: "",
      name: "",
      phoneNumber: "",
      role: "",
    },
  },
  isOtpSent: false,
  isOtpVerifiedSuccess: false,
  isOtpVerifiedFailure: false,
  message: "",
  isError: false,
  errorMessage: "",
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const authReducer = (
  authState: authStateType,
  action: AuthActionType
): authStateType => {
  switch (action.type) {
    case "INIT":
      return { ...authState, loading: true };
    case "SET_PHONE_NUMBER":
      return { ...authState, phoneNumber: action.payload.phoneNumber };
    case "OTP_SENT_SUCCESS":
      return {
        ...authState,
        loading: false,
        isOtpSent: true,
        phoneNumber: action.payload.phoneNumber,
        message: action.payload.message,
        isError: false,
        errorMessage: "",
      };
    case "OTP_SENT_FAILURE":
      return {
        ...authState,
        loading: false,
        isError: true,
        errorMessage: action.payload.message,
      };
    case "SET_ROLE":
      return { ...authState, role: action.payload.role };
    case "LOGIN_SUCCESS":
      return {
        ...authState,
        loading: false,
        isLoggedIn: true,
        loginModel: action.payload.loginModel,
      };
    case "LOGIN_FAILURE":
      return {
        ...authState,
        loading: false,
        isError: true,
        errorMessage: action.payload.message,
      };
    case "LOGOUT":
      return {
        loading: false,
        isLoggedIn: false,
        role: "",
        phoneNumber: "",
        loginModel: {
          token: "",
          message: "",
          user: {
            userId: "",
            username: "",
            name: "",
            phoneNumber: "",
            role: "",
          },
        },
        isOtpSent: false,
        isOtpVerifiedSuccess: false,
        isOtpVerifiedFailure: false,
        message: action.payload.message,
        isError: false,
        errorMessage: "",
      };
    case "OTP_VERIFICATION_SUCCESS":
      return {
        ...authState,
        loading: false,
        isLoggedIn: true,
        isOtpVerifiedSuccess: true,
        message: action.payload.message,
      };
    case "OTP_VERIFICATION_FAILURE":
      return {
        ...authState,
        loading: false,
        isOtpVerifiedFailure: true,
        isError: true,
        errorMessage: action.payload.message,
      };
    case "RESEND_OTP_SUCCESS":
      return { ...authState, loading: false, message: action.payload.message };
    case "RESEND_OTP_FAILURE":
      return {
        ...authState,
        loading: false,
        isError: true,
        errorMessage: action.payload.message,
      };
    case "SET_MESSAGE":
      return { ...authState, message: action.payload.message };
    case "SET_ERROR":
      return {
        ...authState,
        loading: false,
        isError: action.payload.isError,
        errorMessage: action.payload.errorMessage || "",
      };
    case "RESTORE_TOKEN":
      return {
        ...authState,
        loading: false,
        isLoggedIn: true,
        loginModel: {
          ...authState.loginModel,
          token: action.payload.token,
          user: action.payload.user || authState.loginModel.user,
        },
        role: action.payload.role || "",
      };
    case "RESET":
      return { ...initialauthState };
    default:
      return authState;
  }
};

const logAsyncStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const values = await AsyncStorage.multiGet(keys);
    console.log("AsyncStorage contents:");
    values.forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
  } catch (error) {
    console.error("Error logging AsyncStorage:", error);
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, authDispatch] = useReducer(authReducer, initialauthState);

  useEffect(() => {
    logAsyncStorage();
  }, [authState.isLoggedIn]);

  useEffect(() => {
    const loadToken = async () => {
      try {
        authDispatch({ type: "INIT" });
        const token = await AsyncStorage.getItem("authToken");
        const userStr = await AsyncStorage.getItem("userData");
        const user = userStr ? JSON.parse(userStr) : null;

        if (token) {
          authDispatch({
            type: "RESTORE_TOKEN",
            payload: {
              token,
              user,
              role: user?.role || "",
            },
          });
        } else {
          authDispatch({ type: "SET_ERROR", payload: { isError: false } });
        }
      } catch (error) {
        console.error("Token loading failed", error);
        authDispatch({
          type: "SET_ERROR",
          payload: {
            isError: true,
            errorMessage: "Failed to load authentication data",
          },
        });
      }
    };

    loadToken();
  }, []);

  useEffect(() => {
    const saveToken = async () => {
      if (authState.loginModel.token) {
        try {
          await AsyncStorage.setItem("authToken", authState.loginModel.token);
          await AsyncStorage.setItem(
            "userData",
            JSON.stringify(authState.loginModel.user)
          );
        } catch (error) {
          console.error("Saving token failed", error);
        }
      }
    };

    saveToken();
  }, [authState.loginModel.token, authState.loginModel.user]);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
