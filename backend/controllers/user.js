
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../model/userSchema')

exports.signIn = async(req,res)=> {
    let  {email, password } = req.body
    try{
        let findEmail = await userModel.find({ email: email })
        console.log(findEmail)
        if(findEmail.length === 0){
            return res.status(404).json({message: "Incorrect Email Or Password"})
        }
        const matchPass = await bcrypt.compare(password, findEmail[0].password)
       
        if(!matchPass){
            return res.status(404).json({message: "Incorrect Email Or Password"})
        }
        const token = jwt.sign({email}, "asdjncienv")
        res.status(200).json({
            message: "SignIn Successfull",
            token: token
        })
    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Internal Server Error"})
    }
}

exports.signUp = async(req,res)=> {
    let  {firstName, lastName, email, password } = req.body

    try{
        if(!firstName && !lastName && !email && !password){
            return res.status(404).json({message: "Please Enter all fields"})

        }
        let findEmail = await userModel.find({ email: email })
        if(findEmail.length > 0){
            return res.status(404).json({message: "User already exists."})
        }
        let hashPass = await bcrypt.hash(password, 10)
        let addUser = new userModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPass
        })
        await addUser.save()
        res.status(200).json({
            message: "SignUp Successfull"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Internal Server Error"})
    }
}