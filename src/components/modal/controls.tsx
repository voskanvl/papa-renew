import React, {
    HTMLAttributes,
    useContext,
    TouchEvent,
    KeyboardEvent,
    useState,
    useRef,
    useCallback,
} from "react"
import { Link, useHistory } from "react-router-dom"
import { Context } from "../../data/context";
import style from "./modal.module.scss"
import { ParamTypes } from "./modal"
import { gsap } from "gsap"

interface IPropsControls extends HTMLAttributes<HTMLDivElement> {
    children: JSX.Element,
    params: ParamTypes,
    onClose: () => void
}

type ControlsState = {
    x: number, time: number, f?: string | undefined, s?: string | undefined
}

export const Controls = ({ children, params: { f, s }, onClose }: IPropsControls) => {

    const TIME_SWYPE = 200
    const DISTANCE_SWYPE = 150

    const context = useContext(Context)
    const [x, setX] = useState<ControlsState>({ x: 0, time: 0, f, s })
    const to = (delta: 1 | -1) => s ? `/${f}/${+s + delta}` : `/${+f + delta}`;
    const toUp = to(1)
    const toDown = to(-1);
    const current = s ? +s : +f
    const max = s ? context[+f].images.length - 1 : context.length - 1
    const history = useHistory();
    const inner_container = useRef(null)

    const close = useCallback(() => {
        if (s) return history.push(`/${f}`)
        onClose()
    }, [f, history, onClose, s])

    const setNextX = async (nextX: -1 | 1, lastX: number,) => {
        if (nextX) history.push(to(nextX))
        setX(state => ({ ...state, x: lastX }))
        return true
    }

    const switchState = async (nextX: 1 | -1, lastX: number) => {

        if (s === undefined) {
            await gsap.to(inner_container.current, { xPercent: 100 * nextX })
            await setNextX(nextX, lastX,)
            await gsap.timeline({ duration: 0 })
                .set(inner_container.current, { opacity: 0 })
                .to(inner_container.current, { xPercent: 100 * (-nextX) })
                .to(inner_container.current, { xPercent: 0, opacity: 1, duration: 0.3, clearProps: true })

            return
        }
        setNextX(nextX, lastX)

    }

    const handlerTouchStart = (ev: TouchEvent<HTMLDivElement>): void => {

        // ev.preventDefault()
        setX({ ...x, x: ev.touches[0].clientX, time: Date.now() })
    }
    const handlerTouchMove = (ev: TouchEvent<HTMLDivElement>): void => {
        // ev.preventDefault()
    }
    const handlerTouchEnd = async (ev: TouchEvent<HTMLDivElement>): Promise<void> => {

        const lastX = ev.changedTouches[0].clientX;
        const deltaX = lastX - x.x;
        const nextX = Math.sign(deltaX) as 1 | -1
        const nextTime = new Date(Date.now() - x.time).getMilliseconds();
        if (current + nextX <= max && current + nextX >= 0 && nextTime > TIME_SWYPE && Math.abs(deltaX) > DISTANCE_SWYPE) {
            await switchState(nextX, lastX)
        }
    }

    const handlerKey = ({ code }: KeyboardEvent<HTMLDivElement>) => {
        const center = window.innerWidth / 2
        const increment = ['ArrowRight', 'ArrowDown']
        const decrement = ['ArrowLeft', 'ArrowUp']
        const all = [...increment, ...decrement]
        let nextX: -1 | 1 = 1;
        if (increment.includes(code)) nextX = 1
        if (decrement.includes(code)) nextX = -1

        if (all.includes(code) && current + nextX <= max && current + nextX >= 0) {
            switchState(nextX, center)
        }
    }

    return (
        <div
            // ref={ref}
            className={style.modal}
            onTouchStart={handlerTouchStart}
            onTouchMove={handlerTouchMove}
            onTouchEnd={handlerTouchEnd}
            onKeyDown={handlerKey}
        >
            <div
                className={style.close}
                onClick={close}
            />

            <Link
                // to={`/${f}/${+s - 1}`}
                to={toDown}
                className={style.down}
                style={current === 0 ? { display: "none" } : { display: "block" }}
            />
            <Link
                // to={`/${f}/${+s + 1}`}
                to={toUp}
                className={style.up}
                style={
                    current === max ? { display: "none" } : { display: "block" }
                }
            />

            <div ref={inner_container} className={style.inner_container}>{children}</div>
        </div>
    )
}