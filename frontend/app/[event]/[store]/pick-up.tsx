import { Button, Pressable, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

export default function TabTwoScreen() {
  const createPickUp = () => {
    console.log("do it");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your scheduled pick-ups</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Pressable>
        <Button
          onPress={createPickUp}
          title="Schedule a pick-up"
          accessibilityLabel="Schedule a pick-up"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
