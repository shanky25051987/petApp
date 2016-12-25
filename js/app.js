
// Code goes here

var app = angular.module('petsApp',[]);

app.controller('appCntrl', function ($http, $scope, $q) {
        // Returns a promise which is resolved if http calls succeeds,
        // otherwise the promise is rejected
			$scope.males = [];
      $scope.females = [];
	var url = "https://agl-developer-test.azurewebsites.net/people.json";

            var defer = $q.defer();

            // Perform the actual HTTP call with query parameters
            // e.g. GET <server url>/someUrl?key=value1
            $http({
                method: 'jsonp',
				url: url,
				params: {
					format: 'jsonp',
					callback: 'JSON_CALLBACK'
				}
            }).
            success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                defer.resolve(data);
				//Looping for data
				angular.forEach(data, function(value){
      
					if (value.gender == 'Male') {
					   angular.forEach(value.pets, function(value){
					   if(value.type == 'Cat'){
						 $scope.males.push(value.name);
						 
						 }
					   });
					}
					if (value.gender == 'Female') {
					   angular.forEach(value.pets, function(value){
						if(value.type == 'Cat'){
						$scope.females.push(value.name);
						 }
					   });
					}
          });
            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                defer.reject();
            });

            return defer.promise;
        
    });