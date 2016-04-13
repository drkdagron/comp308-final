var mongoose = require('mongoose'),
    Article = mongoose.model('Article');
    
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
    var article = new Article(req.body);
    article.creator = req.user;
    
    article.save(function(err){
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
    Article.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, articles){
        console.log(articles);
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }else{
            console.log("Articles Found");
            console.log(articles);
            res.json(articles);
        }
    });
};

exports.articleByID = function(req,res, next, id){
    Article.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, article){
        if(err) return next(err);
        if(!article) return next(new Error('Failed to load article ' + id));
        
        req.article = article;
        next();
    });
};


exports.read = function(req, res){
    res.json(req.article);
};

exports.update = function(req,res){
    var article = req.article;
    
    article.company= req.body.company,
    article.city= req.body.city,
    article.country= req.body.country,
    article.startDate= req.body.startDate,
    article.endDate= req.body.endDate,
    article.position= req.body.position,
    article.details= req.body.details
    
    article.save(function(err){
        if(err)
        {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }else{
            return res.json(article);
        }
    });
};

exports.delete = function(req,res){
    var article = req.article;
    
    article.remove(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }else{
            return res.json(article);
        }
    });
};

exports.hasAuthorization = function(req,res,next){
    if(req.article.creator.id !== req.user.id){
        return res.status(403).send({
            message:'User is not authorized'
        });
    }
    next();
}