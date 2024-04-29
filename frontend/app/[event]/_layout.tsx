import {
  Link,
  Stack,
  useLocalSearchParams,
  useGlobalSearchParams,
} from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StoreContext, StoreProvider } from "@/ctx";
import { useSession } from "@/ctx";
import { Pressable, Text, View } from "react-native";
import { useContext, useEffect } from "react";

export default function Layout() {
  const { session } = useSession();
  const global = useGlobalSearchParams();
  const eventName =
    global.event === "farmers-market"
      ? "Farmer's Market"
      : "Street Food Festival";
  const { store, fetchStore, fetchInventory } = useContext(StoreContext);

  useEffect(() => {
    fetchStore(String(global.store));
    fetchInventory(String(global.store));
  }, []);

  return (
    <StoreProvider>
      <Stack
        screenOptions={{
          title: "my-title",
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
              }}
            >
              <Pressable onPress={() => console.log("asd")}>
                <FontAwesome
                  name="trophy"
                  size={25}
                  style={{ marginRight: 15, opacity: 1 }}
                />
              </Pressable>
              {session === "manager" ? (
                <Pressable>
                  <Link href={`/${eventName}/settings`}>
                    <Text>Edit event</Text>
                  </Link>
                </Pressable>
              ) : null}
              {session === "retail" ? (
                <Pressable>
                  <Link href={`/${eventName}/create`}>
                    <Text>Create a store</Text>
                  </Link>
                </Pressable>
              ) : null}
            </View>
          ),
        }}
      >
        <Stack.Screen
          name="(retail)/create"
          options={{
            headerTitle: "Create a store",
            headerRight: () => <></>,
          }}
        />
        <Stack.Screen
          name="[store]"
          options={{
            headerTitle: eventName,
            headerRight: () => <></>,
          }}
        />
      </Stack>
    </StoreProvider>
  );
}
