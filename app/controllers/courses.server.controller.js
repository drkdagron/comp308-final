var mongoose = require('mongoose'),
    Course = mongoose.model('Course'),
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
    var course = new Course(req.body);
    course.creator = req.user;
    
    course.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }else{
            res.json(course);
        }
    });
};

exports.enroll = function(req, res){
    var enroll = new Enroll(req.body);
    enroll.student = req.user;
    
    enroll.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }else{
            return res.json(enroll);
        }
    });
}

exports.list = function(req,res){
    Course.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, courses){
        console.log("LIST: " + courses);
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }else{
            res.json(courses);
        }
    });
};

exports.listEnroll = function(req, res)
{
    Enroll.find().exec(function(err, enrolls){
        console.log("LIST ENROLLS: " + enrolls);
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }else{
            res.json(enrolls);
        }
    });
};

exports.courseByID = function(req,res, next, id){
    Course.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, course){
        if(err) return next(err);
        if(!course) return next(new Error('Failed to load article ' + id));
        
        req.course = course;
        next();
    });
};

exports.enrollByID = function(req,res, next, id){
    Enroll.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, enroll){
        if(err) return next(err);
        if(!enroll) return next(new Error('Failed to load article ' + id));
        
        req.enroll = enroll;
        next();
    });
};

exports.read = function(req, res){
    console.log("READ COURSE: " + req.course);
    res.json(req.course);
};

exports.readEnroll = function(req, res){
    console.log("READ ENROLL: " + req.enroll);
    res.json(req.enroll);
};

exports.update = function(req,res){
    var course = req.course;
    
    course.name = req.body.name,
    course.code = req.body.code,
    course.description = req.body.description,
    course.capacity = req.body.capacity
    
    course.save(function(err){
        if(err)
        {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }else{
            return res.json(course);
        }
    });
};

exports.delete = function(req,res){
    var course = req.course;
    
    course.remove(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }else{
            return res.json(course);
        }
    });
};

exports.hasAuthorization = function(req,res,next){
    if(req.course.creator.id !== req.user.id){
        return res.status(403).send({
            message:'User is not authorized'
        });
    }
    next();
}