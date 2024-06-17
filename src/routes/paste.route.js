const express = require("express");
const {
  createPasteHandler,
  getPasteHandler,
  getPastesByUserHandler,
  deletePasteHandler,
} = require("../controllers/paste.controller");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware");

router.post("/", authenticate, createPasteHandler);
router.get("/:id", getPasteHandler);
router.get("/", authenticate, getPastesByUserHandler);
router.delete("/:id", authenticate, deletePasteHandler);

module.exports = router;
