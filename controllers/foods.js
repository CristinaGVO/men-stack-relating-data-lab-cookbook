const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

// INDEX para ver la despensa del usuario

router.get("/", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render("foods/index.ejs", {
            foods: currentUser.pantry,
        });
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

// para mostrar los nuevos elementos del pantry
router.get("/new", async (req, res) => {
    res.render("foods/new.ejs");
});

//show
router.get("/:foodId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const food = currentUser.pantry.id(req.params.foodId);
        res.render("foods/show.ejs", {
            food: food,
        });
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

//poner food

router.post("/", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        currentUser.pantry.push(req.body);

        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

//delete food
router.delete("/:foodId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.id(req.params.foodId).deleteOne();

        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

//editar

router.get("/:foodId/edit", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const food = currentUser.pantry.id(req.params.foodId);

        res.render("foods/edit.ejs", {
            food: food,
        });
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

//actualizar appication data PUT

router.put("/:foodId", async (req, res) => {
    try {
        // Find the user from req.session
        const currentUser = await User.findById(req.session.user._id);
        // Find the current application from the id supplied by req.params
        const food = currentUser.pantry.id(req.params.foodId);

        food.set(req.body);
        // Save the current user
        await currentUser.save();
        // Redirect back to the show view of the current application
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

module.exports = router;
