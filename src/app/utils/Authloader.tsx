import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { AccessTokenKey } from "./Dotenv";
import { login } from "@/Redux/slice/user.slice";
import { Stack } from "expo-router";


export default function AuthLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const token =
      await SecureStore.getItemAsync(
        AccessTokenKey
      );

    if (token) {
      dispatch(
        login(true)
      );
    }
  };

  return <Stack>

    <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          }}
          />
    <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
        />
    <Stack.Screen
        name="Signin"
        options={{
          headerShown: false,
        }}
        />
    <Stack.Screen
        name="Offline"
        options={{
          headerShown: false,
        }}
        />
    <Stack.Screen
        name="Verification"
        options={{
          headerShown: false,
        }}
        />
    <Stack.Screen
        name="Signup"
        options={{
          headerShown: false,
        }}
        />
    <Stack.Screen
        name="ServicesDetail"
        options={{
          headerShown: false,
        }}
        />
    <Stack.Screen
        name="PlaceOrder"
        options={{
          headerShown: false,
        }}
        />
    <Stack.Screen
        name="UpdateOrder"
        options={{
          headerShown: false,
        }}
        />
    <Stack.Screen
        name="DeliveryAdmin"
        options={{
          headerShown: false,
        }}
        />
  </Stack>
  
}