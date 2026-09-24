import { loginUserService, registerUserService } from "../services/authService.js";

export const registerUser = async (req, res) =>{
    try{
        const {name, email, password} = req.body;

        const user = await registerUserService(name, email, password);

        if(!user){
            return res.status(400).json({
                message: "User registration failed"
            })
        }

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    }catch(err){
        console.error(err);
        return res.status(400).json({
            message: err.message
        });
    }
}

export const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;

        const {token, user} = await loginUserService(email, password);

        if(!token){
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        return res.status(200).json({
            message: "User Logged in successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    }catch(err){
        console.error(err);
        return res.status(401).json({
            message: err.message
        });
    }
}