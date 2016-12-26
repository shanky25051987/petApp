var app = angular.module('SampleApp', []);

      app.controller('SampleController', function sampleController($scope, $http) {
        var getSampleData = function getSampleData() {
          $http.get('http://www.omdbapi.com/', {
              params: { s: $scope.keyword }
            }).success(function(data, status, headers, config) {              
              $scope.movies = data.Search;
            }).error(function(data, status, headers, config) {
              $scope.movies = [];
          });
        };
        
        /* On Load */
        $scope.movies = [];
        $scope.keyword = 'terminator';
        getSampleData();

      });