const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

    username: {
        type: String,
        required:[true, "Please provide a username"],   

    },
    fileName: {
        type:String,
        required:[true, "Please provide a filename"],
    },
    comment: {
        type:String,
        required:[true, "Please provide a comment"],
    },
    


});


const Comments = mongoose.model("Comments", commentSchema); 

module.exports = Comments;