import User from "../models/users.js"


export const getProfileService = async (userId) => {
    const user = await User.findById(userId).select("-password");

    if(!user){
        throw new Error("User not found!");
    }
     return user;
}

export const updateProfileService = async (userId, updatedData) => {
    const user = await User.findById(userId).select("-password");

    if(!user){
         throw new Error("user not found!");
    }

    user.name = updatedData.name || user.name;
    user.email = updatedData.email || user.email;

    await user.save();

    return user;
}