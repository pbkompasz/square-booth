import { StyleSheet, Image, Pressable, Button, ScrollView } from "react-native";

import { Text, View } from "@/components/Themed";
import { CartContext, StoreContext } from "@/ctx";
import { useContext, useEffect } from "react";
import { useGlobalSearchParams } from "expo-router";

// TODO Get store id
export default function TabOneScreen() {
  const global = useGlobalSearchParams();
  const { store, fetchStore, fetchInventory } = useContext(StoreContext);
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    fetchStore(String(global.store));
  }, []);

  const items = [
    {
      name: "Espresso",
      price: 2,
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpmgA77GiSunAay3TYWgWgwvA3gnsDaT29FiWjo90iOw&s",
    },
    {
      name: "Latte Macchiato",
      price: 3,
      uri: "https://truffle-assets.tastemadecontent.net/pxqrocxwsjcc_DZVnVhHujmemKsQAmMaC8_latmac2.png",
    },
    {
      name: "Caffè americano",
      price: 1.5,
      uri: "https://www.starbucksathome.com/ro/sites/default/files/2021-03/3-CaffeAmericano_LongShadow_Cream_1.png",
    },
    {
      name: "Caffè mocha",
      price: 4,
      uri: "https://athome.starbucks.com/sites/default/files/2021-06/1_CAH_CaffeMocha_Hdr_2880x16602.jpg",
      featured: true,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{store?.name}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.items}>
        {items.map((item, index) => (
          <View style={styles.item} key={index}>
            <Image
              style={styles.banner}
              source={{
                uri: item.uri,
              }}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 20 }}>{item.name}</Text>
              <View
                style={{
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Pressable
                  style={{ width: 150, marginTop: 5, alignSelf: "flex-start" }}
                >
                  <Button
                    onPress={() =>
                      addItem(
                        item.name,
                        item.name,
                        item.price,
                        "farmers-market",
                        "coffee-shop"
                      )
                    }
                    title="Add to Cart"
                    accessibilityLabel="Add to Cart"
                  />
                </Pressable>
                <Text style={{ fontSize: 18 }}>${item.price}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
  },
  items: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    flexWrap: "wrap",
    gap: 5,
  },
  item: {
    padding: 10,
    borderWidth: 1,
    width: "100%",
    maxWidth: 550,
    height: 280,
  },
  banner: {
    width: "100%",
    height: 220,
  },
});
