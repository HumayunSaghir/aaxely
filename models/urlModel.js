const {Schema, model, mongoose} = require("mongoose")

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

    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
    }

}, {timestamps : true})

const urlModel = new model("urls", urlSchema)

module.exports = urlModel