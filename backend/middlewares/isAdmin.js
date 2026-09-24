
export const isAdmin = (req, res, next) => {
    try {
        if (req.user && req.user.role === "admin"){
            next();
        }
        else{
            return res.status(403).json({
                message: "Access denied!! Admins only"
            })
        }
    }catch(err){
        console.error(err);
        return res.status(500).json({
            message: err.message || "Internal server error"
        })
    }
}