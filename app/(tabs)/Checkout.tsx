import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

const CheckoutScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh toán</Text>
      </View>

      {/* Payment Info */}
      <View style={styles.paymentInfo}>
        <Text style={styles.paymentText}>Thông tin thanh toán</Text>
        {/* Add payment options/form here */}
      </View>

      {/* Confirm Payment Button */}
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Xác nhận thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  backButton: {
    // Style cho nút back
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  paymentInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentText: {
    fontSize: 20,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CheckoutScreen;
