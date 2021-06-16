import { createContext } from "react";

export const languages = ["ru", "eng"];
export const initLanguageValue = {
    currentLanguage: "ru",
    changeLanguage: (lang: string) => {},
};
export interface ILanguage {
    currentLanguage: string;
    changeLanguage(lang: string): void;
}
export const LanguageContext = createContext<ILanguage>(initLanguageValue);
