import React, { useContext, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, useLocalSearchParams } from "expo-router";
import { Pressable, View, Text } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { CartContext } from "@/ctx";
import Camera from "@/components/Camera";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const colorScheme = useColorScheme();

const Header = () => {
  const [showQr, setShowQr] = useState(false);

  return (
    <View
      style={{
        backgroundColor: "white",
        flexDirection: "row-reverse",
        gap: 5,
        padding: 10,
      }}
    >
      <Link href="/checkout" asChild>
        <Pressable>
          <FontAwesome
            name="shopping-cart"
            size={25}
            color={Colors[colorScheme ?? "light"].text}
            style={{ marginRight: 15, opacity: 1 }}
          />
        </Pressable>
      </Link>
      <Pressable onPress={() => setShowQr(true)}>
        <FontAwesome
          name="qrcode"
          size={25}
          color={Colors[colorScheme ?? "light"].text}
          style={{ marginRight: 15 }}
        />
      </Pressable>
      <Camera visible={showQr} setVisible={setShowQr}></Camera>
    </View>
  );
};

export default function TabLayout() {
  const local = useLocalSearchParams();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerTitle: String(local.store),
        headerRight: () => <Text>Header Right</Text>,
        header: () => <Header />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shop",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shopping-bag" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pick-up"
        options={{
          title: "Pick Ups",
          headerTitle: "asd",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="street-view" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="delivery"
        options={{
          title: "Deliveries",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bicycle" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
