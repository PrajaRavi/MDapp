
import React, {
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context"
import { router, useLocalSearchParams } from "expo-router";

import Animated, {
  FadeInDown,
} from "react-native-reanimated";

export default function ServiceDetailsScreen() {
  const { service } =
    useLocalSearchParams();

  const parsedService =
    useMemo(() => {
      try {
        return JSON.parse(
          service as string
        );
      } catch {
        return null;
      }
    }, [service]);

  const [quantities, setQuantities] =
    useState<
      Record<string, number>
    >({});

  if (!parsedService) {
    return (
      <View
        style={styles.center}
      >
        <Text
          style={{
            color: "#fff",
          }}
        >
          Invalid Service Data
        </Text>
      </View>
    );
  }

  const increase = (
    itemId: string
  ) => {
    setQuantities(
      (prev) => ({
        ...prev,
        [itemId]:
          (prev[itemId] ||
            0) + 1,
      })
    );
  };

  const decrease = (
    itemId: string
  ) => {
    setQuantities(
      (prev) => ({
        ...prev,
        [itemId]: Math.max(
          (
            prev[
              itemId
            ] || 0
          ) - 1,
          0
        ),
      })
    );
  };

  const total =
    parsedService.items.reduce(
      (
        acc: number,
        item: any
      ) =>
        acc +
        item.price *
          (quantities[
            item.id
          ] || 0),
      0
    );

  return (
    <SafeAreaView
      style={styles.container}
    >
      <Text style={styles.title}>
        {
          parsedService.name
        }
      </Text>

      <FlatList
        data={
          parsedService.items
        }
        keyExtractor={(item) =>
          item.id
        }
        contentContainerStyle={{
          paddingBottom: 140,
        }}
        renderItem={({
          item,
          index,
        }) => {
          const qty =
            quantities[
              item.id
            ] || 0;

          return (
            <Animated.View
              entering={FadeInDown.delay(
                index * 100
              )}
              style={
                styles.itemCard
              }
            >
              <View>
                <Text
                  style={
                    styles.itemName
                  }
                >
                  {item.label}
                </Text>

                <Text
                  style={
                    styles.price
                  }
                >
                  ₹
                  {
                    item.price
                  }
                </Text>
              </View>

              <View
                style={
                  styles.counterContainer
                }
              >
                <TouchableOpacity
                  style={
                    styles.counterBtn
                  }
                  onPress={() =>
                    decrease(
                      item.id
                    )
                  }
                >
                  <Text
                    style={
                      styles.counterText
                    }
                  >
                    −
                  </Text>
                </TouchableOpacity>

                <Text
                  style={
                    styles.qty
                  }
                >
                  {qty}
                </Text>

                <TouchableOpacity
                  style={
                    styles.counterBtn
                  }
                  onPress={() =>
                    increase(
                      item.id
                    )
                  }
                >
                  <Text
                    style={
                      styles.counterText
                    }
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          );
        }}
      />

      {/* Bottom Summary */}

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
            ₹{total}
          </Text>
        </View>

        <TouchableOpacity
          style={
            styles.continueBtn
          }
          onPress={() => {
            const selectedItems =
              parsedService.items
                .filter(
                  (
                    item: any
                  ) =>
                    (
                      quantities[
                        item.id
                      ] || 0
                    ) > 0
                )
                .map(
                  (
                    item: any
                  ) => ({
                    id: item.id,
                    name: item.name,
                    quantity:
                      quantities[
                        item.id
                      ],
                    price:
                      item.price,
                  })
                );

            console.log(
              selectedItems
            );

            
            router.push({
              pathname:
                "/PlaceOrder",
              params: {
                order:
                  JSON.stringify(
                    {items:selectedItems,total:total}
                  ),
                total,
              },
            });
            
          }}
        >
          <Text
            style={
              styles.continueText
            }
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#021F24",
      padding: 16,
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
      fontSize: 30,
      fontWeight: "700",
      marginBottom: 20,
    },

    itemCard: {
      backgroundColor:
        "#023B40",
      borderRadius: 22,
      padding: 18,
      marginBottom: 14,

      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
    },

    itemName: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "600",
    },

    price: {
      color: "#01BCBC",
      marginTop: 6,
      fontWeight: "700",
    },

    counterContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    counterBtn: {
      width: 38,
      height: 38,

      borderRadius: 19,

      backgroundColor:
        "#01BCBC",

      justifyContent:
        "center",
      alignItems: "center",
    },

    counterText: {
      color: "#fff",
      fontSize: 22,
      fontWeight: "700",
    },

    qty: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "700",
      marginHorizontal: 14,
      minWidth: 25,
      textAlign: "center",
    },

    bottomBar: {
      position: "absolute",

      left: 16,
      right: 16,
      bottom: 20,

      backgroundColor:
        "#023B40",

      borderRadius: 24,

      padding: 18,

      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
    },

    totalLabel: {
      color: "#8CB0B4",
      fontSize: 13,
    },

    totalPrice: {
      color: "#fff",
      fontSize: 24,
      fontWeight: "700",
      marginTop: 3,
    },

    continueBtn: {
      backgroundColor:
        "#01BCBC",

      paddingHorizontal: 26,
      paddingVertical: 14,

      borderRadius: 16,
    },

    continueText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 15,
    },
  });

