const { Server } = require('socket.io');
const Message = require('../models/message.model');

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            credentials: true,
        }
    });

    const userSockets = new Map();  // {userId: socketId}
    const userActivites = new Map() // {userId : activityId}

    io.on('connected', (socket) => {
        socket.on("user_connected", (userId) => {
            userSockets.set(userId, socket.id);
            userActivites.set(userId, "Idle");

            // broadcast to all connected sockets that this user just Looged in
            io.emit('user_connected', userId);
            socket.emit('users_online', Array.from(userSockets.keys()));
            io.emit("activites", Array.from(userActivites.entries()));
        });

        socket.on('update_activity', ({ userId, activity }) => {
            console.log("activity updated", userId, activity);

            userActivites.set(userId, activity);
            io.emit("activity_updated", { userId, activity });
        });

        socket.on("send_message", async () => {
            try {
                const { senderId, receiverId, content } = data
                const message = await Message.create({
                    senderId,
                    receiverId,
                    content
                })

                // send to receiver in realtime, if thet're online
                const receiverSocketId = userSockets.get(receiverId);
                if (receiverId) {
                    io.to(receiverSocketId).emit("receive_message", message)
                }


                socket.emit("message_sent", message)
            } catch (error) {
                console.log("Message_error", error);
                socket.emit("message_error", error.message);
            }
        });

        socket.on("disconnet", () => {
            let disconnectUserId;
            for (const [userId, socketId] of userSockets.entries()) {
                // find disconnected user

                if (socketId === socket.id) {
                    disconnectUserId = userId;
                    userSockets.delete(userId);
                    userActivites.delete(userId);
                    break;
                }
            }
            if (disconnectUserId) {
                io.emit("user_disconnected", disconnectUserId);
            }
        })
    });
}


module.exports = {
    initializeSocket
}
