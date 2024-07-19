const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    tags : {
        type : [String],
        default : []
    },
    isPinned : {
        type : Boolean,
        default : false
    },
    userId : {
        type : String,
        required : true
    },
    createdOn : {
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model("Note", notesSchema);