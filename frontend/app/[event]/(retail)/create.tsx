import Layout from "@/components/Layout";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Button,
} from "react-native";
import { useRouter } from "expo-router";
import QRCode from "react-native-qrcode-svg";

const Create = () => {
  const handleTouch = (x: number, y: number) => {
    setBooth([x, y]);
    setSelected(true);
  };

  const router = useRouter();

  const [booth, setBooth] = useState<[number, number]>([-1, -1]);
  const [selected, setSelected] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [globalLoyaltyProgram, setGlobalLoyaltyProgram] = useState(false);
  const [visitLoyaltyProgram, setVisitLoyaltyProgram] = useState(false);
  const [visitStreak, setVisitStreak] = useState(3);
  const [specialityLoyaltyProgram, setSpecialityLoyaltyProgram] =
    useState(false);
  const [specialityItem, setSpecialityItem] = useState("");
  const url = `booth.com/${name.toLowerCase()}`;

  const createBooth = () => {
    router.push("/asd");
  };

  const [items, setItems] = useState<{}[]>([{}]);
  const addItem = () => {
    setItems((prevState) => [...prevState, {}]);
  };

  const printQr = () => {};

  return (
    <ScrollView
      style={{
        padding: 16,
        flexDirection: "column",
        minHeight: "100%",
      }}
      contentContainerStyle={{
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text style={styles.heading}>Shop Name</Text>
        <TextInput
          style={{ padding: 10, marginRight: 10, borderWidth: 1 }}
          placeholder="Name e.g. Coffee Shop"
          onChangeText={(newName) => setName(newName)}
          defaultValue={name}
        ></TextInput>
        <Text style={styles.heading}>Shop Description</Text>
        <TextInput
          style={{
            padding: 10,
            marginRight: 10,
            minHeight: 80,
            borderWidth: 1,
          }}
          placeholder="Description"
          onChangeText={(desc) => setDescription(desc)}
          defaultValue={description}
        ></TextInput>
        <Text style={styles.heading}>Location</Text>
        <View style={{ flexDirection: "row" }}>
          <Layout onTouch={handleTouch} highlight={booth} />
          <Text
            style={{ fontSize: 16, paddingHorizontal: 16, paddingVertical: 4 }}
          >
            {selected
              ? `Selected booth, row: ${booth[1] + 1}, column: ${booth[0] + 1}`
              : "Select a booth"}
          </Text>
        </View>
        <Text style={styles.heading}>Loyalty Program</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              style={styles.checkbox}
              value={globalLoyaltyProgram}
              onValueChange={setGlobalLoyaltyProgram}
            />
            <Text style={styles.paragraph}>
              Participate in event wide Loyalty Program
            </Text>
          </View>
          <View style={styles.explanation}>
            <Text>
              This includes the following requirements:
              <br />
              - Have a free sample item
              <br />- Have an item that is redeemable with Loyalty Points
            </Text>
            <Text>
              In return your booth will be featured on the event's
              recommendation page
            </Text>
          </View>
        </View>
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox
                style={styles.checkbox}
                value={visitLoyaltyProgram}
                onValueChange={setVisitLoyaltyProgram}
              />
              <Text style={styles.paragraph}>Visit based Loyalty Program</Text>
              <View style={{ marginLeft: 10 }}>
                <Text>Reset Amount</Text>
                <TextInput
                  style={{ padding: 10, marginTop: 5, borderWidth: 1 }}
                  placeholder="Visit Streak"
                  onChangeText={(desc) => setVisitStreak(desc)}
                  defaultValue={visitStreak}
                ></TextInput>
              </View>
            </View>
            <View style={styles.explanation}>
              <Text>
                Visit consists of a person scanning your QR code
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Checkbox
                style={styles.checkbox}
                value={visitLoyaltyProgram}
                onValueChange={setVisitLoyaltyProgram}
              />
              <Text style={styles.paragraph}>Item based Loyalty Program</Text>
              <View style={{ marginLeft: 10 }}>
                <Text>Select Item</Text>
                <TextInput
                  style={{ padding: 10, marginTop: 5, borderWidth: 1 }}
                  placeholder="Visit Streak"
                  onChangeText={(desc) => setSpecialityItem(desc)}
                  defaultValue={specialityItem}
                ></TextInput>
              </View>
            </View>
            <View style={styles.explanation}>
              <Text>
                This item will be featured on the event's recommendation page
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.heading}>Items</Text>
        <View>
          {items.map((_, index) => (
            <View style={{ flexDirection: "row" }} key={index}>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    paddingTop: 4,
                  }}
                >
                  Name
                </Text>
                <TextInput
                  style={{ padding: 10, marginRight: 10, borderWidth: 1 }}
                  placeholder="Name"
                  onChangeText={(desc) => setDescription(desc)}
                  defaultValue={description}
                ></TextInput>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    paddingTop: 4,
                  }}
                >
                  Description
                </Text>
                <TextInput
                  style={{ padding: 10, marginRight: 10, borderWidth: 1 }}
                  placeholder="Name"
                  onChangeText={(desc) => setDescription(desc)}
                  defaultValue={description}
                ></TextInput>
              </View>

              <View>
                <Text
                  style={{
                    fontSize: 16,
                    paddingTop: 4,
                  }}
                >
                  Price
                </Text>
                <TextInput
                  style={{ padding: 10, marginRight: 10, borderWidth: 1 }}
                  placeholder="Name"
                  onChangeText={(desc) => setDescription(desc)}
                  defaultValue={description}
                ></TextInput>
              </View>
            </View>
          ))}
          <Pressable
            style={{ width: 100, marginTop: 5, alignSelf: "flex-start" }}
          >
            <Button
              onPress={addItem}
              title="Add Item"
              accessibilityLabel="Create booth"
            />
          </Pressable>
        </View>
        <Text style={styles.heading}>Accessibility</Text>
        <Text>Personalized url: {url}</Text>
        <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
          <Text>QR code:</Text>
          <QRCode value={url} />
          <Pressable>
            <Button
              onPress={printQr}
              title="Print"
              accessibilityLabel="Print"
            />
          </Pressable>
        </View>
      </View>
      <Pressable style={{ width: 100, alignSelf: "flex-end" }}>
        <Button
          onPress={createBooth}
          title="Create"
          accessibilityLabel="Create booth"
        />
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    paddingVertical: 5,
  },
  checkbox: {
    margin: 8,
  },
  paragraph: {
    fontSize: 15,
  },
  explanation: {
    margin: 5,
    padding: 10,
    borderWidth: 2,
    backgroundColor: "#dbdbd9",
    borderRadius: 5,
  },
});

export default Create;
