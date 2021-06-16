import { Schema, model, connect } from "mongoose";
const Schema = Schema;
// const ObjectId = Schema.ObjectId;

const Album = new Schema({
    id: Number,
    title: String,
    eng: String,
    desc: String,
    spec: {
        mass: String,
        material: String,
        size: {
            w: String,
            l: String,
            h: String,
        },
    },
    images: [String],
});

export const connection = () =>
    connect(
        "mongodb+srv://voskanvl:DexBDcni@cluster0.cbpsi.azure.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        { useNewUrlParser: true },
    );
export const model = model("Album", Album);
