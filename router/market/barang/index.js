const express = require('express');
const { getAllBarang, getBarangById, postBarang } = require('../../../controller/barang');
const authenticatedJWT = require('../../../middleware/AuthenticatedJWT');
const { getCommentByBarangId, postCommentByBarangId } = require('../../../controller/comment');
const { singleImageUpload } = require('../../../middleware/ImageHandler');
const { uploadToGcs } = require('../../../middleware/FileUpload');
const { repliesUserComment, checkCommentIsExist, checkIsBarangOwner } = require('../../../controller/comment/replies');

const router = express();

router.post("/barang", authenticatedJWT, singleImageUpload, uploadToGcs, postBarang);
router.get("/barang", getAllBarang);
router.get("/barang/detail/:id", getBarangById);

router.get("/barang/:id/comment", getCommentByBarangId);
router.post("/barang/:id/comment", authenticatedJWT, singleImageUpload, uploadToGcs, postCommentByBarangId);

router.post(
  "/barang/:barangId/comment/:commentId/replies", 
  authenticatedJWT, 
  checkCommentIsExist,
  checkIsBarangOwner,
  singleImageUpload, 
  //uploadToGcs,
  repliesUserComment
);

module.exports = router;