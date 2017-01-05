 /* Tests */
      describe('http tests', function () {
        
        beforeEach(module('petsApp'));

        var $controller;
        var $httpBackend;
        var $scope;

        describe('real http tests', function() {

          beforeEach(angular.mock.http.init);
          afterEach(angular.mock.http.reset);

          beforeEach(inject(function(_$controller_, _$httpBackend_) {
            $controller = _$controller_;
            $scope = {};
            $httpBackend = _$httpBackend_;

            // Note that this HTTP backend is ngMockE2E's, and will make a real HTTP request
            $httpBackend.whenJSONP('https://agl-developer-test.azurewebsites.net/people.json?callback=JSON_CALLBACK&format=jsonp').passThrough();
			
          }));

          it('should load default pet data (with real http request)', inject(function($http) {
            var sampleController = $controller('appCntrl', { $scope: $scope });
			
			var url = "https://agl-developer-test.azurewebsites.net/people.json";
			$http({
            	method: 'jsonp',
            	url: url,
            	params: {
            		format: 'jsonp',
            		callback: 'JSON_CALLBACK'
            	}
            }).success(function (data) {
					$scope.response = data;
					
			});
				
				//expect(data).not.toEqual([]);
				$httpBackend.expectJSONP('https://agl-developer-test.azurewebsites.net/people.json?callback=JSON_CALLBACK&format=jsonp').respond(200);
				//$httpBackend.flush();
				expect($httpBackend.flush).not.toThrow();
				expect($scope.response).not.toEqual([]);
				
			
            /*setTimeout(function() {

              console.log('Look, pet data:');
              console.log($scope.data);

              
              
            }, 1000);*/

          }));

        });

      });  
	  
describe('The test filter', function () { 

  var $filter;

  beforeEach(function () {
    module('petsApp');

    inject(function (_$filter_) {
      $filter = _$filter_;
    });
  });

  it('should give cat type pet name', function () {
    // Arrange.
    var foo = {name: "Garfield", type: "Cat"}, result;

    // Act.
    result = $filter('animalType')(foo);

    // Assert.
    expect(result).toEqual(['Garfield']);
  });
});