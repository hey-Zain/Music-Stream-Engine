const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
   userId: {
        type: String,
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: ['message'],
        default: 'message'
    },
    senderId: {
        type: String,
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    messageContent: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    messageId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});



// Get unread count for a user
notificationSchema.statics.getUnreadCount = async function(userId) {
    return await this.countDocuments({
        userId: userId,
        read: false
    });
};

// Mark all as read
notificationSchema.statics.markAllAsRead = async function(userId) {
    return await this.updateMany(
        { userId: userId, read: false },
        { read: true }
    );
};

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;