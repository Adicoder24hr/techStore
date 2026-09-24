import { getProfileService, updateProfileService } from "../services/userService.js"


export const getProfile = async (req, res) => {
    try{

        const user = await getProfileService(req.user.id);

        return res.status(200).json({
            message: "User profile fetched successfully",
            user
        })
    }catch(error){
        console.error(error);
        return res.status(400).json({
            message: error.message
        })
    }
}

export const updateProfile = async (req, res) => {
    try{
        const updatedData = req.body;
        const updatedUser = await updateProfileService(req.user.id, updatedData);

        return res.status(200).json({
            message: "User profile updated successfully",
            updatedUser
        })
    }catch(error){
        console.error(error);
        return res.status(400).json({
            message: error.message
        })
    }
}