import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from 'expo-router';

const Cart = () => {
    const navigation: any = useNavigation();  // Sử dụng any để bỏ qua lỗi kiểu dữ liệu
  
    const [cartItems, setCartItems] = useState([
      {
        id: 1,
        name: "Bộ quần áo sơ mi cộc tay",
        price: 999000,
        quantity: 1,
        image: "https://i.pinimg.com/originals/e2/52/ca/e252ca4ce21409b413d8e56696a1829b.jpg",
      },
      {
        id: 2,
        name: "Áo thun unisex",
        price: 450000,
        quantity: 2,
        image: "https://i.pinimg.com/736x/64/fc/f5/64fcf5df2368610beafe0def684e0f30.jpg",
      },
    ]);

    // Hàm tăng số lượng sản phẩm
    const increaseQuantity = (id: number) => {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    };

    // Hàm giảm số lượng sản phẩm
    const decreaseQuantity = (id: number) => {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    };

    // Hàm xóa sản phẩm khỏi giỏ hàng
    const removeItem = (id: number) => {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    // Tính tổng tiền
    const getTotalPrice = () => {
      return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={()=>router.back()}>
              <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Giỏ hàng của bạn</Text>
          </View>

          {/* Hiển thị sản phẩm trong giỏ */}
          {cartItems.map(item => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.cartItemImage} />
              <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemName}>{item.name}</Text>
                <Text style={styles.cartItemPrice}>₫ {item.price.toLocaleString("VN-vi")}</Text>

                {/* Nút điều chỉnh số lượng */}
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>

                {/* Nút xóa sản phẩm */}
                <TouchableOpacity onPress={() => removeItem(item.id)}>
                  <Text style={styles.removeText}>Xóa</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Tổng giá trị */}
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Tổng cộng:</Text>
            <Text style={styles.totalPrice}>₫ {getTotalPrice().toLocaleString("VN-vi")}</Text>
          </View>
        </ScrollView>

        {/* Nút thanh toán */}
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('Checkout')}  // Điều hướng tới trang thanh toán
        >
          <Text style={styles.checkoutButtonText}>Tiến hành thanh toán</Text>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
  },
  backButton: {
    // Style cho nút back
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  cartItemImage: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 8,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  cartItemPrice: {
    fontSize: 14,
    color: "red",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityButton: {
    width: 28,
    height: 28,
    backgroundColor: "#28a745",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  removeText: {
    color: "red",
    marginTop: 5,
  },
  totalContainer: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  checkoutButton: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Cart;
