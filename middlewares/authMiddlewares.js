import JWT from "jsonwebtoken"

export const authenticate=async(req,res,next)=>{
   const token =req.headers.authorization;
   try{
     const decode=JWT.verify(token,process.env.JWT_SECRET)
     next();
   }catch(e){
    res.status(500).send({
        success:false,
        message:"unauthorized access"
    })
   }
   
} 