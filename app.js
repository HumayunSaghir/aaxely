const express = require("express")
const urlRouter = require("./routes/urlRouter")
const connectDatabase = require("./connection")

connectDatabase("mongodb://127.0.0.1:27017/urlShortner")
    .then(() => console.log("Database Connected!"))
    .catch(() => console.log("Error in Database Connection!"))

const app = express()
const PORT = 8000

// middlewares
app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use("/", urlRouter)

app.listen(PORT, () => console.log(`server is listening at port ${PORT}`))