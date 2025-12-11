const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

// index comunnity
router.get("/", async (req, res) => {
    try {
        const allUsers = await User.find();

        res.render("users/index.ejs", {
            users: allUsers,
        });
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

//show usuarios
router.get("/:userId", async (req, res) => {
    try {
        const profileUser = await User.findById(req.params.userId);

        res.render("users/show.ejs", {
            profileUser: profileUser,
        });
    } catch (error) {
        console.log(error);
        res.redirect("/users");
    }
});

module.exports = router;
