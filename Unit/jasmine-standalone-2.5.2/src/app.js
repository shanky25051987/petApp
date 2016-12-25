// Code goes here

var app = angular.module('petsApp',[]);

app.controller('appCntrl', function($scope,$http) {

      
      $scope.males = [];
      $scope.females = [];
     var url = "https://agl-developer-test.azurewebsites.net/people.json";


   $http({
        method: 'jsonp',
        url: url,
        params: {
            format: 'jsonp',
            callback: 'JSON_CALLBACK'
        }
    }).then(function (response) {
        $scope.data = response.data;
        
        //Looping for data
         angular.forEach($scope.data, function(value){
      
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
        
    });
      
      
      
   
});
