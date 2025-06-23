import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKEND_URL = "https://example.com/api";

export const API_ENDPOINT = {
  SEND_OTP: "/send-otp",
  VERIFY_OTP: "/verify-otp",
};

export const sendOTP = async (
  number: string,
  dispatch: React.Dispatch<any>
) => {
  dispatch({ type: "INIT" });
  try {
    const requestBody = {
      phone_number: number,
    };
    console.log(
      "Sending OTP Request ==>> ",
      `${BACKEND_URL}${API_ENDPOINT.SEND_OTP}`,
      JSON.stringify(requestBody)
    );
    // const response = await fetch(`${BACKEND_URL}${API_ENDPOINT.SEND_OTP}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(requestBody),
    // });

    // if (!response.ok) {
    //   const errorData = await response.json();
    //   console.error("Error sending OTP:", errorData);
    //   dispatch({
    //     type: "OTP_SENT_FAILURE",
    //     payload: { message: errorData.message || "Failed to send OTP" },
    //   });
    // }

    // const data = await response.json();
    // console.log("OTP Sent Response Data -- ", data);
    // if (data.success) {

    dispatch({
      type: "OTP_SENT_SUCCESS",
      payload: {
        phoneNumber: number,
        // message: data.message,
        message: "OTP sent successfully",
      },
    });

    // dispatch({
    //   type: "OTP_SENT_FAILURE",
    //   payload: { message: "OTP sent error" },
    // });

    // }
    // return data;
  } catch (error: any) {
    console.error("Error sending OTP:", error);
    dispatch({
      type: "SET_ERROR",
      payload: { isError: true, errorMessage: error.message },
    });
  }
};

export const verifyOTP = async (
  otp: string,
  phoneNumber: string,
  role: string,
  dispatch: React.Dispatch<any>
) => {
  dispatch({ type: "INIT" });
  try {
    const requestBody = {
      phone_number: phoneNumber,
      otp: otp,
    };
    console.log(
      "Verifying OTP Request ==>> ",
      `${BACKEND_URL}${API_ENDPOINT.VERIFY_OTP}`,
      JSON.stringify(requestBody)
    );
    // const response = await fetch(`${BACKEND_URL}${API_ENDPOINT.VERIFY_OTP}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(requestBody),
    // });

    // if (!response.ok) {
    //   const errorData = await response.json();
    //   console.error("Error verifying OTP:", errorData);
    //   dispatch({
    //     type: "OTP_VERIFICATION_FAILURE",
    //     payload: { message: errorData.message || "Failed to verify OTP" },
    //   });
    // }

    // const data = await response.json();
    // console.log("OTP Verification Response Data -- ", data);

    const user = {
      userId: "12345",
      username: "testUser",
      name: "Test User",
      phoneNumber: phoneNumber,
      role: role,
    };

    // AsyncStorage.setItem("userData", JSON.stringify(user));
    // AsyncStorage.setItem("authToken", "sampleToken");

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        loginModel: {
          token: "sampleToken",
          message: "OTP verified successfully",
          user: user,
        },
      },
    });

    // dispatch({
    //   type: "OTP_VERIFICATION_SUCCESS",
    //   payload: {
    //     message: "OTP verified successfully",
    //   },
    // });
  } catch (error: any) {
    console.error("Error verifying OTP:", error);
    dispatch({
      type: "SET_ERROR",
      payload: { isError: true, errorMessage: error.message },
    });
  }
};

export const logout = async (dispatch: React.Dispatch<any>) => {
  dispatch({ type: "INIT" });
  try {
    // Clear AsyncStorage
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("userData");

    dispatch({ type: "LOGOUT_SUCCESS" });
  } catch (error: any) {
    console.error("Error during logout:", error);
    dispatch({
      type: "SET_ERROR",
      payload: { isError: true, errorMessage: error.message },
    });
  }
};
