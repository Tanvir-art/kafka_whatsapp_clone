import Message from "../model/chat.model.js";
import { publishEvent } from "../events/message.producer.js";

export const sendMessageService = async (data) => {

  const message = await Message.create(data);

  await publishEvent("message.sent", message);

  return message;
};