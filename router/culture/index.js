const express = require("express");
const { getAllCulture, getCultureById } = require("../../controller/culture");
const authenticatedJWT = require("../../middleware/AuthenticatedJWT");
const { isAdmin } = require("../../middleware/CheckAdmin");

const router = express();

router.get("/", getAllCulture);
router.post("/", authenticatedJWT, isAdmin, addCulture);
router.get("/:id", getCultureById);

module.exports = router;