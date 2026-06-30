import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context"
import Animated, {
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import * as SecureStore from "expo-secure-store";
import { Check } from "lucide-react-native";
import i18n from "../i18n"; // Update according to your project

type Language = {
  code: string;
  name: string;
  native: string;
};

const LANGUAGES: Language[] = [
  {
    code: "en",
    name: "English",
    native: "English",
  },
  {
    code: "mr",
    name: "Marathi",
    native: "मराठी",
  },
  {
    code: "hi",
    name: "Hindi",
    native: "हिन्दी",
  },
];

export default function LanguageScreen() {
  const [selectedLanguage, setSelectedLanguage] =
    useState("en");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const lang =
        await SecureStore.getItemAsync(
          "language"
        );

      if (lang) {
        setSelectedLanguage(lang);
        i18n.changeLanguage(lang);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const changeLanguage = async (
    language: string
  ) => {
    if (saving) return;

    try {
      setSaving(true);

      setSelectedLanguage(language);

      await SecureStore.setItemAsync(
        "language",
        language
      );

      await i18n.changeLanguage(
        language
      );

      /*
      ===============================
      API PLACEHOLDER
      ===============================

      await api.post(
        "/user/change-language",
        {
          language,
        }
      );

      ===============================
      */

      Alert.alert(
        "Success",
        "Language updated."
      );
    } catch (err) {
      Alert.alert(
        "Error",
        "Unable to update language."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        style={styles.loadingContainer}
      >
        <ActivityIndicator
          size="large"
          color="#01BCBC"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <Animated.View
        entering={FadeInDown.duration(
          600
        )}
      >
        <Text style={styles.title}>
          Choose Language
        </Text>

        <Text
          style={styles.subtitle}
        >
          Select your preferred
          language
        </Text>
      </Animated.View>

      <View
        style={styles.languageContainer}
      >
        {LANGUAGES.map(
          (
            language,
            index
          ) => (
            <Animated.View
              key={
                language.code
              }
              entering={FadeInUp.delay(
                index * 150
              )}
            >
              <TouchableOpacity
                activeOpacity={
                  0.85
                }
                style={[
                  styles.card,
                  selectedLanguage ===
                    language.code &&
                    styles.selectedCard,
                ]}
                onPress={() =>
                  changeLanguage(
                    language.code
                  )
                }
              >
                <View>
                  <Text
                    style={
                      styles.language
                    }
                  >
                    {
                      language.native
                    }
                  </Text>

                  <Text
                    style={
                      styles.english
                    }
                  >
                    {
                      language.name
                    }
                  </Text>
                </View>

                {selectedLanguage ===
                  language.code && (
                  <View
                    style={
                      styles.checkCircle
                    }
                  >
                    <Check
                      color="#fff"
                      size={20}
                    />
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          )
        )}
      </View>

      {saving && (
        <ActivityIndicator
          color="#01BCBC"
          size="small"
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      "#021F24",
    paddingHorizontal: 20,
    paddingTop: 70,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor:
      "#021F24",
    justifyContent:
      "center",
    alignItems: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    color: "#9CB8BC",
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
    marginBottom: 40,
  },

  languageContainer: {
    gap: 18,
  },

  card: {
    backgroundColor:
      "#02343B",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.08)",
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  selectedCard: {
    borderColor: "#01BCBC",
    backgroundColor:
      "rgba(1,188,188,0.12)",
  },

  language: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },

  english: {
    color: "#8FA4A7",
    marginTop: 6,
    fontSize: 14,
  },

  checkCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor:
      "#01BCBC",
    justifyContent:
      "center",
    alignItems: "center",
  },
});
