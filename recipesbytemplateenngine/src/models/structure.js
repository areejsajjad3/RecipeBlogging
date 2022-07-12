//define schema---- structure for document

const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    myimg: {

        data: Buffer,
        contentType: String

    },
    Ingredient1: {
        type: String,
        require: true,
        unique: true
    },
    Ingredient2: {
        type: String,
        require: true,
        unique: true
    },
    Ingredient3: {
        type: String,

        unique: true
    },
    Ingredient4: {
        type: String,

        unique: true
    },
    Ingredient5: {
        type: String,

        unique: true
    },


})

//now we need to create a collections

//jis collection par maine is schema ko wrap karna h model mai yeh kam hota h

const makerecipe = new mongoose.model("RecipeSch", RecipeSchema)
    ////Register for collection name ka R capital hoga plus const k sath jo R laga hua h woh class hai uska b first R capital hoga
module.exports = makerecipe;