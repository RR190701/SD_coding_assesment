const fs = require('fs');
var path = require('path')
const UploadFile = require('../models/dataFiles');
const User = require('../models/user');
const ErrorResponse = require('./../utils/errorResponse');

exports.UploadFiles = async(req, res, next) => {
    const filename = Date.now() + "_" + req.files.myFile.name;
    const file = req.files.myFile;
    let uploadPath = __dirname + "/../public/images/" + filename;
     const extension = path.extname(filename);

     if(extension != ".pdf"){
      return next(new ErrorResponse("File is not PDF", 400));
     }

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
     username,
     role:'OWNER'

       
      });
  
      res.status(200).json({
        success: true,
        message:"File Uploaded successfully",
        fileName:filename
      });
  
    } catch (error) {
      //sending error
      next(error);
    }

}




exports.getAllFiles = async(req, res, next) => {
 const {username} = req.body
  let files =[];
  try{
  files = await UploadFile.find({username, role:"OWNER"});

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
exports.viewFile = async(req, res, next) => {
  const username = req.params.username;
  const fileName = req.params.fileName;
   try{
   const user = await UploadFile.findOne({username, fileName});
   if (!user) {
    //sending error
    return next(
      new ErrorResponse("invalid username", 401)
    );
   }

 
   }
   catch(error){
             //sending error
     next(error);
   }
 
   res.status(200).json({
       success:true,
   })
 
 }

exports.getAllSharedFiles = async(req, res, next) => {
  const {username} = req.body
   let files =[];
   try{
   files = await UploadFile.find({username, role:"FRIEND"});
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
 

exports.shareFile = async(req, res, next) => {
  const { username, fileName} = req.body;
  if (!username || !fileName) {
    //sending error
   return next(new ErrorResponse("please provide an (username/file)", 400));
  }
  try {
    const user = await User.findOne({ username }).select("username");

    if (!user) {
      //sending error
      return next(
        new ErrorResponse("invalid username", 401)
      );
    }
    try {
      const user = await UploadFile.findOne({ username , fileName }).select("username");
  
      if (user) {
        //sending error
        return next(
          new ErrorResponse("Already shared with the user", 401)
        );
      }
      try {
        const newFile = await UploadFile.create({
       fileName,
       username,
       role:'FRIEND'
    
         
        });
    
        res.status(200).json({
          success: true,
          message:"File Shared successfully"
        });
    
      } catch (error) {
        //sending error
        next(error);
      }
    
  
    } catch (error) {
      //sending error
      next(error);
    }

  } catch (error) {
    //sending error
    next(error);
  }

 
 }