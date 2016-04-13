var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var CourseSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },

    name: {
        type:String,
        default: '',
        required : 'Course name required!'
    },
    
    code: {
      type:String,
      default: '',
      required: 'Course code required!'  
    },
    
    description: {
        type:String,
        default: '',
    },
    
    capacity: {
        type: Number,
        default: 40,
    },
    
    creator:{
        type: Schema.ObjectId,
        ref: 'User'
    }
    
});

mongoose.model('Course', CourseSchema);