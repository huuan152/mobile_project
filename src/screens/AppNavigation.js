import React, { useState, useEffect, useRef } from "react";
import SignInSignUpStack from "./User/SignInSignUpStack";
import ContentNavigator from "./ContentNavigator";
import { isLogIn } from "../redux/selectors";
import { useSelector } from "react-redux";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { ThemeProvider } from "styled-components";
import { ToastProvider } from "react-native-styled-toast";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
export default function AppNavigation() {
  const logIn = useSelector(isLogIn);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [notification, setNotification] = useState(null);
  const nav = useNavigation();
  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        nav.navigate("FavoriteStack");
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    console.log({ notification })
  }, [notification])

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          {!logIn ? (
            <SignInSignUpStack></SignInSignUpStack>
          ) : (
            <ContentNavigator></ContentNavigator>
          )}
        </ToastProvider>
      </ThemeProvider>
    </>
  );
}

const theme = {
  space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48],
  colors: {
    text: "#0A0A0A",
    background: "#FFF",
    border: "#E2E8F0",
    muted: "#F0F1F3",
    success: "#7DBE31",
    error: "#FC0021",
    info: "#00FFFF",
  },
};
