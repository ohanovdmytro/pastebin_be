const prisma = require("@prisma/client");

const createPaste = async (userId, title, content) => {
  const paste = await prisma.paste.create({
    data: {
      title,
      content,
      userId,
    },
  });
  return paste;
};

const getPaste = async (id) => {
  const paste = await prisma.paste.findUnique({ where: { id } });
  if (!paste) throw new Error("Paste not found");
  return paste;
};

const getPastesByUser = async (userId) => {
  const pastes = await prisma.paste.findMany({ where: { userId } });
  return pastes;
};

const deletePaste = async (id, userId) => {
  const paste = await prisma.paste.findUnique({ where: { id } });
  if (!paste || paste.userId !== userId)
    throw new Error("Not authorized or paste not found");
  return await prisma.paste.delete({ where: { id } });
};

module.exports = { createPaste, getPaste, getPastesByUser, deletePaste };
