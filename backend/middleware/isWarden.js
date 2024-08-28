const isWarden = (req, res, next) => {
    if (req.user && req.user.category === 'warden') {
      next();
    } else {
      return res.status(403).json({ message: 'Access denied: Requires warden role' });
    }
  };
  
  module.exports = isWarden;
  