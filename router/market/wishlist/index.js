const express = require("express");
const authenticatedJWT = require("../../../middleware/AuthenticatedJWT");
const { postUserWishlist, getUserWishlist, removeUserWishlist } = require("../../../controller/wishlist");

const router = express();

router.post("/wishlist", authenticatedJWT, postUserWishlist);
router.get("/wishlist", authenticatedJWT, getUserWishlist);
router.delete("/wishlist", authenticatedJWT, removeUserWishlist);

module.exports = router;