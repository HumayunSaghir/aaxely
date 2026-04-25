const {Router} = require("express")
const {handleShortUrlCreation, handleUrlRedirection, handleUrlAnalytics} = require("../controllers/url")

const router = Router()

router.post("/url", handleShortUrlCreation)
router.get("/url/:id", handleUrlRedirection)
router.get("/url/analytics/:id", handleUrlAnalytics)

module.exports = router