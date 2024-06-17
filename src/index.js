const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.route");
const pasteRoutes = require("./routes/paste.route");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/pastes", pasteRoutes);

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
