const User = require("../../models/Users");
const Comment = require("../../models/comments");

const postCommentByBarangId = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, rating } = req.body;
    const { id: userId } = req.user;

    const { files } = req;
    const images = files ? files.map((file) => file.cloudStoragePublicUrl) : null;

    const result = await Comment.create({
      comment,
      rating,
      image: images,
      userId: parseInt(userId),
      barangId: parseInt(id),
    });

    res.status(200).json({
      data: result,
      message: "Success post comment",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getCommentByBarangId = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const offset = (page - 1) * limit;

    const { id } = req.params;

    const result = await Comment.findAndCountAll({
      where: { barangId: id },
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{
        model: User,
        attributes: ['username', 'avatar'],
      }],
    })
    
    const totalPages = Math.ceil(result.count / limit);

    if(result.rows.length === 0) {
      return res.status(404).json({
        code: 404,
        message: "No comment found",
      });
    }

    const comments = result.rows.map((comment) => {
      return {
        id: comment.id,
        comment: comment.comment,
        rating: comment.rating,
        images: encodeURI(comment.image),
        postBy: comment.user,
      }
    });
    
    res.status(200).json({
      commments: comments,
      totalItems: result.count,
      totalPages,
      currentPage: parseInt(page),
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  postCommentByBarangId,
  getCommentByBarangId,
};