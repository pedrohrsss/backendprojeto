import { DevDataSource } from "./connections/dbDev";
import express = require("express")
import rotas from "./routes/routes";



DevDataSource.initialize().then()
console.log("Database connected")

const app = express()

app.use(express.json())

app.listen(3333, () => console.log("Servidor online na porta 3333"))

