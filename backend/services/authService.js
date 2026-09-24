import User from "../models/users.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const registerUserService = async(name, email, password) => {
    const userExists = await User.findOne({email});

    if(userExists){
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    return user;
}

export const loginUserService = async (email, password) => {
    const user = await User.findOne({email});

    if(!user){
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });


    return {
        token,
        user
    };

};