const jwt = require("jsonwebtoken")
const secretKey = "8110wordsworth"

function createToken(user){
    const payload = {
        _id : user._id,
        email : user.email,
        name : user.name,
    }

    return jwt.sign(payload, secretKey)
}

function verifyToken(token){
    try{
        return jwt.verify(token, secretKey)
    }
    catch(err){
        return null
    }
}

module.exports = {
    createToken,
    verifyToken,
}