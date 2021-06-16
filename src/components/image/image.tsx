import React, { useState, useEffect, useRef, FC, SetStateAction, Dispatch, HTMLAttributes, MutableRefObject, memo, useCallback } from "react";
import { Loader } from "../loader/loader";
import style from "./image.module.scss";

type sizeType = { w: number, h: number }
export interface propsImage extends HTMLAttributes<HTMLDivElement> {
    src: string,
    fallback?: JSX.Element | FC | string,
    size?: sizeType | string,
    animated?: boolean,
    show?: Dispatch<SetStateAction<boolean>>,
    message?: string
    ref?: MutableRefObject<null>
}

const ImageInner: FC<propsImage> = ({ src, size = { w: 200, h: 200 }, animated, message }: propsImage) => {

    if (size && typeof size === "string") size = { w: +size, h: +size };

    const [loaded, setLoaded] = useState(false);
    const [classList, setClassList] = useState([style.image]);

    const ref = useRef(null);

    //устанавливает флаг loaded в true при загрузке изображения
    const onLoad = useCallback((src: string) => () => {
        // console.log(src, 'загружен');
        setLoaded(true);
    }, []);
    //выключаем флаг loaded с момента получения нового src до момента полной загрузки изображения
    useEffect(() => {
        setLoaded(false);
    }, [src]);

    const random = (min: number, max: number) => {
        return Math.round(Math.random() * (max - min) * 1000 + min * 1000);
    };

    useEffect(() => {
        // animate(clicked);
        let interval: any = null;
        if (animated) {
            const first = [style.image, style.other];
            const second = [style.image];
            interval = setInterval(
                () =>
                    setClassList(state => {
                        if (state.includes(style.other)) {
                            return second;
                        } else return first;
                    }),
                random(1, 5),
            );
        }
        return () => clearInterval(interval);
    }, [animated]);

    return (
        <>
            <div style={loaded ? { display: "none" } : { display: "block" }}>
                <Loader />
            </div>
            <img
                style={loaded ? { display: "block" } : { display: "none" }}
                className={animated ? classList.join(" ") : ""}
                ref={ref}
                onLoad={onLoad(src)}
                src={size ? `${src}=w${(size as sizeType).w}-h${(size as sizeType).h}` : src}
                alt="Фото"></img>
        </>
    );
};

export const Image = memo(ImageInner)