const authMiddleware = (req, res, next) => {
  console.log('Authentication middleware');
  next();
};

module.exports = authMiddleware;
