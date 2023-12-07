const User = require("../../models/Users");
const { hashPassword } = require("../../modules/HashPassword");

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

const changeUserPassword = async(req, res) => {
  try {
    const { id:userId } = req.user;
    const { new_password, repeat_new_password } = req.body;

    if (new_password !== repeat_new_password) {
      return res.status(400).json({
        code: 400,
        message: "Password not match",
      });
    }

    const hashedPassword = await hashPassword(new_password);

    const result = await User.update(
      { password: hashedPassword },
      { where: { id: userId } }
    );

    if(result){
      return res.status(200).json({
        code: 200,
        message: "Success change password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      error: 'Internal Server Error' 
    });
  }
}

module.exports = {
  getWhoAmI,
  getProfileByUsername,
  changeUserPassword,
};