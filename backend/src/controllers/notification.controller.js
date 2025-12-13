const Notification = require("../models/notification.model");
const Message = require("../models/message.model");

// Get all notifications for current user
const getNotifications = async (req, res, next) => {
    try {
        const userId = req.auth.userId;
        
        // Get notifications
        const notifications = await Notification.find({ userId: userId })
            .sort({ createdAt: -1 })
            .limit(20);
        
        // Get unread counts
        const unreadNotifications = await Notification.getUnreadCount(userId);
        const unreadMessages = await Message.getUnreadCount(userId);
        
        res.status(200).json({
            success: true,
            notifications: notifications,
            counts: {
                notifications: unreadNotifications,
                messages: unreadMessages
            }
        });
    } catch (error) {
        next(error);
    }
};

// Mark notification as read
const markAsRead = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const notification = await Notification.findByIdAndUpdate(
            id,
            { read: true },
            { new: true }
        );
        
        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }
        
        res.status(200).json({
            success: true,
            notification: notification
        });
    } catch (error) {
        next(error);
    }
};

// Mark all notifications as read
const markAllAsRead = async (req, res, next) => {
    try {
        const userId = req.auth.userId;
        
        await Notification.markAllAsRead(userId);
        
        res.status(200).json({
            success: true,
            message: 'All notifications marked as read'
        });
    } catch (error) {
        next(error);
    }
};

// Delete notification
const deleteNotification = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        await Notification.findByIdAndDelete(id);
        
        res.status(200).json({
            success: true,
            message: 'Notification deleted'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification
};