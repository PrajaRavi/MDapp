import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";

import * as Clipboard from "expo-clipboard";

import Animated, {
  FadeInDown,
  Layout,
} from "react-native-reanimated";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  orderId: string;
  day: string;
  time: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  altPhone: string;
  status:
    | "Pending"
    | "Processing"
    | "Picked Up"
    | "Delivered"
    | "Cancelled";
  items: OrderItem[];
}

const orders: Order[] = [
  {
    _id: "1",
    orderId: "ORD-123456",
    day: "12 Jun 2026",
    time: "09:00 AM - 11:00 AM",
    address:
      "Sector 15, Kalamboli, Navi Mumbai",
    lat: 19.0328,
    lng: 73.1022,
    phone: "9876543210",
    altPhone: "9123456789",
    status: "Pending",

    items: [
      {
        name: "Shirt",
        quantity: 2,
        price: 40,
      },
      {
        name: "Jeans",
        quantity: 1,
        price: 35,
      },
      {
        name: "T-Shirt",
        quantity: 3,
        price: 60,
      },
    ],
  },

  {
    _id: "2",
    orderId: "ORD-123457",
    day: "14 Jun 2026",
    time: "04:00 PM - 06:00 PM",
    address:
      "Roadpali, Navi Mumbai",
    lat: 19.0262,
    lng: 73.1124,
    phone: "9988776655",
    altPhone: "8877665544",
    status: "Delivered",

    items: [
      {
        name: "Saree",
        quantity: 2,
        price: 120,
      },
      {
        name: "Blazer",
        quantity: 1,
        price: 100,
      },
    ],
  },
];

export default function OrdersScreen() {
  const [expandedOrder, setExpandedOrder] =
    useState<string | null>(null);

  const copyText = async (
    value: string
  ) => {
    await Clipboard.setStringAsync(
      value
    );

    Alert.alert(
      "Copied",
      `${value} copied successfully`
    );
  };

  const getStatusColor = (
    status: string
  ) => {
    switch (status) {
      case "Pending":
        return "#F59E0B";

      case "Processing":
        return "#3B82F6";

      case "Picked Up":
        return "#8B5CF6";

      case "Delivered":
        return "#10B981";

      case "Cancelled":
        return "#EF4444";

      default:
        return "#01BCBC";
    }
  };

  const renderRow = (
    label: string,
    value: string
  ) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>
    </View>
  );

  const renderCopyRow = (
    label: string,
    value: string
  ) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>
        {label}
      </Text>

      <View style={styles.copyRow}>
        <Text style={styles.value}>
          {value}
        </Text>

        <TouchableOpacity
          style={styles.copyButton}
          onPress={() =>
            copyText(value)
          }
        >
          <Text
            style={
              styles.copyButtonText
            }
          >
            Copy
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={styles.container}
    >
      <Text style={styles.heading}>
        Orders
      </Text>

      <FlatList
        data={orders}
        keyExtractor={(item) =>
          item._id
        }
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={
          false
        }
        renderItem={({
          item,
          index,
        }) => {
          const total =
            item.items.reduce(
              (
                acc,
                current
              ) =>
                acc +
                current.price,
              0
            );

          return (
            <Animated.View
              entering={FadeInDown.delay(
                index * 100
              )}
              layout={Layout}
              style={
                styles.orderCard
              }
            >
              <View
                style={
                  styles.header
                }
              >
                <Text
                  style={
                    styles.orderId
                  }
                >
                  {
                    item.orderId
                  }
                </Text>

                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        getStatusColor(
                          item.status
                        ),
                    },
                  ]}
                >
                  <Text
                    style={
                      styles.statusText
                    }
                  >
                    {
                      item.status
                    }
                  </Text>
                </View>
              </View>

              {renderRow(
                "Day",
                item.day
              )}

              {renderRow(
                "Time",
                item.time
              )}

              {renderRow(
                "Address",
                item.address
              )}

              {renderCopyRow(
                "Latitude",
                item.lat.toString()
              )}

              {renderCopyRow(
                "Longitude",
                item.lng.toString()
              )}

              {renderCopyRow(
                "Phone",
                item.phone
              )}

              {renderCopyRow(
                "Alt Phone",
                item.altPhone
              )}

              <TouchableOpacity
                style={
                  styles.viewItemsButton
                }
                onPress={() =>
                  setExpandedOrder(
                    expandedOrder ===
                      item._id
                      ? null
                      : item._id
                  )
                }
              >
                <Text
                  style={
                    styles.viewItemsText
                  }
                >
                  {expandedOrder ===
                  item._id
                    ? "Hide Items"
                    : "View Items"}
                </Text>
              </TouchableOpacity>

              {expandedOrder ===
                item._id && (
                <Animated.View
                  layout={Layout}
                  style={
                    styles.itemsContainer
                  }
                >
                  <Text
                    style={
                      styles.itemsTitle
                    }
                  >
                    Ordered Items
                  </Text>

                  {item.items.map(
                    (
                      product,
                      idx
                    ) => (
                      <View
                        key={idx}
                        style={
                          styles.itemRow
                        }
                      >
                        <Text
                          style={
                            styles.itemName
                          }
                        >
                          {
                            product.name
                          }{" "}
                          ×{" "}
                          {
                            product.quantity
                          }
                        </Text>

                        <Text
                          style={
                            styles.itemPrice
                          }
                        >
                          ₹
                          {
                            product.price
                          }
                        </Text>
                      </View>
                    )
                  )}

                  <View
                    style={
                      styles.totalContainer
                    }
                  >
                    <Text
                      style={
                        styles.totalLabel
                      }
                    >
                      Total
                    </Text>

                    <Text
                      style={
                        styles.totalAmount
                      }
                    >
                      ₹{total}
                    </Text>
                  </View>
                </Animated.View>
              )}
            </Animated.View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021F24",
    paddingHorizontal: 16,
  },

  heading: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    marginVertical: 20,
  },

  orderCard: {
    backgroundColor: "#023B40",
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
  },

  header: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  orderId: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },

  infoRow: {
    marginBottom: 14,
  },

  label: {
    color: "#8EB2B7",
    marginBottom: 4,
    fontSize: 13,
  },

  value: {
    color: "#fff",
    fontWeight: "600",
  },

  copyRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  copyButton: {
    backgroundColor: "#01BCBC",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  copyButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  viewItemsButton: {
    marginTop: 10,
    backgroundColor: "#01BCBC",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  viewItemsText: {
    color: "#fff",
    fontWeight: "700",
  },

  itemsContainer: {
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor:
      "rgba(255,255,255,0.1)",
    paddingTop: 16,
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

  itemName: {
    color: "#fff",
  },

  itemPrice: {
    color: "#01BCBC",
    fontWeight: "700",
  },

  totalContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor:
      "rgba(255,255,255,0.1)",
    flexDirection: "row",
    justifyContent:
      "space-between",
  },

  totalLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  totalAmount: {
    color: "#01BCBC",
    fontSize: 18,
    fontWeight: "700",
  },
});