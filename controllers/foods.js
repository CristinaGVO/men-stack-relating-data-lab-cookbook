const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

// INDEX para ver la despensa del usuario

router.get("/", async (req, res) => {
    try {
        res.render("foods/index.ejs");
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

// para mostrar los nuevos elementos del pantry

router.get("/new", (req, res) => {
    res.render("foods/new.ejs", {
        userId: req.params.userId,
    });
});

//crear y recibir los datos y guardarlos en pantry

router.post("/", async (req, res) => {
    try {
        // busco el username
        const foundUser = await User.findById(req.params.userId);

        // Agrego un nuevo food al array de pantry
        foundUser.pantry.push({
            name: req.body.name,
        });

        // Guardar
        await foundUser.save();

        // Redirigir de nuevo a la array de de foods
        res.redirect(`/users/${req.params.userId}/foods`);
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

module.exports = router;
