import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const AnimatedTouchable =
  Animated.createAnimatedComponent(
    TouchableOpacity
  );

export default function BackButton() {
  const scale = useSharedValue(1);

  const animatedStyle =
    useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

  return (
    <AnimatedTouchable
      activeOpacity={0.9}
      style={[
        styles.container,
        animatedStyle,
      ]}
      onPressIn={() => {
        scale.value = withSpring(0.9);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      onPress={() => router.replace("/(tabs)/Home")}
    >
      <Ionicons
        name="arrow-back"
        size={24}
        color="#FFFFFF"
      />
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    top: 60,
    left: 20,

    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor:
      "rgba(2,59,64,0.9)",

    justifyContent: "center",
    alignItems: "center",

    zIndex: 9999,
    elevation: 9999,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
});