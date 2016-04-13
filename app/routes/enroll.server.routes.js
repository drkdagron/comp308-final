var users = require('../../app/controllers/user.server.controller'),
    enrolls = require('../../app/controllers/enroll.server.controller');

module.exports = function(app){
    app.route('/api/enrolled')
        .get(enrolls.list)
        .post(users.requiresLogin, enrolls.create);
        
    app.route('/api/enroll/:enrollId')
        .get(enrolls.read)
        .put(users.requiresLogin, enrolls.hasAuthorization, enrolls.update)
        .delete(users.requiresLogin, enrolls.hasAuthorization, enrolls.delete);
        
    app.param('enrollId', enrolls.enrollByID);
}