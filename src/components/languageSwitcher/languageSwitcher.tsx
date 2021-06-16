import style from "./languageSwitcher.module.scss"
import { languages, LanguageContext } from "../../data/languageContext"
import { FC, useContext, MouseEvent, useCallback } from "react"


export const LanguageSwitcher: FC = (): JSX.Element => {

    const { currentLanguage, changeLanguage } = useContext(LanguageContext)

    const handlerClick = useCallback((lang: string) => (event: MouseEvent<HTMLDivElement>) => {
        changeLanguage(lang)
    }, [changeLanguage])

    return <div className={style.switcher}>
        {
            languages.map(lang => (
                <div key={lang} onClick={handlerClick(lang)} className={currentLanguage === lang ? style.current : undefined}>{lang}</div>
            ))
        }
    </div>
}