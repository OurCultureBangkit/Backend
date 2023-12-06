const express = require('express');
const { getAllBarang, getBarangById, postBarang } = require('../../../controller/barang');
const authenticatedJWT = require('../../../middleware/AuthenticatedJWT');
const { getCommentByBarangId, postCommentByBarangId } = require('../../../controller/comment');
const { singleImageUpload } = require('../../../middleware/ImageHandler');
const { uploadToGcs } = require('../../../middleware/FileUpload');

const router = express();

router.post("/barang", authenticatedJWT, singleImageUpload, uploadToGcs, postBarang);
router.get("/barang", getAllBarang);
router.get("/barang/:id", getBarangById);

router.get("/barang/:id/comment", getCommentByBarangId);
router.post("/barang/:id/comment", authenticatedJWT, singleImageUpload, uploadToGcs, postCommentByBarangId);

module.exports = router;