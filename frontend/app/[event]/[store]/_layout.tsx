import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Link,
  Tabs,
  useLocalSearchParams,
} from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const local = useLocalSearchParams();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerTitle: String(local.store),
        headerRight: () => <>Header Right</>,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shop",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shopping-bag" color={color} />
          ),
          headerRight: () => (
            <>
              <Link href="/main" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              <Link href="/checkout" asChild>
                <Pressable>
                  {() => (
                    <FontAwesome
                      name="shopping-cart"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="qrcode"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </>
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
