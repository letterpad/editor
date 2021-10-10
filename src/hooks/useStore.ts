import { useContext } from "react";
import { StoreContext } from "../store";

export const useStoreContext = () => useContext(StoreContext);
