import { useContext } from "react";
import { StoreContext } from "@store";

const storeContext = () => useContext(StoreContext);

export const useStoreContext = storeContext;
