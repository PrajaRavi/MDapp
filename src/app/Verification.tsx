import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import Animated, {
  FadeInDown,
} from "react-native-reanimated";
import BackButton from "./components/Backbutton";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { BackendUrl } from "./utils/Dotenv";

export default function SignInScreen() {
  const {phone}=useLocalSearchParams()
  const [phoneNumber, setphoneNumber] =
    useState("");

  const [otp, setotp] =
    useState("");
  const [confirmotp, setconfirmotp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const validate = () => {
    if (!phoneNumber.trim()) {
      Alert.alert(
        "Validation Error",
        "Please enter  phone number"
      );
      return false;
    }

    if (!otp.trim()) {
      Alert.alert(
        "Validation Error",
        "Please enter otp"
      );
      return false;
    }

    if (otp.length < 6) {
      Alert.alert(
        "Validation Error",
        "Invalid otp"
      );
      return false;
    }
    if(otp!==confirmotp){
      Alert.alert(
        "Validation Error",
        "Otp is not matching"
      )
    }

    return true;
  };

  useEffect(()=>{
    setphoneNumber(String(phone))
  })
  const handleLogin = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      /*
      ============================
      API CALL PLACEHOLDER
      ============================
      */

      const {data} = await axios.post(
        BackendUrl+"/user/verify-otp-after-signup",
        {
          phoneNumber,
          otp,
        }
      );
if(data.success){
  Alert.alert("successfully verified")
  router.replace("/Signin")
}
else{
  Alert.alert(data?.msg)
}


      
      



      
    } catch (error: any) {
      let {data,status}=error.response;
      Alert.alert(
        "Error",
        data?.msg ||
          "Something went wrong"
      );
      console.log(status)
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }
        keyboardShouldPersistTaps="handled"
      >
        <BackButton/>
        <Animated.View
          entering={FadeInDown.duration(
            600
          )}
          style={styles.card}
        >
          <Text style={styles.logo}>
            Verify
          </Text>

          {/* <Text style={styles.title}>
            Welcome Back 👋
          </Text> */}

          {/* <Text style={styles.subtitle}>
            Login to continue
          </Text> */}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
               Phone
            </Text>

            <TextInput
              placeholder="Enter email or phone"
              placeholderTextColor="#8FA4A7"
              value={phoneNumber}
              onChangeText={
                setphoneNumber
              }
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              otp
            </Text>

            <TextInput
              placeholder="Enter otp"
              placeholderTextColor="#8FA4A7"
              secureTextEntry
              keyboardType="phone-pad"
              value={otp}
              onChangeText={
                setotp
              }
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
               Confirm otp
            </Text>

            <TextInput
              placeholder="Confirm otp"
              placeholderTextColor="#8FA4A7"
              secureTextEntry
              value={confirmotp}
              keyboardType="phone-pad"

              onChangeText={
                setconfirmotp
              }
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.button,
              loading &&
                styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator
                color="#fff"
              />
            ) : (
              <Text
                style={
                  styles.buttonText
                }
              >
                Verify
              </Text>
            )}
          </TouchableOpacity>

          
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021F24",
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  card: {
    backgroundColor: "#023B40",
    borderRadius: 28,
    padding: 24,
  },

  logo: {
    fontSize: 30,
    fontWeight: "800",
    color: "#01BCBC",
    textAlign: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 20,
  },

  subtitle: {
    color: "#A8C4C8",
    marginTop: 6,
    marginBottom: 30,
  },

  inputContainer: {
    marginBottom: 18,
  },

  label: {
    color: "#FFFFFF",
    marginBottom: 8,
    fontWeight: "600",
  },

  input: {
    backgroundColor:
      "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.12)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "#FFFFFF",
    fontSize: 15,
  },

  button: {
    backgroundColor: "#01BCBC",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  footer: {
    marginTop: 24,
    alignItems: "center",
  },

  footerText: {
    color: "#A8C4C8",
  },

  signupText: {
    color: "#01BCBC",
    fontWeight: "700",
  },
});