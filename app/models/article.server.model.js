var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var ArticleSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    
    company: {
        type: String,
        default: '',
        trim:true,
        required: 'Company name needed!'
    },
    
    city: {
        type: String,
        default: '',
        trim:true
    },
    
    country: {
        type: String,
        default: '',
        trim:true
    },
    
    startDate: {
        type: Date,
        default: '',
        trim:true,
        required: 'Start date required'
    },
    
    endDate: {
        type: Date,
        default: '',
        trim:true,
        required: 'End date required'
    },
    
    position: {
        type:String,
        default:'',
        trim:true,
        required: 'Position required'
    },
    
    details: {
        type:String,
        default:'',
        trim:true,
    },
    
    creator:{
        type: Schema.ObjectId,
        ref: 'User'
    }
    
});

mongoose.model('Article', ArticleSchema);