const express = require("express");
const Question = require("../models/questionModel");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { questionName, answers } = req.body;
    const newQuestion = new Question({ questionName, answers });
    const savedQuestion = await newQuestion.save();
    res.json(savedQuestion);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the question." });
  }
});

router.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching questions." });
  }
});

module.exports = router;
