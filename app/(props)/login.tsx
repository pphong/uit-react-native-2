import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

type LoginProps = {
  onLogin: (username: string) => void;
};

export default function Login({ onLogin }: LoginProps) {
  const [input, setInput] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên đăng nhập:</Text>
      <TextInput
        placeholder="Nhập tên..."
        style={styles.input}
        value={input}
        onChangeText={setInput}
      />
      <Button title="Đăng nhập" onPress={() => onLogin(input)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
});
