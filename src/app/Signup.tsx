import { router } from "expo-router";
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
import axios from "axios"

import Animated, {
  FadeInDown,
} from "react-native-reanimated";
import { BackendUrl } from "./utils/Dotenv";

export default function SignUpScreen() {
  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [contactNumber, setContactNumber] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const validate = () => {
    if (!username.trim()) {
      Alert.alert(
        "Validation Error",
        "Please enter username"
      );
      return false;
    }

    if (!email.trim()) {
      Alert.alert(
        "Validation Error",
        "Please enter email"
      );
      return false;
    }

    if (!contactNumber.trim()) {
      Alert.alert(
        "Validation Error",
        "Please enter contact number"
      );
      return false;
    }

    if (!address.trim()) {
      Alert.alert(
        "Validation Error",
        "Please enter address"
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

  const handleSignup = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      /*
      ============================
      API PLACEHOLDER
      ============================

      */
      const {data} =
        await axios.post(
          BackendUrl+"/user/signup",
          {
            username,
            email,
            phoneNumber:contactNumber,
            Address:address,
            password,
          }
        );
        if(data?.success){
          router.replace({pathname:"/Verification",params:{phone:contactNumber}});
          Alert.alert("An otp is send to your phone")
        }
        else{
          Alert.alert(data?.msg)
        }
          

          

      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );

      Alert.alert(
        "Success",
        "Account Created Successfully"
      );
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
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={
          styles.scrollContent
        }
      >
        <Animated.View
          entering={FadeInDown.duration(
            600
          )}
          style={styles.card}
        >
          <Text style={styles.logo}>
            MyDhobi
          </Text>

          {/* <Text style={styles.title}>
            Create Account 🚀
          </Text> */}

          {/* <Text style={styles.subtitle}>
            Join us and enjoy hassle-free
            laundry services
          </Text> */}

          {/* Username */}

          <View style={styles.field}>
            <Text style={styles.label}>
              Username
            </Text>

            <TextInput
              value={username}
              onChangeText={
                setUsername
              }
              placeholder="Enter username"
              placeholderTextColor="#8FA4A7"
              style={styles.input}
            />
          </View>

          {/* Email */}

          <View style={styles.field}>
            <Text style={styles.label}>
              Email
            </Text>

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              placeholderTextColor="#8FA4A7"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          {/* Contact */}

          <View style={styles.field}>
            <Text style={styles.label}>
              Contact Number
            </Text>

            <TextInput
              value={contactNumber}
              onChangeText={
                setContactNumber
              }
              placeholder="Enter mobile number"
              placeholderTextColor="#8FA4A7"
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>

          {/* Address */}

          <View style={styles.field}>
            <Text style={styles.label}>
              Address
            </Text>

            <TextInput
              value={address}
              onChangeText={
                setAddress
              }
              placeholder="Enter address"
              placeholderTextColor="#8FA4A7"
              multiline
              style={[
                styles.input,
                styles.addressInput,
              ]}
            />
          </View>

          {/* Password */}

          <View style={styles.field}>
            <Text style={styles.label}>
              Password
            </Text>

            <TextInput
              value={password}
              onChangeText={
                setPassword
              }
              placeholder="Enter password"
              placeholderTextColor="#8FA4A7"
              secureTextEntry
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator
                color="#fff"
              />
            ) : (
              <Text
                style={
                  styles.signupText
                }
              >
                Create Account
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footer}
            onPress={() => {
              /*
              router.back()
              */
            }}
          >
            <Text
              style={
                styles.footerText
              }
            >
              Already have an account?{" "}
              <Text
              onPress={()=>{
                router.push("/Signin")
              }}
                style={
                  styles.signInText
                }
              >
                Sign In
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
    paddingVertical: 50,
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
    marginBottom: 25,
    lineHeight: 22,
  },

  field: {
    marginBottom: 16,
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

  addressInput: {
    minHeight: 90,
    textAlignVertical: "top",
  },

  signupButton: {
    backgroundColor: "#01BCBC",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,
  },

  signupText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  footer: {
    marginTop: 22,
    alignItems: "center",
  },

  footerText: {
    color: "#A8C4C8",
  },

  signInText: {
    color: "#01BCBC",
    fontWeight: "700",
  },
});