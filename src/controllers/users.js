const User = require('../models/users')
const {generateToken} = require('../utils/jwt')

async function addUser(req, res) {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username }).exec();
  if (existingUser) {
    //status sendStatus
    //send json
    return res.status(409).json('user is already exist');
  }
  const user = new User({ username, password });
  await user.hashPassword();
  await user.save();
  const token = generateToken({ id: user._id })
  return res.status(201).json({ token, username });
}

module.exports = { addUser }