import { Link } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

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
  phone: string;
  altPhone: string;
  address: string;
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
    orderId: "ORD123456",
    day: "Today",
    time: "09 AM - 11 AM",
    phone: "9876543210",
    altPhone: "9123456789",
    address:
      "Sector 15, Kalamboli, Navi Mumbai",

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
    orderId: "ORD123457",
    day: "Tomorrow",
    time: "04 PM - 06 PM",
    phone: "9988776655",
    altPhone: "8877665544",
    address:
      "Roadpali, Navi Mumbai",

    status: "Processing",

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

  {
    _id: "3",
    orderId: "ORD123458",
    day: "15 Jun 2026",
    time: "11 AM - 01 PM",
    phone: "9876543211",
    altPhone: "9876543212",
    address:
      "Panvel, Navi Mumbai",

    status: "Delivered",

    items: [
      {
        name: "Shirt",
        quantity: 4,
        price: 80,
      },
      {
        name: "Jeans",
        quantity: 2,
        price: 70,
      },
    ],
  },
];

export default function OrdersScreen() {
  const [expandedOrder, setExpandedOrder] =
    useState<string | null>(null);

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

  return (
    <SafeAreaView
      style={styles.container}
    >
      <Text style={styles.heading}>
        My Orders
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

          const canUpdate =
            item.status ===
              "Pending" ||
            item.status ===
              "Processing";

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
              {/* Header */}

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

              {/* Order Details */}

              <InfoRow
                label="Pickup Day"
                value={item.day}
              />

              <InfoRow
                label="Pickup Time"
                value={item.time}
              />

              <InfoRow
                label="Phone"
                value={
                  item.phone
                }
              />

              <InfoRow
                label="Alt Phone"
                value={
                  item.altPhone
                }
              />

              <InfoRow
                label="Address"
                value={
                  item.address
                }
              />

              {/* View Items */}

              <TouchableOpacity
                style={
                  styles.itemsButton
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
                    styles.itemsButtonText
                  }
                >
                  {expandedOrder ===
                  item._id
                    ? "Hide Items"
                    : "View Items"}
                </Text>
              </TouchableOpacity>

              {/* Items */}

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
                      Total Amount
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

              {/* Update Button */}

              {canUpdate && (
                <TouchableOpacity
                  style={
                    styles.updateButton
                  }
                  
                >
                  <Link 
                  href={{
    pathname: "/UpdateOrder",
    params: {
      order: JSON.stringify(item),
    },
  }}><Text
                    style={
                      styles.updateButtonText
                    }
                  >
                    Update Order
                  </Text></Link>
                </TouchableOpacity>
              )}
            </Animated.View>
          );
        }}
      />
    </SafeAreaView>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#021F24",
    paddingHorizontal: 16,
  },

  heading: {
    color: "#FFFFFF",
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
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },

  infoRow: {
    marginBottom: 12,
  },

  label: {
    color: "#8FB1B6",
    fontSize: 13,
    marginBottom: 4,
  },

  value: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  itemsButton: {
    backgroundColor: "#014D54",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
  },

  itemsButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  itemsContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor:
      "rgba(255,255,255,0.1)",
    paddingTop: 16,
  },

  itemsTitle: {
    color: "#FFFFFF",
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
    color: "#FFFFFF",
    fontSize: 15,
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
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  totalAmount: {
    color: "#01BCBC",
    fontSize: 18,
    fontWeight: "700",
  },

  updateButton: {
    marginTop: 18,
    backgroundColor: "#01BCBC",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  updateButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
});