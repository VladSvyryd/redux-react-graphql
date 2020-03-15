import { useSelector, TypedUseSelectorHook } from "react-redux";
import { Counter } from "./types";

export const useReduxSelector: TypedUseSelectorHook<Counter> = useSelector;
