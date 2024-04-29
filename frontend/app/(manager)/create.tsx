import Checkbox from "expo-checkbox";
import { View, StyleSheet, Text } from "react-native";
import Layout from "@/components/Layout";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const Create = () => {
  const handleTouch = (x: number, y: number) => {
    console.log(x, y);
  };

  const [isRecurring, setIsRecurring] = useState(false);

  const [timelines, setTimelines] = useState([
    [true, 9, 17],
    [true, 9, 17],
    [true, 9, 17],
    [true, 9, 17],
    [true, 9, 17],
    [true, 9, 17],
    [false, 9, 17],
  ]);
  const hours = Array.from({ length: 16 }, (_, i) => i + 8);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const updateTimeline = (value: number, index: number, which: number) => {
    setTimelines((prev) => {
      const replac = [...prev]; // Create a shallow copy of the array
      replac[index] = [...replac[index]]; // Create a shallow copy of the nested array
      replac[index][which] = +value; // Update the specific value
      return replac;
    });
  };

  return (
    <>
      <View
        style={[
          {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "row",
            gap: 32,
          },
        ]}
      >
        <Layout onTouch={handleTouch} highlight={[2, 3]} />
        <Layout type="stadium" onTouch={handleTouch} highlight={[2, 3]} />
      </View>
      <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={isRecurring}
          onValueChange={setIsRecurring}
        />
        <Text style={styles.paragraph}>Recurring event</Text>
      </View>
      {days.map((day, index) => (
        <View style={styles.days} key={day}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              style={styles.checkbox}
              value={!!timelines[index][0]}
              onValueChange={setIsRecurring}
            />
            <Text style={styles.paragraph}>{day}</Text>
          </View>
          <View>
            <Text style={styles.paragraph}>Opening hours</Text>
            <Picker
              selectedValue={timelines[index][1]}
              onValueChange={(itemValue) => updateTimeline(itemValue, index, 1)}
            >
              {hours.map((hour) => (
                <Picker.Item key={hour} label={String(hour)} value={hour} />
              ))}
            </Picker>
          </View>
          <View>
            <Text style={styles.paragraph}>Closing hours</Text>
            <Picker
              selectedValue={timelines[index][2]}
              onValueChange={(itemValue) => updateTimeline(itemValue, index, 2)}
            >
              {hours.map((hour) => (
                <Picker.Item key={hour} label={String(hour)} value={hour} />
              ))}
            </Picker>
          </View>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    margin: 8,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  days: {
    flexDirection: "row",
    gap: 24,
    width: 450,
    justifyContent: "space-between",
  },
});

export default Create;
