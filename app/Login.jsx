import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  
  const navigation = useNavigation();

  const handleLogin = () => {
    if (email === 'anhthucute.com' && password === '11040608') {
      router.replace("/(tabs)")
    } else {
      setError('Email hoặc mật khẩu không chính xác');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  // Đường dẫn ảnh nền
  const image = { uri: 'https://wallpapercave.com/wp/wp7773864.jpg' };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay} /> {/* Thêm lớp overlay để làm nổi bật nội dung */}

        {/* Nội dung hiển thị trên overlay */}
        <View style={styles.content}>
          {isLoggedIn ? (
            <>
              <Text style={styles.welcome}>Chào mừng, {email}!</Text>
              <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Đăng xuất</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.title}>Đăng Nhập</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                 keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              {error ? <Text style={styles.error}>{error}</Text> : null}

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Thêm overlay đen mờ
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 1, // Đảm bảo nội dung ở phía trên lớp overlay
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    zIndex: 1, // Đảm bảo người dùng tương tác được với input
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
    zIndex: 1,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    zIndex: 1,
  },
  welcome: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
    zIndex: 1,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    zIndex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  linkText: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 15,
    zIndex: 1,
  },
});

export default Login;
