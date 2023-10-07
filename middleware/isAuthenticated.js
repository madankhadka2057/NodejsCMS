const jwt=require('jsonwebtoken')
const {promisify}=require('util')
const { users } = require('../model')
const { decodeToken } = require('../services/decodeToken')
exports.isAuthenticated=async(req,res,next)=>{
    const token=req.cookies.token
    //check token is given or not
    if(!token){
        return res.send("token must be required")

    }
    //verify token if it is legit or not
    const decryptedResult= await decodeToken(token,process.env.secretKey)
    // console.log(decryptedResult);

    const userExist=await users.findAll({
        where:{
            id:decryptedResult.id
        }
    })
    if(userExist.length==0){
        res.send("User With that token doesn't exist")
    }else{
        //!all user data is getting in user
        req.user=userExist;//alternative userExist[0].id,decryptedResult.id;
        req.userId=userExist[0].id;//alternative userExist[0].id,decryptedResult.id;
        next();
    }
}