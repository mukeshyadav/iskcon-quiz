const express = require("express");
const { ResponseService } = require("../../services/response-service");

const router = express.Router();

router.post("/create", async (req, res) => {
  const data = req.body;

  if (!data) {
    return res.status(400).send("Request body missing");
  }
  try {
    await ResponseService.createResponse({ ...data });
    return res.status(201).json({
      message: `धन्यवाद, ${data?.name} प्रश्नोत्तरी में भाग लेने के लिए।`,
    });
  } catch (error) {
    return res.status(500).send("Error while creating the response.");
  }
});

router.get("/", async (req, res) => {
  try {
    const questions = await ResponseService.fetchAllResponses();
    return res.status(200).json(questions);
  } catch (error) {
    return res.status(500).send("Error getting responses");
  }
});

module.exports = router;
