import axios from 'axios';
import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity, 
  ImageBackground,
  TextInput,
  Image,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
// Sample data for list items
const DATA = [
  {
    id: '1',
    title: 'Welcome to Our App',
    description: 'Explore our features and services.',
    image: '/assets/images/ttttt.jpg',
  },
  {
    id: '2',
    title: 'Services',
    description: 'We offer a variety of services tailored to your needs.',
    image: '/assets/images/hhhhh.jpg',
  },
  {
    id: '3',
    title: 'Contact Us',
    description: 'Get in touch with our team for support.',
    image: '/assets/images/uuuuu.jpg',
  },
];

// Data for the new list
const NEW_DATA = [
  {
    id: '4',
    title: 'New Feature',
    description: 'Check out our new feature!',
    image: '/assets/images/new_feature.jpg',
  },
  {
    id: '5',
    title: 'Promotions',
    description: 'Get the latest promotions here.',
    image: '/assets/images/promotions.jpg',
  },
];

// Data for background images
const IMAGES = [
  { uri: '/assets/images/ttttt.jpg' },
  { uri: '/assets/images/hhhhh.jpg' },
  { uri: '/assets/images/uuuuu.jpg' },
];
const icon=[
  "https://th.bing.com/th/id/OIP.6AynLEwjkmk1b7WYEvJNwAHaHa?rs=1&pid=ImgDetMain",
  "https://cdn2.iconfinder.com/data/icons/jewelry-and-accessories-filled/64/Jewelry-18-512.png",
  "https://th.bing.com/th/id/OIP.zGB-Ar7FINJbSyX1BegTsgHaHa?rs=1&pid=ImgDetMain",
  "https://th.bing.com/th/id/R.92171eb2c9489ba0d5bb0735c615b7e3?rik=ljT%2bZDLpwroSnQ&pid=ImgRaw&r=0"
]
// Type for item data




// Main app component
const App = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchText, setSearchText] = useState(''); // State to store search keyword
  const [filteredData, setFilteredData] = useState(DATA); // Filtered data based on search keyword
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  // Automatically change background image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % IMAGES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        const response2 = await axios.get('https://fakestoreapi.com/products');
        setProducts(response2.data);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  // Handle text change in search input
 

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      
      {/* Header with search bar and cart */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
        />
        <TouchableOpacity style={styles.cartButton} onPress={() => router.push("/(tabs)/Cart")}>
        <AntDesign name="shoppingcart" size={40} color="black" />
        </TouchableOpacity>
      </View>

      {/* Background image with automatic transition */}
      <ImageBackground
        source={IMAGES[currentImageIndex]}
        style={styles.hero}
      >
        <Text style={styles.heroTitle}></Text>
        <Text style={styles.heroSubtitle}></Text>
      </ImageBackground>

      {/* Scrollable layout with two side-by-side lists */}
      <ScrollView>
        <View style={{padding:10}}><Text style={{fontSize:25,fontWeight:"bold"}}>Danh mục </Text></View>
      <View style={{ marginTop: 10 }}>
  <FlatList
    horizontal={true}
    data={categories}
    renderItem={({ item, index }) => (
      <View style={{ marginHorizontal: 10, alignItems: 'center',width:95 }}> {/* Căn giữa theo chiều ngang */}
        <Image
          source={{
            uri: icon[index],
          }}
          style={{
            height: 60,
            width: 60,
            borderRadius: 30, // Chỉnh sửa borderRadius để đảm bảo hình tròn
          }}
        />
        <Text style={{ marginTop: 5,fontSize:12 }}>{item}</Text> {/* Thêm marginTop để tạo khoảng cách giữa hình và chữ */}
      </View>
    )}
    keyExtractor={(item, index) => index.toString()}
  />
</View>
<View style={{padding:10}}><Text style={{fontSize:25,fontWeight:"bold"}}>Sản phẩm </Text></View>

<View style={styles.container}>
      <FlatList
        data={products}
        
        numColumns={2} // Hiển thị 2 cột
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/productdetail/${item.id}`)} style={styles.itemContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />
            <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <View style={styles.ratingContainer}>
              {/* Nếu sử dụng react-native-vector-icons */}
              <Text>⭐</Text>
              <Text style={styles.ratingText}>{item.rating.rate}</Text>
              <Text style={styles.voteCount}>({item.rating.count} votes)</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles for the layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
 
  itemContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, // Tạo hiệu ứng đổ bóng
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: 'red',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 20,
    fontSize: 16,
    flex: 1,
  },
  hero: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6a51ae',
  },
  heroTitle: {
    fontSize: 26,
    color: 'red',
    fontWeight: 'bold',
  },
  heroSubtitle: {
    fontSize: 20,
    color: 'red',
    marginTop: 10,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  
  description: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  cartButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cartIcon: {
    width: 30,
    height: 30,
  },
  row: {
    flexDirection: 'row', // Set lists side by side
  },
  list: {
    flex: 1, // Make lists occupy equal space
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  voteCount: {
    marginLeft: 10,
    fontSize: 12,
    color: '#888',
  },
});

export default App;
