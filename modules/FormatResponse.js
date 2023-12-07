const CommentRepliesResponse = (reply) => ({
  id: reply.id,
  comment: reply.comment,
  rating: reply.rating,
  images: encodeURI(reply.image),
  createdAt: reply.createdAt,
  postBy: reply.user,
});

const CommentResponse = (comment) => {
  return {
    id: comment.id,
    comment: comment.comment,
    rating: comment.rating,
    images: encodeURI(comment.image),
    createdAt: comment.createdAt,
    postBy: comment.user,
    replies: comment.replies.map(CommentRepliesResponse),
  };
};

module.exports = {
  CommentResponse,
  CommentRepliesResponse,
};