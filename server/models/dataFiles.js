const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({

    username: {
        type: String,
        required:[true, "Please provide a username"],
           

    },
    role: {
        type:String,
        required:[true, "Please provide a role"],
    },
    fileName: {
        type:String,
        required:[true, "Please provide a filename"],
    }, 

});

const UploadFile = mongoose.model("UploadFile", fileSchema); 

module.exports = UploadFile;