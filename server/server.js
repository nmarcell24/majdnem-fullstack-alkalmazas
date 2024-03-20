const express = require("express");
const connectDb = require("./config/dbConnection");
require("dotenv").config();
const cors = require("cors"); // for the frontend

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
connectDb();

app.use(express.json()); //body parser
app.use("/users", require("./routes/userRoutes"));

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
});