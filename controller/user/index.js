const User = require("../../models/Users");

const getWhoAmI = async (req, res) => {
  try {
    res.status(200).json({
      code: 200,
      profile: {
        id: req.user.id,
        email: req.user.email,
        username: req.user.username,
        googleId: req.user.googleId || null,
        avatar: req.user.avatar,
        roles: req.user.roles,
      },
      message: "Success get user",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
}

const getProfileByUsername = async (req, res) => { 
  try {
    const { username } = req.params;

    const result = await User.findOne({
      where: { username },
      attributes: ['id', 'googleId', 'username', 'email', 'avatar'],
    });

    res.status(200).json({
      code: 200,
      profile: {
        userId: result.id,
        googleId: result.googleId || null,
        username: result.username,
        email: result.email,
        avatar: result.avatar,
      },
      message: "Success get user",
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getWhoAmI,
  getProfileByUsername
};