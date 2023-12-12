const isAdmin = (req, res, next) => {
  const { role } = req.user;

  if(role === "admin") {
    next();
  }

  else {
    return res.status(403).json({
      code: 403,
      message: "Forbidden"
    });
  }
}

module.exports = {
  isAdmin
}