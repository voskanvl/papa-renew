import "./App.scss"
import { FC, useCallback, useContext, useEffect, useState } from "react"
import { Modal } from "./components/modal/modal"
import {
    BrowserRouter as Router,
} from "react-router-dom"

import { Context, initValue, DataContext } from "./data/context"
import { LanguageContext, languages } from "./data/languageContext"

import { LanguageSwitcher } from "./components/languageSwitcher/languageSwitcher"
import About from "./components/about"
import AlbumList from "./components/albumlist/albumlist"

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

const ErrorComponent = () => {
    const { currentLanguage } = useContext(LanguageContext)

    return <>
        {
            currentLanguage === 'ru'
                ? <div>Ошибка запроса данных с cервера. Попробуйте обновить страницу...</div>
                : <div>There is error request data from server. Try reload this page...</div>
        }
    </>
}

const App: FC = () => {
    const [showModal, setShowModalInner] = useState(false)
    const [data, setdata] = useState(initValue)
    const [error, setError] = useState(null)
    const setShowModal = useCallback(setShowModalInner, [setShowModalInner])
    useEffect(() => {
        fetch("/1.json")
            .then(r => r.json())
            .then(r => setdata(r as unknown as DataContext[]))
            .catch(error => setError(error))
    }, [])

    const result = (
        <Context.Provider value={data}>
            <ContextLanguage>
                <Router>
                    <About />
                    {error ? <ErrorComponent /> : <AlbumList setmodal={setShowModal} />}
                    <Modal show={showModal} setmodal={setShowModal} />
                    <LanguageSwitcher />
                </Router>
            </ContextLanguage>
        </Context.Provider>

    )
    return result
}
export default App
