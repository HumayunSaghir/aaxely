const urlModel = require("../models/urlModel")
const { nanoid } = require('nanoid');

// show home page
async function handleShowHomepage(req, res){
    // get all the urls
    const allData = await urlModel.find({createdBy : req.user._id})

    return res.status(200).render("home", {
        data : allData,
    })
    
}

// function for url creation and returning shorturl
async function handleShortUrlCreation(req, res){
    const {originalUrl} = req.body
    
    const generatedId = nanoid(6)
    
    await urlModel.create({
        originalUrl : originalUrl,
        shortId : generatedId,
        createdBy : req.user._id,
    })
    
    const allData = await urlModel.find({createdBy : req.user._id})

    return res.status(201).render("home", {
        id : generatedId,
        data : allData,
    })

}

// redirection to url with count increments
async function handleUrlRedirection(req, res){
    const reqShortId = req.params.id

    const requiredDocument = await urlModel.findOne({shortId : reqShortId})

    // incase id is invalid
    if(requiredDocument === null){
        return res.status(404).json({status : "Invalid Id"})
    }

    const url = requiredDocument.originalUrl
    
    requiredDocument.totalClicks++
    requiredDocument.save()
    
    return res.status(301).redirect(url)

}

module.exports = {
    handleShowHomepage,
    handleShortUrlCreation,
    handleUrlRedirection,
}