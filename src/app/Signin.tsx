import React, { useState } from "react";
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
import { router } from "expo-router";

export default function SignInScreen() {
  const [identifier, setIdentifier] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const validate = () => {
    if (!identifier.trim()) {
      Alert.alert(
        "Validation Error",
        "Please enter email or phone number"
      );
      return false;
    }

    if (!password.trim()) {
      Alert.alert(
        "Validation Error",
        "Please enter password"
      );
      return false;
    }

    if (password.length < 6) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 6 characters"
      );
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      /*
      ============================
      API CALL PLACEHOLDER
      ============================

      const response = await axios.post(
        "/auth/login",
        {
          identifier,
          password,
        }
      );

      const data = response.data;

      Save Token

      await AsyncStorage.setItem(
        "token",
        data.token
      );

      Navigate

      router.replace("/(tabs)/home");

      */

      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );

      Alert.alert(
        "Success",
        "Logged In Successfully"
      );
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.message ||
          "Something went wrong"
      );
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
            MyDhobi
          </Text>

          <Text style={styles.title}>
            Welcome Back 👋
          </Text>

          <Text style={styles.subtitle}>
            Login to continue
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Email or Phone
            </Text>

            <TextInput
              placeholder="Enter email or phone"
              placeholderTextColor="#8FA4A7"
              value={identifier}
              onChangeText={
                setIdentifier
              }
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Password
            </Text>

            <TextInput
              placeholder="Enter password"
              placeholderTextColor="#8FA4A7"
              secureTextEntry
              value={password}
              onChangeText={
                setPassword
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
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footer}
            onPress={() => {
              /*
               router.push("/signup")
              */
            }}
          >
            <Text
              style={styles.footerText}
            >
              Don't have an account?{" "}
              <Text
              onPress={()=>{
                router.push("/Signup")
              }}
                style={
                  styles.signupText
                }
              >
                Sign Up
              </Text>
            </Text>
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