import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const Animation = () => {
    const boxRef = useRef();
    useEffect(() => {
        gsap.set(boxRef.current, { transformOrigin: "left top" });
        gsap.to(boxRef.current, {
            scaleY: 0,
            duration: 4,
            ease: "elastic(1,0.3)",
        });
    });
    return (
        <div
            ref={boxRef}
            style={{
                width: "160px",
                height: "160px",
                background: "salmon",
            }}
        />
    );
};
