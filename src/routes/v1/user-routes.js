const express = require("express");
const {userController, followerController} = require("../../controllers")

const router = express.Router();

// update user
router.put("/:user_id", (req, res)=>{
    const userId = req.params.user_id;
    console.log("updating user_id");
    res.json({ message: `user updatd with ID: ${userId}` });
});

//
router.delete("/:user_id", userController.userDeleteController)

router.put("/:user_id/change-password", userController.userPasswordController);

router.get("/search", (req, res)=>{
    return res.json({
        success:true
    })
})

router.get("/:user_id/follower", followerController.followerController);

router.get("/:user_id/following", followerController.followingController);

router.post("/:user_id/follow", followerController.followController);

router.post("/:user_id/unfollow", followerController.unfollowController);

module.exports = router;