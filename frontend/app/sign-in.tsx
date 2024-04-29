import { router } from "expo-router";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { useSession } from "../ctx";
import { useState } from "react";

export default function SignIn() {
  const [role, setRole] = useState<"user" | "retail" | "manager">("user");
  const { signIn, session, } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          signIn(role);
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace("/");
        }}
      >
        Sign In
      </Text>
      <Picker
        selectedValue={role}
        onValueChange={(itemValue) => setRole(itemValue)}
      >
        <Picker.Item label="User" value="user" />
        <Picker.Item label="Retailer" value="retail" />
        <Picker.Item label="Event Manager" value="manager" />
      </Picker>
    </View>
  );
}
