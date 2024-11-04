const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    cource:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('Quiz', ExamSchema);
