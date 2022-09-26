const express = require("express")
const app = express();
const cors = require("cors");
const path = require("path");
const { dbConnection } = require("./db/config");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.static("public"))

app.use("/api/auth", require("./routes/auth"));

app.get("*", (requ, resp) => {
    resp.sendFile(path.resolve(__dirname, "public/index.html"))
})

dbConnection();
app.listen(process.env.BBDD_PORT, () => {
    console.log(`El servidor está activo en el puerto ${process.env.BBDD_PORT}`)
})

