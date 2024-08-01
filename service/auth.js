const jwt = require("jsonwebtoken");
const secret = "abcd801$"

function setUser(user) {
  return jwt.sign({
    _id: user._id,
    email: user.email,
  }, secret); 
}
 
function getUser(token) {
  try{
    return jwt.verify(token, secret);
  }
  catch{
    console.log("LMFAO")
  }
}

module.exports = {
  setUser,
  getUser,
};
