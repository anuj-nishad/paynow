require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next)=>{
  const {authorization} = req.headers;
  if(!authorization) { 
    return res.status(401).json({message: 'Sign in to access the page'});
  }

  const token = authorization.split(' ')[1];
  if(!token)  
    return res.status(401).json({msg: "Invalid Token"});

  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    if(decoded.id){
      req.userId = decoded.id;
      next();
    }
    else{
      return res.status(401).json({message: 'Invalid Token'});
    }
  }
  catch(err){
    console.log(err);
    return res.status(401).json({Error: err});
  }
  
}

const generateToken = (userData) =>{
  const token = jwt.sign(userData, process.env.JWT_SECRET);
  return token;
}

module.exports = {jwtAuthMiddleware, generateToken}