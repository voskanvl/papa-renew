import React, { Dispatch, FC, memo, SetStateAction, useCallback, useEffect, useRef } from "react";
import "./modal.module.scss";
import { gsap } from "gsap";
import { Switch, Route, useHistory } from "react-router-dom";

import { Album } from "./album"


type propsModal = {
    show: boolean;
    setmodal: Dispatch<SetStateAction<boolean>>;
}
export interface ParamTypes {
    f: string,
    s?: string
}


const ModalInner: FC<propsModal> = ({ show, setmodal }): JSX.Element => {
    const ref = useRef(null);

    // const [x, setX] = useState<number>(0)
    // const [params, setParams] = useState<{ f: number, s: number }>({ f: 0, s: 0 })
    const history = useHistory();
    useEffect(() => {
        if (show) {
            gsap.set(ref.current, { display: "flex", opacity: 0 });
            gsap.fromTo(
                ref.current,
                {
                    opacity: 0,
                },
                {
                    duration: 3,
                    opacity: 1,
                    clearProps: true
                },
            );
        }
    }, [show]);



    const close = useCallback(() => {
        gsap.fromTo(
            ref.current,
            { opacity: 1 },
            {
                opacity: 0,
                duration: 2,
                display: "none",

            },
        ).then(() => {
            setmodal(false)
            history.push("")
        });
    }, [setmodal, history])



    return (
        <div ref={ref}>
            <Switch>
                <Route path="/:f/:s">
                    <Album onClose={close} />
                </Route>
                <Route path="/:f">
                    <Album onClose={close} />
                </Route>
            </Switch>
        </div>

    );
};

export const Modal = memo(ModalInner)