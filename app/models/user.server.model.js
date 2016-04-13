var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;
    
var StudentSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    
    username: {
        type: String,
        trim: true,
        required:"No username entered."
    },
    
    type: {
        type: String,
        trim: true,
        default: 'Student',
        validate: [
            function(type) {
                return type != 'Student' || type != 'Staff';
            }, 'Not correct type (Student or Staff)'
        ],
    },
    
    firstName: {
      type: String,
      trim: true,
      default:'',
      required:"No first name entered."
    },
    
    lastName: {
      type: String,
      trim: true,
      default:'',
      required:"No last name entered."
    },
    
    password: {
        type: String,
        validate: [
            function(password) {
                return password && password.length > 6;
            }, 'Password should be longer'
        ],
        required:"No password entered."
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
    
});

StudentSchema.virtual('fullName').get(function() {
        return this.firstName + ' ' + this.lastName;
    }).set(function(fullName) {
        var splitName = fullName.split(' ');
        this.firstName = splitName[0] || '';
        this.lastName = splitName[1] || '';
    });


StudentSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});
    
StudentSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};
    
StudentSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};
    
StudentSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');
    
    _this.findOne({
        username: possibleUsername
    }, function(err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } 
            else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } 
        else {
            callback(null);
        }
    });
};

StudentSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('User', StudentSchema);