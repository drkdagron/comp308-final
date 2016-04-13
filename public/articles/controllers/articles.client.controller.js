angular.module('articles').controller('ArticlesController', ['$scope', '$routeParams', '$location', 'Authentication', 'Articles',
function ($scope, $routeParams, $location, Authentication, Articles) {
    $scope.authentication = Authentication;
    
    console.log($scope.authentication);
    $scope.create = function() {
        var article = new Articles({
            company: this.company,
            city: this.city,
            country: this.country,
            startDate: this.startDate,
            endDate: this.endDate,
            position: this.position,
            details: this.details            
        });
        article.$save(function(response) {
            $location.path('articles/');
        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };
    
    $scope.find = function() {
        $scope.articles = Articles.query();
    };
    
    $scope.findOne = function() {
        $scope.article = Articles.get({
            articleId: $routeParams.articleId
        });
    };
    
    $scope.update = function() {
        $scope.article.$update(function() {
            $location.path('articles/');
        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };
    
    $scope.delete = function(article) {
        if (article) {
            article.$remove(function() {
                for (var i in $scope.articles) {
                    if ($scope.articles[i] === article) {
                        $scope.articles.splice(i, 1);
                    }
                }
            });
        } else {
            $scope.article.$remove (function() {
                $location.path('articles/');
            });
        }
    };
    
}]);