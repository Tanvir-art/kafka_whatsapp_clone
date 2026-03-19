import { setOnline, setOffline } from "../services/presence.service.js";

export const registerSocketEvents = (io, socket) => {
    const userId = socket.userId;

    console.log(`User ${userId} connected with socket ID: ${socket.id}`);

    socket.on('join', async () => {
        await setOnline(userId, socket.id);
        console.log(`User ${userId} is now online`);
    });

    socket.on("typing", ({to})=>{
        io.to(to).emit("typing", {from: userId});
    })

    socket.on("stop_typing", ({to})=>{
        io.to(to).emit("stop_typing", {from: userId});
    })

    socket.on("seen", ({to, messageId})=>{
        io.to(to).emit("seen", {from: userId, messageId});
    })

    socket.on('disconnect', async () => {
        await setOffline(userId);
        console.log(`User ${userId} is now offline`);
    });
}
 