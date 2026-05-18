const userModel = require("../models/users")
const {createToken} = require("../service/auth")

function handleShowSignupPage(req, res){
    return res.status(200).render("signup")
}

async function handleUserCreation(req, res){
    const {name, email, password} = req.body

    const createdUser = await userModel.create({
        name : name,
        email : email,
        password : password,
    })

    // we have to send jwt token to the client.
    const token = createToken(createdUser)
    res.cookie("token", token)

    // redirect to the page.
    return res.status(201).redirect("/")

}

function handleShowLoginPage(req, res){
    return res.status(200).render("login")
}

async function handleLoginValidation(req, res){
    const {email, password} = req.body

    // using database static function
    try{
        const token = await userModel.matchPassword(email, password)
        res.cookie("token", token).redirect("/")
    }

    catch(err){
        return res.render("signin", {
            message : err.message
        })
    }
}

async function handleLogoutFunctionality(req, res){
    return res.clearCookie("token").redirect("/")
}

module.exports = {
    handleShowSignupPage,
    handleUserCreation,
    handleShowLoginPage,
    handleLoginValidation,
    handleLogoutFunctionality,
}