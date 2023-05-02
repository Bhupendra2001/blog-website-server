const jwt = require('jsonwebtoken');
const { isValidObjectId } = require('mongoose');
require('dotenv').config()
const postModel = require('../models/postModel')
const key = process.env.Secret;
const Authenticated = (req, res, next) => {

   // const token = req.cookies.access_token;
    let token = req.headers['authorization'];
  
   
    if(!token)   return res.status(400).send({ status: false, message: "token is not present" })
 
    token = token.slice(8)
   
  
    jwt.verify(token , key , (err, decoded)=>{
        if(err){
            return res.status(401).send({status:false, message:`invalid token`})
        }else{
            console.log(decoded.userId)
            req.userId = decoded.userId
            next()
        }
    } )
}

const Authorization =  async (req, res, next)=>{

    try{

    
     const userid = req.userId
     let userId = req.params.userId
     if(!userId) return res.status(400).send({status : false , message : "userId not present in params"})
     if(!isValidObjectId(userId)) return res.status(401).send({status : false , message : "invalid userId"})

     let postData = await postModel.findOne({ userId})
     if (!postData) return res.status(404).send({ status: false, message: "blog Not found" })
    
    
      
     if (userid !== userId) { return res.status(403).send({ status: false, message: "You are not Authrize User" }) }

     next()
    }
    catch(err){
        return res.status(500).send({ status: false, message: err.message })
    }

}

module.exports = { Authenticated , Authorization}