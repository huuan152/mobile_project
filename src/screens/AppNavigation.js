import React from "react";
import SignInSignUpStack from "./User/SignInSignUpStack";
import ContentNavigator from "./ContentNavigator";
import { isLogIn } from "../redux/selectors";
import { useSelector } from "react-redux";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { ThemeProvider } from "styled-components";
import { ToastProvider } from "react-native-styled-toast";
export default function AppNavigation() {
  const logIn = useSelector(isLogIn);

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
