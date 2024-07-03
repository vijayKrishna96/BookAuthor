const User = require("../Model/userModel")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const login = async(req, res ) => {
    const { email , password} = req.body
    const user = await User.findOne({email : email})

    if (!user){
        return res.status(404).send("user not found")
    }
    
    const passwordMatch = bcrypt.compare(password , user.password )

    if(passwordMatch){
        const token = jwt.sign({_id: user._id , email : user.email},
            '93a154c6c3d4d8760499692d4f42ec320dd64f6c4dfe330e4d077ead311984d533245fc47f89dde0f85479086c8a9f229a2398e34330b3352b3d00c39324a188'
        )
        res.cookie('token', token , {httpOnly: true})
        res.send('login success')
    }else{
        return res.status(401).send('password incorrect')
    }

}

const verifyLogin = async(req , res) => {
    if(req.cookies.token){
        res.send("loggedIn")
    }else{
        res.status(401).send("Unauthorised Access !")
    }
}

module.exports = {
    login,
    verifyLogin
}