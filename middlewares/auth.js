const {verifyToken} = require("../service/auth")

function checkForToken(req, res, next){
    const token = req.cookies.token

    // incase token is not there
    if(!token){
        return res.status(401).render("login")
    }

    // incase token is there
    const user = verifyToken(token)

    // incase user not found
    if(!user){
        return res.status(401).render("login")
    }

    // incase user found attach the user object.
    req.user = user
    next()
}

module.exports = checkForToken