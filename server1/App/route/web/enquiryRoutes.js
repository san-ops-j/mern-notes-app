let express = require("express");
const { register, login, notes } = require("../../controler/web/enquiryControler");
const { enquiryModel } = require("../../model/enquiry.model");
const { middleware } = require("../../middleware/middleware");
const Note = require("../../model/model");

let enquiryRouter = express.Router();

enquiryRouter.post("/register", register);
enquiryRouter.post("/login", login);

enquiryRouter.post("/add", middleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const newNote = new Note({
      title,
      description,
      userId: req.user.id
    });

    await newNote.save();
    res.status(201).json({ success: true, message: 'Note created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error in adding note', error });
  }
});

enquiryRouter.get("/me", middleware, async (req, res) => {
  try {
    const user = await enquiryModel.findById(req.user.id).select("name");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Failed to load user", error });
  }
});

enquiryRouter.get("/note", middleware, notes);

enquiryRouter.put("/update/:id", middleware, async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;

  const updatedNote = await Note.findOneAndUpdate(
    { _id: id, userId: req.user.id },
    { title, description },
    { new: true }
  );

  if (!updatedNote) {
    return res.status(404).json({ success: false, message: 'Note not found or does not belong to user' });
  }

  res.status(200).json({ success: true, message: 'Note updated successfully', note: updatedNote });
});

enquiryRouter.delete("/delete/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found or does not belong to user",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in deleting note",
      error,
    });
  }
});

module.exports = enquiryRouter;
