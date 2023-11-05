const express = require("express");

const router = express.Router();

// update user
router.put("/:user_id", (req, res)=>{
    const userId = req.params.user_id;
    console.log("updating user_id");
    res.json({ message: `user updatd with ID: ${userId}` });
});

//
router.delete("/:user_id", (req, res)=>{
    const userId = req.params.user_id;
    console.log("logout");
    res.json({ message: `user deleted with ID: ${userId}` });
})

router.put("/:user_id/change-password", (req, res)=>{
    const userId = req.params.user_id;
    console.log("register");
    res.json({ message: `Password changed for user with ID: ${userId}` });
});

router.get("/search", (req, res)=>{
    return res.json({
        success:true
    })
})
module.exports = router;