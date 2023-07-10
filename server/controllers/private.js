//to access private data after logIn
const User = require("./../models/user");
const ErrorResponse = require("./../utils/errorResponse");

exports.getPrivateData = async (req, res, next) => {
  const username = req.params.username;
  console.log(username)

  if (!username) {
    //sending error
    return next(new ErrorResponse("No username mentioned", 400));
  }

  let user;

  try {
    user = await User.findOne({ username }).select("role").select("username");

    if (!user || user == undefined) {
        //sending error
        return next(
          new ErrorResponse("user does not exist", 401)
        );
    }

  } catch (error) {
    //sending error
    next(error);
  }
  console.log(user);
  res.status(200).json({
    success: true,
    user
  });

};
