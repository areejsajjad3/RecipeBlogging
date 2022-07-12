const { hasSubscribers } = require('diagnostics_channel');
const express = require('express');
const app = express();
const path = require("path");
const mongoose = require("mongoose")
var mongodb = require('mongodb');
const recipestructure = require('./models/structure');
const { isBuffer } = require('util');
require("./db/connection");
//const reciperecords = recipestructure.find({});
var ObjectId = require('mongodb').ObjectID;

viewPath = path.join(__dirname, "../templates/views")
partialsPath = path.join(__dirname, "../templates/partials")

const port = process.env.PORT || 9090

app.set("view engine", "ejs");
app.set("views", viewPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(201).render('index', { title: "Recipe Blog" });

})

app.get("/createrecipe", (req, res) => {
    res.status(201).render('createmyrecipe', { title: "Creating your recipe" });

})

app.get("/myrecipe", (req, res) => {

    recipestructure.find((err, docs) => {
        res.status(201).render('showmyrecipes', { title: "Your recipes", recipestructures: docs });
    }).catch(err => {
        console.log("something went wrong while retriving data");

    })

})

app.get("/edit/:id", (req, res, next) => {
    console.log(req.params.id);
    //recipestructure.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, docs) => {
    const id = (req.params.id).trim();
    recipestructure.findOneAndUpdate({ _id: new mongodb.ObjectId(id) }, req.body, { new: true }, (err, docs) => {

        if (err) {
            console.log("Can't retrive data to edit ")
            next(err)
        } else {
            res.render('edit', { title: "Update Your Recipe", recipestructure: docs });

        }
    });
});

app.post("/edit/:id", (req, res, next) => {
    console.log(req.params.id);
    //recipestructure.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, docs) => {
    const id = (req.params.id).trim();
    recipestructure.findByIdAndUpdate({ _id: new mongodb.ObjectId(id) }, req.body, (err, docs) => {

        if (err) {
            console.log("Can't update data")
            next(err)
        } else {
            res.status(201).render('index', { title: "Recipe Blog" });

        }
    });
});

app.get("/delete/:id", (req, res, next) => {

    recipestructure.findByIdAndDelete({ _id: req.params.id }, (err, docs) => {

        if (err) {
            console.log("Can't delete recipe")
            next(err)
        } else {
            res.status(201).render('index', { title: "Recipe Blog" });

        }
    });
});

app.post("/recipesubmission", async(req, res) => {
    try {
        //implementing our schema
        const getrecipeform = new recipestructure({
                name: req.body.name,
                myimg: req.body.myimg,
                Ingredient1: req.body.Ingredient1,
                Ingredient2: req.body.Ingredient2,
                Ingredient3: req.body.Ingredient3,
                Ingredient4: req.body.Ingredient4,
                Ingredient5: req.body.Ingredient5

            })
            // console.log(getsignupform.save());
        const added = await getrecipeform.save((err, docs) => {
                if (err) {
                    console.log("Error while savving data");

                } else {
                    console.log("Successfully saved");
                }
            })
            //return res.redirect('AfterSignUp.html')
        res.status(201).render('createmyrecipe', { title: "Creating your recipe" });

    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }

})

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})