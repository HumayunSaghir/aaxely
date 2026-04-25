const fs = require("fs")

function createLogs(pathname){
    return (req, res, next) => {
        const data = `new request recived at ${req.path} by method ${req.method}\n`

        fs.appendFile(pathname, data, (err) => {
            if(err){
                console.log("error in appending data to the file!")
            }
            else{
                next()
            }
        })
    }
}

module.exports = createLogs