import {Server} from 'socket.io';
import jwt from 'jsonwebtoken';
import { registerSocketEvents } from './socket.events.js';


export const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
        }
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error: No token provided'));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.userId = decoded.id;
            next();
        } catch (err) {
            return next(new Error('Authentication error: Invalid token'));
        }
    });

    io.on('connection', (socket) => {
        console.log(`New client connected: ${socket.id} (User ID: ${socket.userId})`);
        socket.join(socket.userId);
        registerSocketEvents(io, socket);
    });

    return io;
}
