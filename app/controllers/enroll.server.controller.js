var mongoose = require('mongoose'),
    Enroll = mongoose.model('Enroll');
    
var getErrorMessage = function(err){
    
    if(err.errors){
        for(var errName in err.erros){
            if(err.errors[errName].message)
                return err.errors[err.errName].message;
        }
    }else{
        return 'Unknown server error';
    }
};

exports.create = function(req,res){
    console.log("BEGINNING ENROLL");
    var enroll = new Enroll(req.body);
    enroll.studentId = req.user;
    console.log(enroll);
    
    enroll.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }else{
            res.json(enroll);
        }
    });
};

exports.list = function(req,res){
    Enroll.find().exec(function(err, enrolls){
        console.log(enrolls);
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }else{
            console.log("Articles Found");
            console.log(enrolls);
            res.json(enrolls);
        }
    });
};

exports.courseByID = function(req,res, next, id){
    Enroll.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, enroll){
        if(err) return next(err);
        if(!enroll) return next(new Error('Failed to load article ' + id));
        
        req.enroll = enroll;
        next();
    });
};


exports.read = function(req, res){
    res.json(req.enroll);
};

exports.update = function(req,res){
    var enroll = req.enroll;
    
    enroll.grade = req.body.grade,
    
    enroll.save(function(err){
        if(err)
        {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }else{
            return res.json(enroll);
        }
    });
};

exports.delete = function(req,res){
    var enroll = req.enroll;
    
    enroll.remove(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }else{
            return res.json(enroll);
        }
    });
};

exports.hasAuthorization = function(req,res,next){
    if(req.enroll.creator.id !== req.user.id){
        return res.status(403).send({
            message:'User is not authorized'
        });
    }
    next();
}