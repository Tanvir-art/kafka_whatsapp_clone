import { sendMessageService } from "../services/message.service.js";

export const sendMessage = async (req, res) => {
  try {

    const message = await sendMessageService(req.body);

    res.json({
      success: true,
      message
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};