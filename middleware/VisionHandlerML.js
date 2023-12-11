'use strict'

const multer = require("multer");

const maxFileSize = 6 * 1024 * 1024; // 6MB

const visionMlImageHandler = (req, res, next) => {
  const uploadSingle = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: maxFileSize },
  }).single('image');

  uploadSingle(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ 
          error: 'File size exceeds 6MB limit.' 
        });
      }
      return res.status(400).json({ 
        error: 'Error uploading image.' 
      });
    } 
    else if (err) {
      return res.status(500).json({ 
        error: 'Error uploading image.' 
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: "No image uploaded"
      });
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ 
        error: 'Invalid file type. Please upload a valid image.' 
      });
    } 

    next();
  });
};

module.exports = { visionMlImageHandler };