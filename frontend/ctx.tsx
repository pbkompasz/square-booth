import React from "react";
import { useStorageState } from "./components/useStorageState";

const AuthContext = React.createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
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
        signIn: () => {
          // Perform sign-in logic here
          setSession("xxx");
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
  id: string;
  name: string;
  inventory: Item[];
  pickUps: PickUp[];
  deliveries: Delivery[];
};

const StoreContext = React.createContext<{
  fetchStore: (storeId: string) => void;
  fetchInventory: (storeId: string) => void;
  fetchPickUps: (storeId: string, userId: string) => void;
  fetchDeliveries: (storeId: string, userId: string) => void;
  id?: string | null;
  name?: string | null;
  inventory?: Item[];
  pickUps?: PickUp[];
  deliveries?: Delivery[];
}>({
  fetchStore: (storeId: string) => null,
  fetchInventory: (storeId: string) => null,
  fetchPickUps: (storeId: string, userId: string) => null,
  fetchDeliveries: (storeId: string, userId: string) => null,
  id: null,
  name: null,
  inventory: [],
  pickUps: [],
  deliveries: [],
});

export function useStore() {
  const value = React.useContext(StoreContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function StoreProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setStore] = useStorageState("session");

  return (
    <StoreContext.Provider
      value={{
        fetchStore: (storeId) => {
          // Perform sign-in logic here
          setSession("xxx");
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
}

