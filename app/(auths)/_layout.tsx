import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const Tab = createBottomTabNavigator();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="nav-1"
        options={{
          title: 'Login screen',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="arrow.backward.to.line" color={color} />,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="nav-2"
        options={{
          title: 'Create account',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="arrow.backward.to.line" color={color} />,
        }}
      />
    </Tabs>
  );
}
