const {
  createPaste,
  getPaste,
  getPastesByUser,
  deletePaste,
} = require("../services/paste.service");

const createPasteHandler = async (req, res) => {
  try {
    const { title, content } = req.body;
    const paste = await createPaste(req.userId, title, content);
    res.status(201).json(paste);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPasteHandler = async (req, res) => {
  try {
    const paste = await getPasteHandler(req.params.id);
    res.json(paste);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getPastesByUserHandler = async (req, res) => {
  try {
    const pastes = await getPastesByUser(req.userId);
    res.json(pastes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePasteHandler = async (req, res) => {
  try {
    await deletePaste(req.params.id, req.userId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPasteHandler,
  getPasteHandler,
  getPastesByUserHandler,
  deletePasteHandler,
};
