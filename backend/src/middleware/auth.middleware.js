const { clerkClient } = require('@clerk/express');

const protectRoute = async (req, res, next) => {
    if (!req.auth.userId) {
        res.status(401).json({
            message: "unauthorized - you must be logged in"
        })
    }
    next();
}

const requireAdmin = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress.emailAddress
        if (!isAdmin) {
            return res.status(403).json({
                message: "unauthorized - you must be logged in"
            })
        }
    } catch (err) {
        console.log(err);

    }
}

module.exports = { protectRoute, requireAdmin };