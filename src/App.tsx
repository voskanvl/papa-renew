import "./App.scss";
import { FC, useCallback, useState } from "react";
import { Modal } from "./components/modal/modal";
import {
    BrowserRouter as Router,
} from "react-router-dom";


import { LanguageSwitcher } from "./components/languageSwitcher/languageSwitcher";
import About from "./components/about"
import AlbumList from "./components/albumlist/albumlist"

const App: FC = () => {
    const [showModal, setShowModalInner] = useState(false);
    const setShowModal = useCallback(setShowModalInner, [setShowModalInner])

    const result = (
        <Router>
            <About />
            <AlbumList setmodal={setShowModal} />
            <Modal show={showModal} setmodal={setShowModal} />
            <LanguageSwitcher />
        </Router>
    )
    return result
}
export default App;
