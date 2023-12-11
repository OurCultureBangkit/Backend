const express = require("express");
const { getAllCulture, getCultureById } = require("../../controller/culture");

const router = express();

router.get("/", getAllCulture);
router.get("/:id", getCultureById);

module.exports = router;