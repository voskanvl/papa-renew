import { Context } from "../../data/context";
import { Image } from "../image/image"
import { Controls } from "./controls"
import style from "./modal.module.scss";
import { Link, useParams } from "react-router-dom";
import { memo, MutableRefObject, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { ParamTypes } from "./modal"
import { Loader } from "../loader/loader"
import { gsap } from "gsap"


const AlbumInneer = ({ onClose }: { onClose: () => void }): JSX.Element => {
    const { f, s } = useParams<ParamTypes>()
    const context = useContext(Context)
    const ref = useRef(null)
    const ref1 = useRef(null)
    const size = (): { w: number, h: number } => {
        if (ref && ref.current) {
            const res = {
                w: parseInt(window.getComputedStyle((ref as unknown as MutableRefObject<HTMLDivElement>).current).width),
                h: parseInt(window.getComputedStyle((ref as unknown as MutableRefObject<HTMLDivElement>).current).height)
            }
            return res
        } return {
            w: (window.innerWidth) | 0,
            h: (window.innerHeight) | 0
            // w: (window.innerWidth * 0.9) | 0,
            // h: (window.innerHeight * 0.9) | 0
        }

    }


    useEffect(() => {
        if (ref1 && ref1.current) {
            console.log('ref1', ref1.current)
            const source = Array.from((ref.current as unknown as HTMLDivElement).children).filter(e => e.classList.length === 2)[0]
            const halfInnerSize = {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            }
            const computedPlace = (x: 'x' | 'y'): number => {
                //получаем значение координаты со смещением минус половина размера экрана
                return source.getBoundingClientRect()[x] - halfInnerSize[x]
            }
            const x = computedPlace('x')
            const y = computedPlace('y')
            console.log('x', x);
            gsap.fromTo(ref1.current,
                {
                    opacity: 0,
                    scale: 0,
                    x,
                    y
                },
                {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'power1.in',
                    clearProps: true
                }
            ).then(() => console.log('done'))
        }
    }, [s])

    const link = useCallback((el: string, idx: number) =>
        <Link to={`/${f}/${idx}`} key={`link${f}-${idx}`} className={[style.link, idx == (s ?? -1) ? style.current : ""].join(" ")}>
            <Image src={el} fallback={<Loader />} />
        </Link>, [f, s])

    return (
        <Controls params={{ f, s }} onClose={onClose}>
            <>
                <div ref={ref} className={style.inner} style={{ filter: s ? 'brightness(0.3)' : 'none', transition: '1s' }}>
                    {
                        context[+f].images.map((el: string, idx: number) => link(el, idx)
                            //eslint-disable-next-line
                        )
                    }

                </div>
                {s ? <div ref={ref1} className={style.big}><Image
                    src={context[+f].images[+s]} size={{ w: size().w, h: size().h }} fallback={<Loader />} />
                </div> : ''}
            </>
        </Controls>
    )
}

export const Album = memo(AlbumInneer)