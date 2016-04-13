var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var EnrollSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },

    studentId: {
        type:Schema.ObjectId,
        ref:'User'
    },

    courseName: {
        type:String,
        required:''
    },
    
    courseCode: {
        type:String,
        required:''
    },
    
    grade: {
        type: Number,
        default: 0,
    },    
});

mongoose.model('Enroll', EnrollSchema);