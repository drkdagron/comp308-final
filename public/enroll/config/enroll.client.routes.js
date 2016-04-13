angular.module('enroll').config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/enroll', {
        templateUrl: 'enroll/views/list-enroll.client.view.html'
    }).
    when('/enroll/:enrollId', {
        templateUrl: 'enroll/views/view-enroll.client.view.html'
    }).
    when('/enroll/:enrollId/success', {
        templateUrl: 'enroll/views/view-enroll.client.view.success.html'
    }).
    when('/enroll/:enrollId/edit', {
        templateUrl: 'enroll/views/edit-enroll.client.view.html'
    })
}
]);