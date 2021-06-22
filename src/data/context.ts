import { createContext } from "react"

export type DataContext = {
    _id?: { $oid: string }
    id: string
    spec: {
        mass: string
        size: { w: string; l: string; h: string }
        material: string
    }
    desc: string
    images: string[]
    title: string
    eng: string
}

export const initValue: DataContext[] = [
    {
        id: "",
        spec: {
            mass: "",
            size: { w: "", l: "", h: "" },
            material: "",
        },
        desc: "",
        images: [],
        title: "",
        eng: "",
    },
]
export const Context = createContext(initValue)
