import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, NavigationProp } from '@react-navigation/native'; // Import useNavigation và NavigationProp
import { useLocalSearchParams } from "expo-router";
import axios from "axios";

// Định nghĩa kiểu RootStackParamList ngay tại đây


const ProductDetail = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // Trạng thái yêu thích
  const [products, setProducts] = useState("");
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  // Định nghĩa navigation với kiểu cụ thể để tránh lỗi

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Hàm để xử lý khi nhấn nút yêu thích
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Header Section */}
        <View style={styles.header}>
          {/* Nút quay lại */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()} // Quay lại màn hình trước đó
          >
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>

          {/* Nút yêu thích */}
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={toggleFavorite} // Chuyển đổi trạng thái yêu thích
          >
            <AntDesign name={isFavorite ? "heart" : "hearto"} size={24} color="red" />
          </TouchableOpacity>
        </View>

        {/* Main Product Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: products.image }} style={styles.productImage} />
        </View>

        {/* Small Images */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.smallImageContainer}>
          {[
            "https://i.pinimg.com/736x/12/6f/71/126f71166503efb4f1ca7eef2064da81.jpg",
            "https://static.zerochan.net/Wanderer.(Genshin.Impact).full.3838496.jpg",
            "https://i.pinimg.com/originals/45/92/7f/45927fc4c37c2bede96e8aa02ccb2be9.jpg",
            "https://i.pinimg.com/originals/03/11/ab/0311ab98b0ccea153cee66a5f514226d.jpg",
            "https://i.pinimg.com/originals/3f/b7/5e/3fb75eda606ccbc87366f99f130ebfb0.jpg",
          ].map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.smallImage} />
          ))}
        </ScrollView>

        {/* Product Name */}
        <Text numberOfLines={2} style={styles.name}>
          {products.title}
        </Text>

        {/* Price */}
        <Text numberOfLines={2} style={styles.priceText}>
        $ {(products.price).toLocaleString("VN-vi")}
        </Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Text>
            <AntDesign name="star" size={16} color="orange" />
            <AntDesign name="star" size={16} color="orange" />
            <AntDesign name="star" size={16} color="orange" />
            <AntDesign name="star" size={16} color="orange" />
            <AntDesign name="staro" size={16} color="orange" />
          </Text>
          <Text style={styles.ratingCount}>({products.rating.count})</Text>
        </View>

        {/* Description */}
        <Text style={styles.descriptionTitle}>{products.description}</Text>
      

        {/* See More / See Less Button */}
        {/* <TouchableOpacity onPress={toggleDescription}>
          <Text style={styles.toggleDescriptionText}>{showFullDescription ? "Thu gọn" : "Xem thêm"}</Text>
        </TouchableOpacity> */}
      </ScrollView>

      {/* Footer Section */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.totalText}>Tổng: </Text>
          <Text style={styles.totalPrice}>$ {(products.price).toLocaleString("VN-vi")}</Text>
        </View>

        {/* Quantity Control */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>1</Text>
          <TouchableOpacity style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={() => navigation.navigate('Cart')}  // Điều hướng tới trang giỏ hàng
        >
          <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
        </TouchableOpacity>
      </View>
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
    margin: 24,
  },
  imageContainer: {
    width: "100%",
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  smallImageContainer: {
    textAlign: "center",
    flexDirection: "row",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  smallImage: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  name: {
    paddingHorizontal: 15,
    textAlign: "left",
    fontSize: 12,
    color: "gray",
    fontWeight: "bold",
    marginVertical: 8,
  },
  priceText: {
    paddingHorizontal: 15,
    textAlign: "left",
    fontSize: 12,
    color: "red",
    fontWeight: "bold",
    marginVertical: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 16,
  },
  ratingCount: {
    marginLeft: 8,
    fontSize: 16,
  },
  descriptionTitle: {
    paddingHorizontal: 15,
    fontSize: 13,
    fontWeight: "bold",
    marginVertical: 8,
  },
  descriptionText: {
    paddingHorizontal: 15,
    fontSize: 12,
    color: "#888",
    marginBottom: 8,
  },
  toggleDescriptionText: {
    paddingHorizontal: 15,
    color: "pink",
    fontSize: 13,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EAEAEA",
    padding: 16,
  },
  totalText: {
    fontSize: 12,
    color: "#000",
  },
  totalPrice: {
    fontSize: 12,
    fontWeight: "bold",
    color: "red",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  addToCartButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  backButton: {
    padding: 10,
  },
  favoriteButton: {
    padding: 10,
  },
});

export default ProductDetail;
