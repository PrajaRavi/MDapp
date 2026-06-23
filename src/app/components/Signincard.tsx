import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Animated, {
  FadeInDown,
} from "react-native-reanimated";

type Props = {
  onPress: () => void;
};

export default function SignInCard({
  onPress,
}: Props) {
  return (
    <Animated.View
      entering={FadeInDown.duration(600)}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>
          👋 Welcome Guest
        </Text>

        <Text style={styles.subtitle}>
          Login to place orders,
          track deliveries and
          unlock exclusive offers.
        </Text>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={onPress}
        >
          <Text style={styles.buttonText}>
            Sign In →
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#023B40",
  },

  content: {
    padding: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },

  subtitle: {
    color: "#B8D4D8",
    fontSize: 14,
    marginTop: 8,
    lineHeight: 22,
  },

  button: {
    marginTop: 18,
    alignSelf: "flex-start",
    backgroundColor: "#01BCBC",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 30,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});