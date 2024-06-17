const { login, register } = require("../services/auth.service");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await register(email, password);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { token, user } = await login(email, password);

    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
