import Group from "../model/chat.group.model.js";
import { publishEvent } from "../events/message.producer.js";

export const createGroupService = async (data) => {

  const group = await Group.create(data);

  await publishEvent("group.created", group);

  return group;
};