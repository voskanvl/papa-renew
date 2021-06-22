const express = require("express")
const path = require("path")
const PORT = process.env.PORT || 3000
const app = express()
app.use(["/static/"], express.static(path.resolve("static")))
app.use(["/"], express.static(path.resolve(__dirname)))
app.get("http:localhost:3000/1.json", (req, res) => {
    res.sendFile(path.resolve(__dirname, "1.json"))
})
app.get(["/", "/:f", "/:f/:s"], (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"))
})
app.listen(PORT, () => console.log(`Start on ${PORT} ...`))
