import { consumer } from "../config/kafka.js";

export const startMessageConsumer = async (io) => {
    await consumer.connect();

    await consumer.subscribe({ topic: 'NEW_MESSAGE', fromBeginning: false });

    await consumer.run({
        eachMessage: async ({message}) =>{
            const data = JSON.parse(message.value.toString());
            console.log("Received message:", data);
            const {receiverId} = data;

            if (receiverId) {
                io.to(receiverId).emit("new_message", data);
            }
        }
    })

    console.log("Message consumer started");
}
