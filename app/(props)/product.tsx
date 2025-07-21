import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

type ProductProps = {
  username: string;
  onLogout: () => void;
};

export default function Product({ username, onLogout }: ProductProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chào mừng, {username}!</Text>
      <Button title="Đăng xuất" onPress={onLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
});
