const {Schema, model} = require("mongoose")

const urlSchema = new Schema({
    originalUrl : {
        type : String,
        required : true,
    },

    shortId : {
        type : String,
        required : true,
    },

    totalClicks : {
        type : Number,
        default : 0,
    },

}, {timestamps : true})

const urlModel = new model("urls", urlSchema)

module.exports = urlModel