const urlModel = require("../models/urlModel")
const { nanoid } = require('nanoid');

// function for url creation and returning shorturl
async function handleShortUrlCreation(req, res){
    const {originalUrl} = req.body

    const generatedId = nanoid(6)

    await urlModel.create({
        originalUrl : originalUrl,
        shortId : generatedId
    })

    return res.status(201).json({status : `your id is ${generatedId}`})

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

// analytics for the url -> total clicks
async function handleUrlAnalytics(req, res){
    const reqShortId = req.params.id

    const requiredDocument = await urlModel.findOne({shortId : reqShortId})

    // incase id is invalid
    if(requiredDocument === null){
        return res.status(404).json({status : "Invalid Id"})
    }

    return res.status(200).json({totalClicks : `${requiredDocument.totalClicks}`})

}

module.exports = {
    handleShortUrlCreation,
    handleUrlRedirection,
    handleUrlAnalytics,
}