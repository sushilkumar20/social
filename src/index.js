const express = require("express");
const routes = require("./routes");
const {serverConfig} = require("./config");
const { json } = require("sequelize");

const PORT = 3000;
const app  = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api", routes);

app.listen(serverConfig.PORT, ()=>{
    console.log("server started");
});

