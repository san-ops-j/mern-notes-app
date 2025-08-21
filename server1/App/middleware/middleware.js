let jwt = require("jsonwebtoken");
const { enquiryModel } = require("../model/enquiry.model");

const middleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await enquiryModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = { id: user._id, name: user.name };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token", error: err.message });
  }
};

module.exports = { middleware };
