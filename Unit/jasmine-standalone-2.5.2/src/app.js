
// Code goes here

var app = angular.module('petsApp',[]);
app.filter('animalType', function() {
	
	return function(object){
		var animalObject=[];
		       if(object.type=="Cat"){
					 animalObject.push(object.name);
               }
				return animalObject;
				
			}
		
});
app.controller('appCntrl', function ($http, $scope, $q) {
        // Returns a promise which is resolved if http calls succeeds,
        // otherwise the promise is rejected
		
        $scope.males = [];
        $scope.females = [];
        var url = "https://agl-developer-test.azurewebsites.net/people.json";

        var defer = $q.defer();

            // Perform the actual HTTP call with query parameters
            $http({
            	method: 'jsonp',
            	url: url,
            	params: {
            		format: 'jsonp',
            		callback: 'JSON_CALLBACK'
            	}
            }).
            success(function (data) {
                // this callback will be called asynchronously
                // when the response is available
                defer.resolve(data);
				//Looping for data
				angular.forEach(data, function(value){

					if (value.gender == 'Male') {
						if(value.pets!=null){
							var a=value.pets.length;
							for(i=0;i<a;i++){
								$scope.males.push(value.pets[i]);
							}
						}
							
				}
				if (value.gender == 'Female') {
					if( value.pets!=null){
						var a=value.pets.length;
						for(i=0;i<a;i++){
							$scope.females.push(value.pets[i]);
						}
					}
					   
					}
					
				});
			   
			}).
            error(function (data, error, status) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
				$scope.data.error = { message: error, status: status};
				console.log($scope.data.error.status);
                defer.reject();
            });

            return defer.promise;
			

        });