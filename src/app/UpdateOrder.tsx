import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";

import { useLocalSearchParams } from "expo-router";

export default function UpdateOrderScreen() {
  const { order } =
    useLocalSearchParams();

  const parsedOrder =
    useMemo(() => {
      try {
        return JSON.parse(
          order as string
        );
      } catch {
        return null;
      }
    }, [order]);

  const [day, setDay] = useState(
    parsedOrder?.day || ""
  );

  const [time, setTime] = useState(
    parsedOrder?.time || ""
  );

  const [phone, setPhone] =
    useState(
      parsedOrder?.phone || ""
    );

  const [altPhone, setAltPhone] =
    useState(
      parsedOrder?.altPhone || ""
    );

  const [address, setAddress] =
    useState(
      parsedOrder?.address || ""
    );

  const [loading, setLoading] =
    useState(false);

  if (!parsedOrder) {
    return (
      <View
        style={styles.center}
      >
        <Text
          style={{
            color: "#fff",
          }}
        >
          Invalid Order Data
        </Text>
      </View>
    );
  }

  const handleUpdate =
    async () => {
      try {
        setLoading(true);

        const payload = {
          day,
          time,
          phone,
          altPhone,
          address,
        };

        /*
        ==================================
        API CALL PLACEHOLDER
        ==================================

        await axios.patch(
          `/orders/${parsedOrder._id}`,
          payload
        );

        OR

        await fetch(
          `${BASE_URL}/orders/${parsedOrder._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              payload
            ),
          }
        );
        */

        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              2000
            )
        );

        Alert.alert(
          "Success",
          "Order updated successfully"
        );
      } catch (error) {
        Alert.alert(
          "Error",
          "Failed to update order"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
      <Text style={styles.title}>
        Update Order
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Order ID
        </Text>

        <Text
          style={styles.readOnly}
        >
          {
            parsedOrder.orderId
          }
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Status
        </Text>

        <Text style={styles.status}>
          {
            parsedOrder.status
          }
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Pickup Day
        </Text>

        <TextInput
          value={day}
          onChangeText={setDay}
          style={styles.input}
          placeholder="Day"
          placeholderTextColor="#8AA6A8"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Pickup Time
        </Text>

        <TextInput
          value={time}
          onChangeText={setTime}
          style={styles.input}
          placeholder="Time"
          placeholderTextColor="#8AA6A8"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Phone
        </Text>

        <TextInput
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="#8AA6A8"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Alternate Phone
        </Text>

        <TextInput
          value={altPhone}
          onChangeText={
            setAltPhone
          }
          keyboardType="phone-pad"
          style={styles.input}
          placeholder="Alternate Phone"
          placeholderTextColor="#8AA6A8"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Address
        </Text>

        <TextInput
          value={address}
          onChangeText={
            setAddress
          }
          multiline
          style={[
            styles.input,
            styles.addressInput,
          ]}
          placeholder="Address"
          placeholderTextColor="#8AA6A8"
        />
      </View>

      <View style={styles.card}>
        <Text
          style={styles.itemsTitle}
        >
          Ordered Items
        </Text>

        {parsedOrder.items?.map(
          (
            item: any,
            index: number
          ) => (
            <View
              key={index}
              style={
                styles.itemRow
              }
            >
              <Text
                style={
                  styles.itemText
                }
              >
                {item.name} ×{" "}
                {
                  item.quantity
                }
              </Text>

              <Text
                style={
                  styles.itemPrice
                }
              >
                ₹{item.price}
              </Text>
            </View>
          )
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleUpdate}
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
            Update Order
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#021F24",
      padding: 20,
    },

    center: {
      flex: 1,
      justifyContent:
        "center",
      alignItems: "center",
      backgroundColor:
        "#021F24",
    },

    title: {
      color: "#fff",
      fontSize: 32,
      fontWeight: "700",
      marginBottom: 20,
    },

    card: {
      backgroundColor:
        "#023B40",
      borderRadius: 20,
      padding: 16,
      marginBottom: 16,
    },

    label: {
      color: "#A8C4C8",
      marginBottom: 8,
    },

    readOnly: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 16,
    },

    status: {
      color: "#01BCBC",
      fontWeight: "700",
      fontSize: 16,
    },

    input: {
      backgroundColor:
        "rgba(255,255,255,0.08)",
      borderRadius: 14,
      padding: 14,
      color: "#fff",
    },

    addressInput: {
      minHeight: 100,
      textAlignVertical:
        "top",
    },

    itemsTitle: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 12,
    },

    itemRow: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      marginBottom: 10,
    },

    itemText: {
      color: "#fff",
    },

    itemPrice: {
      color: "#01BCBC",
      fontWeight: "700",
    },

    button: {
      backgroundColor:
        "#01BCBC",
      height: 55,
      borderRadius: 16,
      justifyContent:
        "center",
      alignItems: "center",
      marginTop: 10,
    },

    buttonText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 16,
    },
  });