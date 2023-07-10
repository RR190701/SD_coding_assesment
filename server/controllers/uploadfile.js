const UploadFile = require('../models/dataFiles')
const ErrorResponse = require('./../utils/errorResponse');

exports.UploadFiles = async(req, res, next) => {
    const filename = Date.now() + "_" + req.files.myFile.name;
    const file = req.files.myFile;
    let uploadPath = __dirname + "/../public/images/" + filename;
    console.log(filename);
    file.mv(uploadPath, (err) => {
      if (err) {
        return res.send(err);
      }
    });

    const { username} = req.body;
    if (!username || !file) {
      //sending error
     return next(new ErrorResponse("please provide an (username/file)", 400));
    }
  
    try {
      const newFile = await UploadFile.create({
     fileName: filename,
     username
       
      });
  
      res.status(200).json({
        success: true,
        message:"File Uploaded successfully"
      });
  
    } catch (error) {
      //sending error
      next(error);
    }

}




exports.getAllFiles = async(req, res, next) => {
 const username = req.params.username;
  let files =[];
  try{
  files = await UploadFile.find({username});

  }
  catch(error){
            //sending error
    next(error);
  }

  res.status(200).json({
      success:true,
      res:files
  })

}