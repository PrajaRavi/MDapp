
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import Animated, {
  FadeInDown,
} from "react-native-reanimated";

import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { AccessTokenKey, BackendUrl, RefreshTokenKey } from "../utils/Dotenv";
import * as SecureStore from "expo-secure-store"
import { login } from "@/Redux/slice/user.slice";
import { router } from "expo-router";
export default function ProfileScreen() {
  const user = {
    name: "Ravi Kumar",
    email: "ravi@gmail.com",
    phoneNumber: "9876543210",
    address:
      "Sector 15, Kalamboli, Navi Mumbai",

    profilePhoto:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43",
  };

  const LogedInUser=useSelector((state:any)=>state.User.user)
    const isLoggedIn =useSelector((state:any)=>state.User.isLoggedIn)
    const dispatch=useDispatch();
  
  const [profilePhoto, setProfilePhoto] =
    useState(`${BackendUrl}/Images/Profile/${LogedInUser?.profilePicture}`);


  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleChangePhoto =
    async () => {
      try {
        const permission =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
          Alert.alert(
            "Permission Required",
            "Please allow gallery access"
          );
          return;
        }

        const result =
          await ImagePicker.launchImageLibraryAsync({
            mediaTypes:
              ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
          });

        if (result.canceled) return;

        const image =
          result.assets[0];

        setUploadingImage(true);

        const formData =
          new FormData();

        formData.append(
          "profilePhoto",
          {
            uri: image.uri,
            name: `profile-${Date.now()}.jpg`,
            type: "image/jpeg",
          } as any
        );

        /*
        ==========================================
        API PLACEHOLDER FOR PROFILE PHOTO UPDATE
        ==========================================

        const response =
          await fetch(
            `${BASE_URL}/users/profile-photo`,
            {
              method: "PATCH",
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
              body: formData,
            }
          );

        const data =
          await response.json();

        setProfilePhoto(
          data.profilePhoto
        );

        ==========================================
        */

        // Temporary Preview

        setProfilePhoto(
          image.uri
        );

        Alert.alert(
          "Success",
          "Profile photo updated"
        );
      } catch (error) {
        Alert.alert(
          "Error",
          "Unable to upload image"
        );
      } finally {
        setUploadingImage(false);
      }
    };

  const handleUpdateProfile =
    async () => {
      try {
        setLoading(true);

        /*
        ==========================================
        API PLACEHOLDER FOR PROFILE UPDATE
        ==========================================

        await fetch(
          `${BASE_URL}/users/profile`,
          {
            method: "PATCH",
            headers: {
              Authorization:
                `Bearer ${token}`,
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              phoneNumber,
              address,
            }),
          }
        );

        ==========================================
        */

        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              1500
            )
        );

        Alert.alert(
          "Success",
          "Profile updated successfully"
        );
      } catch (error) {
        Alert.alert(
          "Error",
          "Unable to update profile"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleLogout =
    async () => {
      try {
        /*
        await AsyncStorage.removeItem(
          "accessToken"
        );

        await AsyncStorage.removeItem(
          "refreshToken"
        );

        router.replace("/");
        */
await SecureStore.deleteItemAsync(AccessTokenKey)
  await SecureStore.deleteItemAsync(RefreshTokenKey)
  dispatch(login(true))
  router.replace("/Signin")

        Alert.alert(
          "Logout",
          "Logged out successfully"
        );
      } catch (error) {
        Alert.alert(
          "Error",
          "Unable to logout"
        );
      }
    };

  return (
    <>
    {isLoggedIn?<ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 120,
      }}
      showsVerticalScrollIndicator={
        false
      }
    >
      <Animated.View
        entering={FadeInDown.duration(
          500
        )}
      >
        <Text style={styles.title}>
          Profile
        </Text>

        <View
          style={styles.profileCard}
        >
          <View
            style={
              styles.avatarContainer
            }
          >
            <Image
              source={{
                uri: profilePhoto,
              }}
              style={
                styles.avatar
              }
            />

            {uploadingImage && (
              <View
                style={
                  styles.loaderOverlay
                }
              >
                <ActivityIndicator
                  size="large"
                  color="#01BCBC"
                />
              </View>
            )}

            <TouchableOpacity
              style={
                styles.changePhotoButton
              }
              onPress={
                handleChangePhoto
              }
            >
              <Ionicons
                name="camera"
                size={18}
                color="#FFF"
              />
            </TouchableOpacity>
          </View>

          <Text
            style={styles.name}
          >
            {LogedInUser?.username}
          </Text>

          <Text
            style={styles.email}
          >
            {LogedInUser?.email}
          </Text>
        </View>

        <View
          style={styles.detailsCard}
        >
          <DetailRow
            label="Phone Number"
            value={
              LogedInUser?.phoneNumber
            }
          />

          <DetailRow
            label="Address"
            value={
              LogedInUser?.address
            }
          />
        </View>

        <TouchableOpacity
          style={
            styles.updateButton
          }
          onPress={
            handleUpdateProfile
          }
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator
              color="#FFF"
            />
          ) : (
            <Text
              style={
                styles.updateButtonText
              }
            >
              Update Profile
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={
            styles.logoutButton
          }
          onPress={
            handleLogout
          }
        >
          <Text
            style={
              styles.logoutButtonText
            }
          >
            Logout
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>:
    <View style={styles.container}>
      <Text style={{fontSize:20,color:"white"}}>You are not logedIn</Text>
    </View>
    }
    </>

  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View
      style={styles.detailRow}
    >
      <Text
        style={styles.label}
      >
        {label}
      </Text>

      <Text
        style={styles.value}
      >
        {value}
      </Text>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#021F24",
      paddingHorizontal: 20,
    },

    title: {
      color: "#FFFFFF",
      fontSize: 32,
      fontWeight: "700",
      marginTop: 20,
      marginBottom: 20,
    },

    profileCard: {
      backgroundColor:
        "#023B40",
      borderRadius: 28,
      paddingVertical: 30,
      alignItems: "center",
    },

    avatarContainer: {
      position: "relative",
    },

    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 4,
      borderColor:
        "#01BCBC",
    },

    loaderOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,

      borderRadius: 60,

      backgroundColor:
        "rgba(0,0,0,0.5)",

      justifyContent:
        "center",
      alignItems: "center",
    },

    changePhotoButton: {
      position: "absolute",
      right: 0,
      bottom: 0,

      width: 40,
      height: 40,

      borderRadius: 20,

      backgroundColor:
        "#01BCBC",

      justifyContent:
        "center",
      alignItems: "center",

      borderWidth: 2,
      borderColor:
        "#023B40",
    },

    name: {
      color: "#FFFFFF",
      fontSize: 24,
      fontWeight: "700",
      marginTop: 15,
    },

    email: {
      color: "#A8C4C8",
      marginTop: 5,
      fontSize: 15,
    },

    detailsCard: {
      backgroundColor:
        "#023B40",
      borderRadius: 24,
      padding: 18,
      marginTop: 20,
    },

    detailRow: {
      marginBottom: 18,
    },

    label: {
      color: "#8CB0B4",
      fontSize: 13,
      marginBottom: 4,
    },

    value: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
    },

    updateButton: {
      backgroundColor:
        "#01BCBC",
      height: 55,
      borderRadius: 16,
      justifyContent:
        "center",
      alignItems: "center",
      marginTop: 25,
    },

    updateButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
    },

    logoutButton: {
      backgroundColor:
        "#EF4444",
      height: 55,
      borderRadius: 16,
      justifyContent:
        "center",
      alignItems: "center",
      marginTop: 15,
    },

    logoutButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
    },
  });
