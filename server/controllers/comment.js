const Comments = require('../models/comment');
const ErrorResponse = require('./../utils/errorResponse');

exports.AddComment = async(req, res, next) => {
    const { username, comment, fileName} = req.body;

    if (!username || !fileName ||!comment) {
      //sending error
     return next(new ErrorResponse("please provide an (username/file)", 400));
    }
  
    try {
      const newComment = await Comments.create({
     fileName,
     username,
     comment
       
      });
      
  
      res.status(200).json({
        success: true,
      });
  
    } catch (error) {
      //sending error
      next(error);
    }

}

exports.getAllComment = async(req, res, next) => {
  const fileName = req.params.fileName;
  let comments =[];
  try{
  comments = await Comments.find({fileName}).select("username").select("comment");

  }
  catch(error){
            //sending error
    next(error);
  }

  res.status(200).json({
      success:true,
      res:comments
  })

}


