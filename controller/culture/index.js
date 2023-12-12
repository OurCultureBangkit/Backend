const Cultures = require("../../models/cultures");

const getAllCulture = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const cultures = await Cultures.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const totalPages = Math.ceil(cultures.count / limit);

    res.status(200).json({
      code: 200,
      message: "Success get all cultures",
      data: cultures.rows,
      totalItems: cultures.count,
      totalPages: totalPages,
      currentPage: parseInt(page)
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error" 
    });
  }
}

const getCultureById = async (req, res) => {
  try {
    const { id } = req.params;

    const culture = await Cultures.findOne({ where: { id: id }});
    
    if(!culture) {
      return res.status(404).json({
        code: 404,
        message: "Culture not found",
      });
    }

    res.status(200).json({
      code: 200,
      message: "Success get detail culture",
      data: culture,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error" 
    });
  }
}

const addCulture = async (req, res) => {
  try {
    const { name, description, source } = req.body;
    const { files } = req;

    const images = files ? files.map((file) => file.cloudStoragePublicUrl) : null;  

    const culture = await Cultures.create({
      name: name,
      description: description,
      source: source,
      image: images,
    });

    res.status(201).json({
      code: 201,
      message: "Success add culture",
      data: culture,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error" 
    });
  }
}

module.exports = {
  getAllCulture,
  getCultureById,
  addCulture,
};