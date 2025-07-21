import React, { useState } from 'react';
import { View } from 'react-native';
import Login from './login';
import Product from './product';

export default function PropLearning() {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <View style={{ flex: 1 }}>
      {username ? (
        <Product username={username} onLogout={() => setUsername(null)} />
      ) : (
        <Login onLogin={setUsername} />
      )}
    </View>
  );
}
