exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res
    .status(401)
    .json({ error: "You need to be logged in to access this resource" });
};
