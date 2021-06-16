import { FC, StrictMode, useState } from "react";
import { render } from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Context } from "./data/context";
import { LanguageContext, languages } from "./data/languageContext";
import Data from "./data/1.json";

const ContextLanguage: FC = ({ children }): JSX.Element => {
    const [language, setLanguage] = useState('ru')
    return (<LanguageContext.Provider value={{
        currentLanguage: language,
        changeLanguage: (lang) => {
            if (languages.includes(lang))
                setLanguage(lang)
        }
    }}>{children}</LanguageContext.Provider>)
}


render(<StrictMode>
    <Context.Provider value={Data}>
        <ContextLanguage>
            <App />
        </ContextLanguage>
    </Context.Provider>
</StrictMode>,
    document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
