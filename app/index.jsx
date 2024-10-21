// app/index.js
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/Login'); // Thay đổi đường dẫn đến trang bạn muốn
    }, 1000); // Thời gian chờ một giây trước khi điều hướng

    return () => clearTimeout(timer); // Dọn dẹp timer nếu component unmount
  }, [router]);

  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}
