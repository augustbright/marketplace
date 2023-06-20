'use client';

import { TDictionary } from "@/get-dictionary";
import { createContext } from "react";

type TProps = {
    children: React.ReactNode;
    dictionary: TDictionary;
};

export const DictionaryContext = createContext<TDictionary>({} as any);

export const Localization = ({ children, dictionary }: TProps) => {
    return (
        <DictionaryContext.Provider value={dictionary}>
            {children}
        </DictionaryContext.Provider>
    );
};