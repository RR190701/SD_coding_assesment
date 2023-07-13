const mongoose = require("mongoose");

const sharedPDFSchema = new mongoose.Schema({

    username: {
        type: String,
        required:[true, "Please provide a username"],   

    },
    userId: {
        type:String,
        required:[true, "Please provide a userId"],
    },
    role: {
        type:String,
        required:[true, "Please provide a role"],
    },
    filename: {
        type:String,
        required:[true, "Please provide a filename"],
    },


});


const SharedPDF = mongoose.model("SharedPDF", sharedPDFSchema); 

module.exports = User;