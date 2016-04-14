angular.module('courses').controller('CourseController', ['$scope', '$routeParams', '$location', 'Authentication', 'Courses', 'Enroll',
function ($scope, $routeParams, $location, Authentication, Courses, Enroll) {
    $scope.authentication = Authentication;
    
    $scope.create = function() {
        var course = new Courses({
            name: this.name,
            code: this.code,
            description: this.description,
            capacity: this.capacity
        });
        course.$save(function(response) {
           $location.path('courses/'+response._id+'/success');
        }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };
    
    $scope.find = function() {
        $scope.courses = Courses.query();
    };
    
    $scope.findEnrolled = function() {
        $scope.enrolls = Enroll.query();
    }
    
     $scope.findOne = function() {
        $scope.course = Courses.get({
            courseId: $routeParams.courseId
        });
    };
    
    $scope.findStudents = function() {
        $scope.enroll = Enroll.get({
            courseId: $routeParams.courseId
        });
    }
    
    $scope.findOneEnroll = function() {
        $scope.enroll = Enroll.get({
            enrollId: $routeParams.enrollId
        });
    };
    
    $scope.update = function() {
        $scope.course.$update(function() {
            $location.path('courses/'+$scope.course._id);
        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };
    
    $scope.enrollCourse = function()
    {
        console.log("ENROLLING:");
        var enroll = new Enroll({
            courseName: $scope.course.name,
            courseCode: $scope.course.code,

        });
        enroll.$save(function(response) {
            console.log("ENROLLING: SUCCESSFUL");
           $location.path('enrolled/'+response._id);
        }, function (errorResponse) {
            console.log("ENROLLING: UNSUCCESSFUL");
            $scope.error = errorResponse.data.message;
        });
    }
    
    $scope.delete = function(course) {
        if (course) {
            course.$remove(function() {
                for (var i in $scope.courses) {
                    if ($scope.courses[i] === course) {
                        $scope.courses.splice(i, 1);
                    }
                }
            });
        } else {
            $scope.course.$remove (function() {
                $location.path('courses/');
            });
        }
    };
    
}]);