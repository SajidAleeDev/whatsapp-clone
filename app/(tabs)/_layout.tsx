import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router/tabs";

const layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="Chat" />
      <Tabs.Screen name="Call" />
    </Tabs>
  );
};

export default layout;
