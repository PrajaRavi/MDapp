

import {
  
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context"
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Decorative Circles */}

      <View style={styles.circle1} />
      <View style={styles.circle2} />

      {/* Logo */}

      <Animated.View
        entering={FadeIn.duration(800)}
        style={styles.logoContainer}
      >
        <View style={styles.logo}>
          <Text style={styles.logoText}>
            MD
          </Text>
        </View>
      </Animated.View>

      {/* Title */}

      <Animated.View
        entering={FadeInDown.delay(300)}
      >
        <Text style={styles.title}>
          MyDhobi
        </Text>

        <Text style={styles.heading}>
          Laundry Done{"\n"}Right Every Time
        </Text>

        <Text style={styles.description}>
          Professional laundry &
          dry-cleaning service with
          free pickup and doorstep
          delivery.
        </Text>
      </Animated.View>

      {/* Bottom Card */}

      <Animated.View
        entering={FadeInUp.delay(700)}
        style={styles.bottomContainer}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.button}
          onPress={() =>
            router.replace("/(tabs)/Home")
          }
        >
          <Text style={styles.buttonText}>
            Get Started
          </Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Clean Clothes • Fast Pickup
          • Safe Delivery
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021F24",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 40,
  },

  circle1: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor:
      "rgba(1,188,188,0.08)",
    top: -80,
    right: -80,
  },

  circle2: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor:
      "rgba(1,188,188,0.06)",
    bottom: -70,
    left: -70,
  },

  logoContainer: {
    marginTop: 20,
  },

  logo: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#01BCBC",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#01BCBC",
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },

  logoText: {
    fontSize: 38,
    fontWeight: "800",
    color: "#fff",
  },

  title: {
    marginTop: 30,
    fontSize: 18,
    color: "#01BCBC",
    textAlign: "center",
    fontWeight: "700",
    letterSpacing: 2,
  },

  heading: {
    marginTop: 18,
    fontSize: width > 400 ? 36 : 30,
    color: "#FFFFFF",
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 46,
  },

  description: {
    marginTop: 20,
    color: "#A5C5C9",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 28,
    paddingHorizontal: 12,
  },

  bottomContainer: {
    width: "100%",
    alignItems: "center",
  },

  button: {
    width: "100%",
    backgroundColor: "#01BCBC",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  footer: {
    marginTop: 22,
    color: "#7FA5A9",
    textAlign: "center",
    fontSize: 14,
  },
});
