const axios = require("axios");
const FormData = require("form-data");
const Cultures = require("../../models/cultures");

const predictionImage = async (req, res) => {
  const { file } = req;

  try {
    const formData = new FormData();
    formData.append("image", file.buffer, file.originalname);

    const response = await axios.post(
      "https://model-ourculture-ojy22lhfsq-as.a.run.app/ml/vision",
      formData, 
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    const { data } = response.data;

    const result = await Cultures.findOne({
      where: { name: data.title.toLowerCase() },
      attributes: { exclude: ["updatedAt"] }
    });

    if (!result) {
      return res.status(404).json({
        code: 404,
        message: "Sorry, the image cannot be predicted or is not found in the database."
      });
    }

    return res.status(200).json({
      code: 200,
      message: "Image predicted successfully",
      data: result,
      postBy: {
        username: "Admin OurCulture",
      }
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error predicting image",
      error: error.message 
    });
  }
};

module.exports = { predictionImage };
