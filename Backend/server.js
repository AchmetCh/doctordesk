const express = require("express");
require("dotenv").config();
// const RecipesRouter = require("./Routers/routers");
// const userRoutes = require("./Routers/users");
const connection = require("./Config/Connection");
const app = express();
const port = 8000;
app.use(express.json());
const cors = require("cors");
app.use(cors({ origin: "*" }));

app.listen(port, () => {
    console.log(`server is connected to port ${port}`);
  });