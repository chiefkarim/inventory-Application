module.exports=function authenticate(req, res, next) {
  const jwt = require('jsonwebtoken') 
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];
    console.log("token", token);

    req.token = token;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err || user.username !== "admin") {
        console.log("eror", err);
       return res.status(403).send({msg:'Forbidden',status:403});
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(403).send([{msg:'Forbidden',status:403}]);
  }
}
