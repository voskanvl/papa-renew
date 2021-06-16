import { memo, useContext, useEffect, useRef } from "react";
import { Ru, Eng } from "./translate"
import papa1 from "../assets/papa1.jpg"
import Contacts from "./contacts/contacts"
import { LanguageContext } from "../data/languageContext";
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export default memo(() => {
    const { currentLanguage } = useContext(LanguageContext)
    const about = useRef(null)
    useEffect(() => {
        gsap.to(about.current, {
            yPercent: 0,
            // scale: 0.8,
            scrollTrigger: {
                trigger: "#about",
                // start: "top top",
                // end: "bottom top",
                pin: true,
                // scrub: 1,
                pinSpacing: false,
            }
        })
    })
    return <div className="about" ref={about} id="about">
        <img src={papa1} alt="papa1" />
        {currentLanguage === 'ru' ? Ru : Eng}
        <Contacts />
    </div>
})