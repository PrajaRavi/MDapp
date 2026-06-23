import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return(
  <>
   <StatusBar
        
        backgroundColor="#023B40"
      />
  <Stack>

    {/* <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          }}
          /> */}
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
        name="Signup"
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
        </> )
}
