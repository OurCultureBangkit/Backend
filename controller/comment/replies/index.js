const Barang = require("../../../models/barangs");
const Comment = require("../../../models/comments");

const checkCommentIsExist = async(req, res, next) => {
  try {
    const { commentId } = req.params;

    const result = await Comment.findOne({
      where: { id: commentId },
    });

    if(!result) {
      return res.status(404).json({
        code: 404,
        message: "Comment not found",
      });
    }

    req.comment = result;
    next();

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
}

const checkIsBarangOwner = async(req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { comment } = req;

    const result = await Barang.findOne({
      where: { id: comment.barangId, userId: userId },
    });

    if(!result) {
      return res.status(400).json({
        code: 400,
        message: "Only owner of barang can have access to this route",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
}

const repliesUserComment = async(req, res) => {
  try {
    const { id: userId } = req.user;
    const { barangId, commentId } = req.params;

    const { comment, rating } = req.body; 
    const { files } = req;
    const images = files ? files.map((file) => file.cloudStoragePublicUrl) : null;

    const result = await Comment.create({
      comment: comment,
      rating: rating,
      image: images,
      barangId: parseInt(barangId),
      userId: parseInt(userId),
      commentId: parseInt(commentId),
    });

    return res.status(200).json({
      code: 200,
      message: "Success post comment",
      data: result,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
}

module.exports = {
  checkCommentIsExist,
  checkIsBarangOwner,
  repliesUserComment,
};