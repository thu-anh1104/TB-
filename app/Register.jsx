import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; // Import navigation

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const navigation = useNavigation(); // Sử dụng navigation

  const handleRegister = () => {
    if (email !== '' && password !== '' && name !== '') {
      // Giả lập quá trình đăng ký
      console.log('User registered with:', { name, email, password });
      setError('');
      navigation.navigate('Login'); // Điều hướng tới trang đăng nhập sau khi đăng ký thành công
    } else {
      setError('Vui lòng điền đầy đủ thông tin');
    }
  };

  // Đường dẫn ảnh nền
  const image = { uri: 'https://chuuniotaku.com/upload/post/images/2023/11/17/963/anh-kimetsu-no-yaiba-74.jpg' };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay} /> {/* Lớp phủ làm mờ ảnh nền */}

        {/* Nội dung đăng ký */}
        <View style={styles.content}>
          <Text style={styles.title}>Đăng Ký</Text>

          <TextInput
            style={styles.input}
            placeholder="Tên"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
          />
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

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Đăng Ký</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Đã có tài khoản? Đăng nhập</Text>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Lớp phủ làm mờ ảnh nền
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 1, // Đảm bảo nội dung hiển thị trên overlay
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  linkText: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 15,
  },
});

export default App;
