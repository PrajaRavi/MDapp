import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Animated, {
  FadeInDown,
  FadeOutUp,
} from "react-native-reanimated";

type Props = {
  visible: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  children?: React.ReactNode;
};

export default function FloatingPopup({
  visible,
  title,
  description,
  onClose,
  children,
}: Props) {
  if (!visible) return null;

  return (
    <Animated.View
      entering={FadeInDown.duration(250)}
      exiting={FadeOutUp.duration(200)}
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.closeButton}
        onPress={onClose}
      >
        <Text style={styles.closeText}>
          ✕
        </Text>
      </TouchableOpacity>

      {title && (
        <Text style={styles.title}>
          {title}
        </Text>
      )}

      {description && (
        <Text style={styles.description}>
          {description}
        </Text>
      )}

      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    top: 100,
    left: 0,
    right: 0,

    zIndex: 999,
    elevation: 9999,

    // backgroundColor: "#023B40",

    borderRadius: 24,

    padding: 20,

    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },

  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex:9999,

    width: 34,
    height: 34,

    borderRadius: 17,

    backgroundColor:
      "rgba(255,255,255,0.1)",

    justifyContent: "center",
    alignItems: "center",
  },

  closeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    paddingRight: 40,
  },

  description: {
    color: "#B7D2D5",
    lineHeight: 22,
  },
});