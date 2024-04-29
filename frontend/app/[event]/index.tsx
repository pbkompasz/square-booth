import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 24 }}>Discover shops</Text>
      <Link href="/farmers-market/coffee-shop">Coffee Shop</Link>
    </View>
  );
}
