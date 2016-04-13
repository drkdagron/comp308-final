var mongoose = require('mongoose'),
    Experience = mongoose.model('Experience');
    
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
    var article = new Experience(req.body);
    experience.creator = req.user;
    
    experience.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }else{
            res.json(article);
        }
    });
};

exports.list = function(req,res){
    Experience.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, experiences){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }else{
            res.json(experiences);
        }
    });
};

exports.experienceByID = function(req,res, next, id){
    Experience.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, experience){
        if(err) return next(err);
        if(!experience) return next(new Error('Failed to load article ' + id));
        
        req.experience = experience;
        next();
    });
};


exports.read = function(req, res){
    res.json(req.experience);
};

exports.update = function(req,res){
    var experience = req.experience;
    
    experience.title = req.body.title;
    experience.content = req.body.content;
    
    experience.save(function(err){
        if(err)
        {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }else{
            res.json(experience);
        }
    });
};

exports.delete = function(req,res){
    var experience = req.experience;
    
    experience.remove(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }else{
            res.json(experience);
        }
    });
};

exports.hasAuthorization = function(req,res,next){
    if(req.experience.creator.id !== req.user.id){
        return res.status(403).send({
            message:'User is not authorized'
        });
    }
    next();
}