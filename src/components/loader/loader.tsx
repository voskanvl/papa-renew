import { memo } from "react"
import style from "./loader.module.scss"
export const Loader = memo((): JSX.Element => <div className={style.loader}>
    Loading ...
</div>)