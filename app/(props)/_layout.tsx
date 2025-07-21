import React from "react";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PropLearning from "./props-learning";

export default function TabLayout() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="login"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="login"
        options={{
          title: "Props",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
        component={PropLearning}
      />
    </Tab.Navigator>
  );
}
