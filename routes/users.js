let {Router} = require("express")
let {handleShowSignupPage, handleUserCreation, handleLoginValidation,
     handleShowLoginPage, handleLogoutFunctionality} = require("../controllers/users")

let router = Router()

router.get("/signup", handleShowSignupPage)
router.post("/signup", handleUserCreation)
router.get("/login", handleShowLoginPage)
router.post("/login", handleLoginValidation)
router.get("/logout", handleLogoutFunctionality)

module.exports = router