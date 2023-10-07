const jwt=require('jsonwebtoken')
const {promisify}=require('util')
exports.decodeToken=async(token,secretKey)=>{
    const decryptedResult=await promisify (jwt.verify)(token,secretKey)
    return decryptedResult
}