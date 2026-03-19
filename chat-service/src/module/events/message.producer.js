import { producer } from "../../config/kafka.js";

export const publishEvent = async (topic, data) => {
  await producer.send({
     topic: "NEW_MESSAGE",
    messages: [
      {
        value: JSON.stringify(data)
      }
    ]
  });
};