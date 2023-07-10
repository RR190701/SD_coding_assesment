const User = require('../models/user')
const ErrorResponse = require('./../utils/errorResponse')
exports.register = async(req, res, next) => {
    const { username, password , role} = req.body;


    if (!username||!password||!role) {
      //sending error
     return next(new ErrorResponse("please provide an (password/ username/role)", 400));
    }
  
    try {
      const user = await User.create({
        username,
        password,
        role
       
      });
  
     sendToken(user, 201, res);
  
    } catch (error) {
      //sending error
      next(error);
    }
    
}
exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
      //sending error
      return next(new ErrorResponse("please provide an username and password", 400));
    }
  
    //now to check if the user already exist or not!!
    try {
      const user = await User.findOne({ username }).select("password").select("username");
  
      if (!user) {
        //sending error
        return next(
          new ErrorResponse("invalid username", 401)
        );
      }
  
      //checking if password match
      const isMatch = await user.matchPasswords(password);
  
      if (!isMatch) {
        //sending error
        return next(
          new ErrorResponse("wrong password"),
          401
        );
      }
  
    sendToken(user, 200, res, user.username); 
    } catch (error) {
      //sending error
      next(error);
    }
}
exports.forgetPassword = (req, res, next) => {
    res.send("forget password route")
}  
exports.resetPassword = (req, res, next) => {
    res.send("reset password route");
}
//A fuction to send mail with password reset link
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token });
  };