import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    let token;

    try{
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                req.user = decoded;

                next();
        }else{
            return res.status(401).json({
                message: "Not Authorized, No token"
            })
        }
    }catch(err){
        console.error(err);
        return res.status(401).json({
            message: "Token Failed!!"
        })
    }
}