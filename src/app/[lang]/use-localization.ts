import { useContext } from "react";
import { DictionaryContext } from "./localization.component";

export const useLocalization = () => useContext(DictionaryContext);