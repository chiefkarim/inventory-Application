const jwt = require('jsonwebtoken') 
module.exports=function authenticate(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];
    console.log("token", token);

    req.token = token;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err || user.username !== "admin") {
        console.log("eror", err);
        res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(400);
  }
}
