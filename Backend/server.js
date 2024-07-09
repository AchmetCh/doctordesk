const express = require("express");
const path = require('path')
require("dotenv").config();
const patientRoutes = require("./Routes/Routes");
const connection = require("./Config/Connection");
const app = express();
const port = 8000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')))
const cors = require("cors");
app.use(cors({ origin: "*" }));

app.use("/api", patientRoutes);

app.listen(port, () => {
    console.log(`server is connected to port ${port}`);
  });