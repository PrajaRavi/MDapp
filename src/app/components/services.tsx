import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

export interface ServiceItem {
  id: string;
  label: string;
  price: number;
  quantity?: number;
}

interface Props {
  visible: boolean;
  serviceName: string;
  items: ServiceItem[];
  onClose: () => void;
  onContinue?: (
    items: ServiceItem[],
    totalPrice: number
  ) => void;
}

export default function ServiceItemsModal({
  visible,
  serviceName,
  items,
  onClose,
  onContinue,
}: Props) {
  const [serviceItems, setServiceItems] =
    useState(
      items.map((item) => ({
        ...item,
        quantity: item.quantity || 0,
      }))
    );

  const increment = (id: string) => {
    setServiceItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                (item.quantity || 0) + 1,
            }
          : item
      )
    );
  };

  const decrement = (id: string) => {
    setServiceItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                (item.quantity || 0) - 1,
                0
              ),
            }
          : item
      )
    );
  };

  const totalPrice = useMemo(() => {
    return serviceItems.reduce(
      (sum, item) =>
        sum +
        item.price *
          (item.quantity || 0),
      0
    );
  }, [serviceItems]);
useEffect(()=>{
console.log(items)
},[])
  const totalItems = useMemo(() => {
    return serviceItems.reduce(
      (sum, item) =>
        sum + (item.quantity || 0),
      0
    );
  }, [serviceItems]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {serviceName}
          </Text>

          <FlatList
            data={serviceItems}
            keyExtractor={(item) =>
              item.id
            }
            renderItem={({ item }) => (
              <View
                style={styles.itemRow}
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
                    ₹{item.price}/pc
                  </Text>
                </View>

                <View
                  style={
                    styles.counter
                  }
                >
                  <TouchableOpacity
                    onPress={() =>
                      decrement(
                        item.id
                      )
                    }
                  >
                    <Text
                      style={
                        styles.operator
                      }
                    >
                      −
                    </Text>
                  </TouchableOpacity>

                  <Text
                    style={
                      styles.count
                    }
                  >
                    {
                      item.quantity
                    }
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      increment(
                        item.id
                      )
                    }
                  >
                    <Text
                      style={
                        styles.operator
                      }
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <View style={styles.footer}>
            <View>
              <Text
                style={
                  styles.totalPrice
                }
              >
                ₹{totalPrice}
              </Text>

              <Text>
                {totalItems} Items
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                onContinue?.(
                  serviceItems,
                  totalPrice
                )
              }
            >
              <Text
                style={
                  styles.buttonText
                }
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
          >
            <Text
              style={{
                color: "#fff",
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor:
      "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },

  container: {
    height: "75%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },

  itemRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  itemName: {
    fontSize: 16,
    fontWeight: "600",
  },

  price: {
    color: "#01BCBC",
    marginTop: 4,
  },

  counter: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },

  operator: {
    fontSize: 24,
    width: 30,
    textAlign: "center",
  },

  count: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 12,
  },

  footer: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  totalPrice: {
    fontSize: 24,
    fontWeight: "700",
  },

  button: {
    backgroundColor: "#01BCBC",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },

  closeBtn: {
    marginTop: 15,
    backgroundColor: "#023B40",
    padding: 14,
    borderRadius: 20,
    alignItems: "center",
  },
});