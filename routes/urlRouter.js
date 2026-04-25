const {Router} = require("express")
const {handleShortUrlCreation,handleUrlRedirection,handleShowHomepage} = require("../controllers/url")

const router = Router()

router.get("/", handleShowHomepage)
router.post("/url", handleShortUrlCreation)
router.get("/url/:id", handleUrlRedirection)

module.exports = router