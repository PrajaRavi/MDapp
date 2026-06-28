
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import * as Location from "expo-location";

import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";

export default function CheckoutScreen() {
  const { order } = useLocalSearchParams();

  const orderData = useMemo(() => {
    try {
      return JSON.parse(order as string);
    } catch {
      return {
        items: [],
        total: 0,
      };
    }
  }, [order]);

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
    const isLoggedIn =useSelector((state:any)=>state.User.isLoggedIn)

  const [pickupDate, setPickupDate] = useState("Today");

  const [pickupSlot, setPickupSlot] = useState(
    "09 AM - 11 AM"
  );

  const [address, setAddress] = useState("");

  const [phone, setPhone] = useState("");

  const [altPhone, setAltPhone] = useState("");

  const [coupon, setCoupon] = useState("");

  const [discount, setDiscount] = useState(0);

  const [acceptedTerms, setAcceptedTerms] =
    useState(false);

  const [loadingLocation, setLoadingLocation] =
    useState(false);

  const [placingOrder, setPlacingOrder] =
    useState(false);

  const originalTotal =
    Number(orderData?.total || 0);

  const finalTotal =
    originalTotal - discount;

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      setLoadingLocation(true);

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Location permission is required"
        );
        return;
      }

      const location =
        await Location.getCurrentPositionAsync({});

      const lat =
        location.coords.latitude;

      const lng =
        location.coords.longitude;

      setLatitude(lat.toString());

      setLongitude(lng.toString());

      const reverseAddress =
        await Location.reverseGeocodeAsync({
          latitude: lat,
          longitude: lng,
        });

      if (reverseAddress.length > 0) {
        const addr =
          reverseAddress[0];

        const formattedAddress = [
          addr.name,
          addr.street,
          addr.district,
          addr.city,
          addr.region,
          addr.postalCode,
        ]
          .filter(Boolean)
          .join(", ");

        setCurrentAddress(
          formattedAddress
        );

        setAddress(
          formattedAddress
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to fetch location"
      );
    } finally {
      setLoadingLocation(false);
    }
  };

  const applyCoupon = () => {
    if (
      coupon.trim().toUpperCase() ===
      "WELCOME20"
    ) {
      const discountAmount =
        Math.round(
          originalTotal * 0.2
        );

      setDiscount(
        discountAmount
      );

      Alert.alert(
        "Success",
        "20% discount applied"
      );
    } else {
      Alert.alert(
        "Invalid Coupon",
        "Coupon code not found"
      );
    }
  };

  const placeOrder = async () => {
    try {
      if (!acceptedTerms) {
        Alert.alert(
          "Terms Required",
          "Please accept Terms & Conditions"
        );
        return;
      }

      if (
        !address ||
        !phone
      ) {
        Alert.alert(
          "Missing Fields",
          "Address and Phone are required"
        );
        return;
      }

      setPlacingOrder(true);

      const payload = {
        latitude,
        longitude,

        currentAddress,

        address,

        phone,

        altPhone,

        pickupDate,

        pickupSlot,

        coupon,

        discount,

        total:
          finalTotal,

        items:
          orderData.items,
      };

      console.log(
        payload
      );

      /*
      ==================================
      API PLACEHOLDER
      ==================================

      await fetch(
        `${BASE_URL}/orders`,
        {
          method: "POST",
          headers: {
            Authorization:
              `Bearer ${token}`,
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            payload
          ),
        }
      );

      ==================================
      */

      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            2000
          )
      );

      if(isLoggedIn){

        Alert.alert(
          "Success",
          "Order placed successfully"
        );
      }else{
        Alert.alert("you are not logedin")
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to place order"
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  const pickupDays = [
    "Today",
    "Tomorrow",
    "Day After Tomorrow",
  ];

  const pickupSlots = [
    "09 AM - 11 AM",
    "11 AM - 01 PM",
    "04 PM - 06 PM",
  ];

  return (
    <View
      style={
        styles.container
      }
    >
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 180,
        }}
        showsVerticalScrollIndicator={
          false
        }
      >
        <Text
          style={
            styles.title
          }
        >
          Checkout
        </Text>

        <View
          style={
            styles.card
          }
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            Current Location
          </Text>

          {loadingLocation ? (
            <ActivityIndicator color="#01BCBC" />
          ) : (
            <>
              <Text
                style={
                  styles.info
                }
              >
                Latitude:
                {" "}
                {
                  latitude
                }
              </Text>

              <Text
                style={
                  styles.info
                }
              >
                Longitude:
                {" "}
                {
                  longitude
                }
              </Text>

              <Text
                style={
                  styles.addressPreview
                }
              >
                {
                  currentAddress
                }
              </Text>
            </>
          )}
        </View>

        <View
          style={
            styles.card
          }
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            Pickup Day
          </Text>

          {pickupDays.map(
            (
              day
            ) => (
              <OptionButton
                key={
                  day
                }
                title={
                  day
                }
                selected={
                  pickupDate ===
                  day
                }
                onPress={() =>
                  setPickupDate(
                    day
                  )
                }
              />
            )
          )}
        </View>

        <View
          style={
            styles.card
          }
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            Pickup Time Slot
          </Text>

          {pickupSlots.map(
            (
              slot
            ) => (
              <OptionButton
                key={
                  slot
                }
                title={
                  slot
                }
                selected={
                  pickupSlot ===
                  slot
                }
                onPress={() =>
                  setPickupSlot(
                    slot
                  )
                }
              />
            )
          )}
        </View>

        <View
          style={
            styles.card
          }
        >
          <TextInput
            style={
              styles.input
            }
            placeholder="Address"
            placeholderTextColor="#8CB0B4"
            value={
              address
            }
            onChangeText={
              setAddress
            }
            multiline
          />

          <TextInput
            style={
              styles.input
            }
            placeholder="Phone Number"
            placeholderTextColor="#8CB0B4"
            keyboardType="phone-pad"
            value={
              phone
            }
            onChangeText={
              setPhone
            }
          />

          <TextInput
            style={
              styles.input
            }
            placeholder="Alternate Phone Number"
            placeholderTextColor="#8CB0B4"
            keyboardType="phone-pad"
            value={
              altPhone
            }
            onChangeText={
              setAltPhone
            }
          />
        </View>

        <View
          style={
            styles.card
          }
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            Coupon Code
          </Text>

          <View
            style={
              styles.couponContainer
            }
          >
            <TextInput
              style={
                styles.couponInput
              }
              placeholder="Enter Coupon"
              placeholderTextColor="#8CB0B4"
              value={
                coupon
              }
              onChangeText={
                setCoupon
              }
            />

            <TouchableOpacity
              style={
                styles.applyButton
              }
              onPress={
                applyCoupon
              }
            >
              <Text
                style={
                  styles.applyText
                }
              >
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={
            styles.card
          }
        >
          <TouchableOpacity
            style={
              styles.checkboxContainer
            }
            onPress={() =>
              setAcceptedTerms(
                !acceptedTerms
              )
            }
          >
            <View
              style={[
                styles.checkbox,
                acceptedTerms &&
                  styles.checkboxActive,
              ]}
            >
              {acceptedTerms && (
                <Text
                  style={
                    styles.tick
                  }
                >
                  ✓
                </Text>
              )}
            </View>

            <Text
              style={
                styles.termsText
              }
            >
              I agree to the Terms &
              Conditions and Laundry
              Service Policy.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View
        style={
          styles.bottomBar
        }
      >
        <View>
          <Text
            style={
              styles.totalLabel
            }
          >
            Total Amount
          </Text>

          <Text
            style={
              styles.totalPrice
            }
          >
            ₹
            {
              finalTotal
            }
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.placeButton,
            !acceptedTerms && {
              opacity: 0.5,
            },
          ]}
          disabled={
            placingOrder ||
            !acceptedTerms
          }
          onPress={
            placeOrder
          }
        >
          {placingOrder ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text
              style={
                styles.placeButtonText
              }
            >
              Place Order
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

function OptionButton({
  title,
  selected,
  onPress,
}: {
  title: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.optionButton,
        selected && {
          backgroundColor:
            "#01BCBC",
        },
      ]}
      onPress={
        onPress
      }
    >
      <Text
        style={
          styles.optionText
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#021F24",
    },

    title: {
      color: "#FFF",
      fontSize: 30,
      fontWeight: "700",
      margin: 20,
    },

    card: {
      backgroundColor:
        "#023B40",
      marginHorizontal: 20,
      marginBottom: 16,
      borderRadius: 20,
      padding: 16,
    },

    sectionTitle: {
      color: "#FFF",
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 12,
    },

    info: {
      color: "#FFF",
      marginBottom: 6,
    },

    addressPreview: {
      color: "#8CB0B4",
      marginTop: 10,
      lineHeight: 22,
    },

    optionButton: {
      backgroundColor:
        "#014D54",
      padding: 14,
      borderRadius: 12,
      marginBottom: 10,
    },

    optionText: {
      color: "#FFF",
      fontWeight: "600",
    },

    input: {
      backgroundColor:
        "#014D54",
      borderRadius: 12,
      color: "#FFF",
      padding: 14,
      marginBottom: 12,
    },

    couponContainer: {
      flexDirection: "row",
    },

    couponInput: {
      flex: 1,
      backgroundColor:
        "#014D54",
      borderRadius: 12,
      color: "#FFF",
      padding: 14,
      marginRight: 10,
    },

    applyButton: {
      backgroundColor:
        "#01BCBC",
      justifyContent:
        "center",
      paddingHorizontal: 20,
      borderRadius: 12,
    },

    applyText: {
      color: "#FFF",
      fontWeight: "700",
    },

    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    checkbox: {
      width: 24,
      height: 24,
      borderWidth: 2,
      borderColor: "#01BCBC",
      borderRadius: 6,
      justifyContent:
        "center",
      alignItems: "center",
      marginRight: 12,
    },

    checkboxActive: {
      backgroundColor:
        "#01BCBC",
    },

    tick: {
      color: "#FFF",
      fontWeight: "700",
    },

    termsText: {
      flex: 1,
      color: "#FFF",
      lineHeight: 20,
    },

    bottomBar: {
      position: "absolute",
      left: 16,
      right: 16,
      bottom: 20,

      backgroundColor:
        "#023B40",

      borderRadius: 20,

      padding: 18,

      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
    },

    totalLabel: {
      color: "#8CB0B4",
    },

    totalPrice: {
      color: "#FFF",
      fontSize: 24,
      fontWeight: "700",
      marginTop: 4,
    },

    placeButton: {
      backgroundColor:
        "#01BCBC",
      paddingHorizontal: 24,
      paddingVertical: 14,
      borderRadius: 14,
    },

    placeButtonText: {
      color: "#FFF",
      fontWeight: "700",
    },
  });
