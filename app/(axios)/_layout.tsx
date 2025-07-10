import React from "react";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Data1Screen from "./data-1";
import Data2Screen from "./data-2";

export default function TabLayout() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="data-1"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="data-1"
        options={{
          title: "Book list",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
        component={Data1Screen}
      />
      <Tab.Screen
        name="data-2"
        options={{
          title: "Book detail",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
        component={Data2Screen}
      />
    </Tab.Navigator>
  );
}
