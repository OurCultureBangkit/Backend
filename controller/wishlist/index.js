const Barang = require("../../models/barangs");
const Wishlist = require("../../models/wishlist");

const postUserWishlist = async (req, res) => {
  try {
    const { barangId } = req.body;
    const { id: userId } = req.user;
    
    const checkUserWishlist = await Wishlist.findOne(
      { where: { barangId: barangId, userId: userId } }
    );

    if (checkUserWishlist) {
      return res.status(400).json({
        code: 400,
        message: "Barang already added to wishlist",
      });
    }

    const createWishlist = await Wishlist.create({
      barangId: parseInt(barangId),
      userId: parseInt(userId),
    });

    if (!createWishlist) {
      return res.status(400).json({
        code: 400,
        message: "Failed to add barang to wishlist",
      });
    }

    res.status(201).json({
      code: 201,
      message: "Success add barang to wishlist",
    });

  } catch(error){
    console.error(error);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
}

const getUserWishlist = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const { id: userId } = req.user;

    const result = await Wishlist.findAndCountAll({
      where: { userId: userId },
      limit: parseInt(limit),
      offset: parseInt(offset),
      attributes: { exclude: ['userId', 'barangId', 'createdAt', 'updatedAt'] },
      include: [{
        model: Barang,
        attributes: ['id', 'title', 'description', 'harga', 'location', 'stock', 'image'],
      }],
    });

    const totalPages = Math.ceil(result.count / limit);

    if (result.rows.length === 0) {
      return res.status(404).json({
        code: 404,
        message: "Data not found",
      });
    }

    const barang = result.rows.map((item) => {
      return {
        wishListId: item.id,
        barangId: item.barang.id,
        title: item.barang.title,
        description: item.barang.description,
        harga: item.barang.harga,
        location: item.barang.location,
        stock: item.barang.stock,
        image: item.barang.image,
      };
    });

    res.status(200).json({
      code: 200,
      message: "Success get user wishlist",
      barang: barang,
      totalItems: result.count,
      totalPages,
      currentPage: parseInt(page),
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
}

const removeUserWishlist = async(req, res) => {
  try {
    const { wishListId } = req.body;
    const { id: userId } = req.user;

    const checkWishlist = await Wishlist.findOne({
      where: { id: wishListId, userId: userId },
    });

    if (!checkWishlist) {
      return res.status(404).json({
        code: 404,
        message: "Data not found",
      });
    }

    const result = await Wishlist.destroy({
      where: { id: wishListId },
    });

    if (result === 0) {
      return res.status(404).json({
        code: 404,
        message: "Data not found",
      });
    }

    res.status(200).json({
      code: 200,
      message: "Success remove user wishlist",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
}

module.exports = {
  postUserWishlist,
  getUserWishlist,
  removeUserWishlist,
};