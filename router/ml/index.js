const express = require("express");
const { predictionImage } = require("../../controller/ml");
const { visionMlImageHandler } = require("../../middleware/VisionHandlerML");

const router = express();

router.post("/vision", visionMlImageHandler, predictionImage);

module.exports = router;