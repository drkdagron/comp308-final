angular.module('courses').factory('Enroll', ['$resource', function($resource) {
    return $resource('api/enrolled/:enrollId', {
        enrollId:'@_id'
    }, {
            update: { method: 'PUT' }
        });
}]);