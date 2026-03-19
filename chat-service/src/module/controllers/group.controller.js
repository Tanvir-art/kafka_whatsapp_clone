import { createGroupService } from "../services/group.service.js";

export const createGroup = async (req, res) => {
  try {

    const group = await createGroupService(req.body);

    res.json({
      success: true,
      group
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};