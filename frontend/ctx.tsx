import React, { useState } from "react";
import { useStorageState } from "./components/useStorageState";

const AuthContext = React.createContext<{
  signIn: (role?: "user" | "retail" | "manager" | null) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: (role = null) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: (role = null) => {
          // Perform sign-in logic here
          setSession(role);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

type Item = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  storeId?: string;
  eventId?: string;
};

type PickUp = {
  itemId: string;
  quantity: number;
  userId: string;
};

type Delivery = {
  itemId: string;
  to: string;
  quantity: number;
  userId: string;
};

type Store = {
  id?: string | null;
  name?: string | null;
  inventory: Item[];
  pickUps: PickUp[];
  deliveries: Delivery[];
};

export const StoreContext = React.createContext<{
  fetchStore: (storeId: string) => void;
  fetchInventory: (storeId: string) => void;
  fetchPickUps: (storeId: string, userId: string) => void;
  fetchDeliveries: (storeId: string, userId: string) => void;
  store?: Store;
}>({
  fetchStore: (storeId: string) => null,
  fetchInventory: (storeId: string) => null,
  fetchPickUps: (storeId: string, userId: string) => null,
  fetchDeliveries: (storeId: string, userId: string) => null,
  store: {
    id: null,
    name: null,
    inventory: [],
    pickUps: [],
    deliveries: [],
  },
});

const NAMES = {
  "coffee-shop": "Coffee Shop",
  vegetables: "Street Food Festival",
};

export function StoreProvider(props: React.PropsWithChildren) {
  const [store, setStore] = useState<Store>({
    id: "test",
    name: "test",
    inventory: [],
    pickUps: [],
    deliveries: [],
  });

  return (
    <StoreContext.Provider
      value={{
        fetchStore: (storeId) => {
          console.log(storeId);
          // Perform sign-in logic here
          setStore((prevState) => {
            console.log(prevState);
            return {
              ...prevState,
              id: storeId,
              name: NAMES[storeId] ?? "name",
            };
          });

          // setStore();
        },
        fetchInventory: (storeId) => {
          // Perform sign-in logic here
          console.log("inventory");
        },
        fetchPickUps: (storeId) => {
          // Perform sign-in logic here
          console.log("pick-ups");
        },
        fetchDeliveries: (storeId) => {
          // Perform sign-in logic here
          console.log("deliveries");
        },
        store,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
}

export const CartContext = React.createContext<{
  addItem: (
    itemId: string,
    itemName: string,
    price: number,
    eventId: string,
    storeId: string
  ) => void;
  makePayment: () => void;
  cart?: Item[];
  total: number;
  paymentStatus: string;
}>({
  addItem: (
    itemId: string,
    itemName: string,
    price: number,
    eventId: string,
    storeId: string
  ) => null,
  makePayment: () => null,
  cart: [],
  total: 0,
  paymentStatus: "inactive",
});

export function CartProvider(props: React.PropsWithChildren) {
  const [cart, setCart] = useState<Item[]>([
    {
      id: "pizza-slice",
      name: "Pizza slice",
      price: 3,
      quantity: 1,
      storeId: "Pizza By Alfredo",
      eventId: "Farmer's Market",
    },
  ]);
  const [total, setTotal] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("inactive");

  return (
    <CartContext.Provider
      value={{
        addItem: (
          itemId: string,
          itemName: string,
          price: number,
          eventId: string,
          storeId: string
        ) => {
          console.log("here");
          setCart((prev) => [
            ...prev,
            {
              id: itemId,
              name: itemName,
              price: price,
              quantity: 1,
              storeId,
              eventId,
            },
          ]);
        },
        makePayment: () => {},
        cart,
        total,
        paymentStatus,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
