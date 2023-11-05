const express = require("express");

const router = express.Router();

router.post("/login", (req, res)=>{
    console.log("logging");
    res.json({ message: `success login` });
});

router.post("/logout", (req, res)=>{
    console.log("logout");
    res.json({ message: `success logout` });
})

router.post("/register", (req, res)=>{
    console.log("register");
    res.json({ message: `registered successfully` });
});

module.exports = router;