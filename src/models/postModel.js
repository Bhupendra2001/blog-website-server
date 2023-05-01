const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    userId : {type : mongoose.Schema.Types.ObjectId , required : true},
    img : { type : String , required : true},
    title : {type : String , required : true},
    descp : {type : String , required : true},
    cat : {type : String , required : true},
    date : {type : Date , required : true},
  
}, {timestamps : true})

module.exports = mongoose.model('Post', postSchema)
