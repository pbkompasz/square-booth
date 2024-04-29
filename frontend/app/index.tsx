import {
  View,
  Text,
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Image,
} from "react-native";
import { Link } from "expo-router";
import Camera from "@/components/Camera";

type Event = {
  name: string;
  id: string;
};

const events = [
  {
    title: "Current Events",
    data: [
      {
        id: "farmers-market",
        name: "Farmer's Market",
        description: "Local farmer's market",
        bannerUri:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ3ZVbwUBaf4nq5bqUuETbSWiZXcd4Flyx0pBIRMnaNA&s",
        timeline: [
          [0, 8, 17],
          [1, 8, 17],
          [2, 8, 17],
          [3, 8, 17],
          [4, 8, 17],
          [5, 8, 17],
          [6, 10, 16],
        ],
        duration: null,
      },
    ],
  },
  {
    title: "Upcomming",
    data: [
      {
        id: "street-food-festival",
        name: "Street Food Festival",
        description: "Annual Street Food Festival",
        timeline: [null, null, null, null, null, [5, 10, 22], [6, 10, 22]],
        bannerUri:
          "https://streetfoodfestival.ro/wp-content/uploads/2024/04/street-food-festival-cover-fb.jpg",
        duration: {
          start: "May 4",
          end: "May 5",
        },
      },
    ],
  },
];
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export default function Index() {
  return (
    <View>
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={events}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({ item }) => (
            <View style={styles.item} onPointerDown={() => console.log("asd")}>
              <Image
                style={styles.banner}
                source={{
                  uri: item.bannerUri,
                }}
              />
              <Link href={`/${item.id}`}>
                <Text style={styles.title}>{item.name}</Text>
              </Link>
              <Text style={styles.description}>{item.description}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    borderRightWidth: 1,
                  }}
                >
                  {Array.from({ length: 7 }).map((_, index) => (
                    <View
                      style={{
                        borderWidth: 1,
                        borderRightWidth: 0,
                        paddingVertical: 2,
                        paddingHorizontal: 10,
                        width: 32,
                        backgroundColor: item.timeline[index]
                          ? "#34d399"
                          : "white",
                      }}
                    >
                      <Text>{DAYS[index]}</Text>
                    </View>
                  ))}
                </View>
                {item.duration ? (
                  <Text>
                    {item.duration?.start} - {item.duration?.end}
                  </Text>
                ) : null}
              </View>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
    backgroundColor: "white",
  },
  item: {
    borderWidth: 1,
    paddingHorizontal: 10,
    cursor: "pointer",
  },
  banner: {
    minWidth: "100%",
    height: 150,
    marginTop: 5,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
    textDecorationLine: "underline",
    paddingVertical: 5,
  },
  title: {
    fontSize: 24,
  },
});
