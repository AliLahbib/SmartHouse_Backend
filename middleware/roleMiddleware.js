exports.verifyRole = (roles) => {
    return (req, res, next) => {
      const userRole = req.user.role; 
      console.log("userRole",userRole);
  
      if (!roles.includes(userRole)) {
        return res.status(403).json({ message: "Accès interdit" });
      }
  
      next();
    };
  };
  