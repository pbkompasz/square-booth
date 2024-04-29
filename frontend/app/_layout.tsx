import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import { SessionProvider } from "../ctx";
import { CartProvider } from "../ctx";
import {
  Modal,
  Pressable,
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const [prompt, setPrompt] = useState("");
  const [resultsModalVisible, setResultsModalVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async () => {
    // TODO
    // setSearchResults(await fetchSearchResults(prompt));
    setSearchResults([]);
    setResultsModalVisible(true);
  };

  return (
    <CartProvider>
      <SessionProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerBackVisible: false,
                headerTitle: "Home",
                headerRight: (props) => (
                  <View
                    style={{
                      flexDirection: "row-reverse",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Pressable>
                      <FontAwesome
                        name="qrcode"
                        size={25}
                        color={Colors[colorScheme ?? "light"].text}
                        style={{ marginRight: 15 }}
                      />
                    </Pressable>
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
                    <TextInput
                      style={{ padding: 10, marginRight: 10, borderWidth: 1 }}
                      placeholder="Search for a store or an item"
                      onChangeText={(newPrompt) => setPrompt(newPrompt)}
                      onSubmitEditing={() => handleSearch()}
                      defaultValue={prompt}
                    ></TextInput>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={resultsModalVisible}
                      onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setResultsModalVisible(!resultsModalVisible);
                      }}
                    >
                      <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <Text>Results: {searchResults.length}</Text>
                            <FontAwesome
                              onPress={() =>
                                setResultsModalVisible(!resultsModalVisible)
                              }
                              name="plus"
                              size={25}
                              color={Colors[colorScheme ?? "light"].text}
                              style={{ marginRight: 15, opacity: 1 }}
                            />
                          </View>
                        </View>
                      </View>
                    </Modal>
                  </View>
                ),
              }}
            />
            <Stack.Screen
              name="(aux)"
              options={{ headerShown: false, headerBackVisible: false }}
            />
            <Stack.Screen name="[event]" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </SessionProvider>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: 300,
    height: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
