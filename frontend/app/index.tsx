import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  Alert,
  StyleSheet,
  Pressable,
} from "react-native";
import { Link } from 'expo-router';

type Event = {
  name: string,
  id: string,
}

export default function Index() {
  const events = [{
    name: 'Local Farmer\'s Market',
    id: 'asfdas',
  }] as Event[];
  const [prompt, setPrompt] = useState("");
  const [resultsModalVisible, setResultsModalVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (key: string) => {
    // TODO
    // setSearchResults(await fetchSearchResults(prompt));
    if (key !== "Enter") return;
    setSearchResults([]);
    setResultsModalVisible(true);
  };

  return (
    <View style={{ padding: 10 }}>
      <Text>
        Events near me:
        {events.length}
      </Text>
      {events.map(event => (
        <Link key={event.id} href={`/${event.id}`}>{event.name}</Link>
      ))}
      <Text>Search for a particular store or item</Text>
      <TextInput
        style={{ padding: 10, borderWidth: 1 }}
        placeholder="Type"
        onChangeText={(newPrompt) => setPrompt(newPrompt)}
        onKeyPress={(e) => handleSearch(e.key as string)}
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
            <Text>Results: {searchResults.length}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setResultsModalVisible(!resultsModalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
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
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
