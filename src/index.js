const express = require("express");
const routes = require("./routes");
const {serverConfig} = require("./config");

const PORT = 3000;
const app  = express();

app.use("/api", routes);

app.listen(serverConfig.PORT, ()=>{
    console.log("server started");
});

