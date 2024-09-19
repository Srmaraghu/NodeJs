const mongoose= require("mongoose");

const blogSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    body: {
        type: String,
        required: true
    },
    coverImageURL:{
        type: String,
        required: false
    },
   
},{
    timestamps:true,
});

const Blog= mongoose.model("blog",blogSchema);

module.exports=Blog;