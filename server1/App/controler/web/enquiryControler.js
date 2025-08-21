const { enquiryModel } = require("../../model/enquiry.model");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const Note = require("../../model/model");

let register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await enquiryModel.findOne({ email });
    if (user) {
      return res.status(401).json({ success: false, message: "User already exists!" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new enquiryModel({
      name,
      email,
      password: hashPassword
    });

    await newUser.save();
    res.status(200).json({ success: true, message: "Account created successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error in adding user", error });
  }
};

let login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await enquiryModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found!" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({ success: false, message: "Invalid password!" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ success: true, token, user: { id: user._id, name: user.name }, message: "Login successful" });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error in login server", error });
  }
};

let notes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }); // filter by user
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error in fetching notes", error });
  }
};

module.exports = { register, login, notes };
