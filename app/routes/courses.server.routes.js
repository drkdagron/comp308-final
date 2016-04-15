var users = require('../../app/controllers/user.server.controller'),
    courses = require('../../app/controllers/courses.server.controller');

module.exports = function(app){
    app.route('/api/courses')
        .get(courses.list)
        .post(users.requiresLogin, courses.create);
        
    app.route('/api/courses/:courseId')
        .get(courses.read)
        .put(users.requiresLogin, courses.hasAuthorization, courses.update)
        .delete(users.requiresLogin, courses.hasAuthorization, courses.delete);
        
    app.route('/api/enrolled')
        .get(courses.listEnroll)
        .post(users.requiresLogin, courses.enroll);
    
    app.route('/api/enrolled/:enrollId')
        .get(courses.readEnroll)
        .delete(users.requiresLogin, courses.deleteEnroll);
    
    app.param('courseId', courses.courseByID);
    app.param('enrollId', courses.enrollByID);
}