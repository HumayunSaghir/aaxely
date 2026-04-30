let {Router} = require("express")
let {handleShowSignupPage, handleUserCreation, handleLoginValidation, handleShowLoginPage} = require("../controllers/users")

let router = Router()

router.get("/signup", handleShowSignupPage)
router.post("/signup", handleUserCreation)
router.get("/login", handleShowLoginPage)
router.post("/login", handleLoginValidation)

module.exports = router