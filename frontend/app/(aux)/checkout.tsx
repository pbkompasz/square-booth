import { Text } from "react-native";
import { CartContext } from "@/ctx";
import { useContext } from "react";

const CheckoutPage = () => {
  const { cart } = useContext(CartContext);
  return <Text>{cart?.length}</Text>;
};

export default CheckoutPage;
