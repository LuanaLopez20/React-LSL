import express from "express"
const app = express()
const PORT = 3000

app.use(express.json());

//GET
app.get("/", (req, res))
