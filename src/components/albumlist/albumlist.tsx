import React, { Dispatch, FC, memo, SetStateAction, useCallback, useContext } from "react";
import { Context, DataContext } from "../../data/context"
import { LanguageContext } from "../../data/languageContext";
import { Image } from "../image/image"
import { Link } from "react-router-dom"


interface IPropsImages extends Partial<FC> {
    setmodal: Dispatch<SetStateAction<boolean>>
}

const AlbumList: FC<IPropsImages> = ({ setmodal }): JSX.Element => {
    const context = useContext(Context)
    const { currentLanguage } = useContext(LanguageContext)

    const images = useCallback((e: DataContext, el: number) => {
        const setModalTrue = () => setmodal(true)
        return (<div className="images" key={"el" + el}>
            <div className="title">{currentLanguage === 'ru' ? e.title : e.eng}</div>
            <Link to={`/${el}`}
                key={`link`}
                onClick={setModalTrue}
            >
                <Image src={e.images[0]} />
            </Link>
        </div>)
    }, [currentLanguage, setmodal])

    return (<div className="wrap">
        <div className="container" >
            {context.map((e, el) => images(e, el))}
        </div>
    </div>)
}

export default memo(AlbumList)