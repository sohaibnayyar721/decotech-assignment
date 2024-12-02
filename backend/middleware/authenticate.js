const jwt = require("jsonwebtoken")

exports.authenticate = async(req, res, next) => {
    try{
        if(!req.headers.authorization){
            return res.status(401).json({message : "Unauthorize"})
        }
        if(!req.headers.authorization.split(' ')[1] ){
            return res.status(401).json({message : "Unauthorize"})
        }
        let token = req.headers.authorization.split(' ')[1]
        const verify = await jwt.verify(token, "asdjncienv")
        req.userEmail = verify?.email
        next()
    }catch(err){
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error"})
    }
}