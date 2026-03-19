import http from "http";
import app from "./app.js";
import { initSocket } from "./socket/socket.server.js";
import { startMessageConsumer } from "./consumers/message.consumer.js";

const PORT = process.env.PORT || 5003;

const server = http.createServer(app);

// init socket
const io = initSocket(server);

// start kafka consumer
await startMessageConsumer(io);

server.listen(PORT, () => {
  console.log(`🚀 Socket Gateway running on port ${PORT}`);
});