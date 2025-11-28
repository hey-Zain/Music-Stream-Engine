const User = require("../models/user.model")

const getAllUser = async (req, res, next) => {
    try {
        const currentUderId = req.auth.userId;
        const user = await User.find({clerkId: {$ne: currentUderId}})
        res.status(200).json({
            success: true,
            message: "Get All Users Successfully",
            user
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getAllUser
}