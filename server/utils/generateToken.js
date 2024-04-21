import jwt from "jsonwebtoken"

const generateTokenandSetCookie =(userId,res)=>{

const token=jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn:"15d"
})
res.cookie("chatToken",token,
{
    maxAge:15*24*60*60*1000,
    // httpOnly:true, //prevent XXS attackS cross-site scripting attacks
    // sameSite: "None", //CSRF attacks cross-site request forgery attacks 
    // secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    path: "/",
    sameSite: "None", // Only use with HTTPS
    secure: true, // Only use with HTTPS

})
}

export default generateTokenandSetCookie