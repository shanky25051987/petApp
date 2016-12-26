 /* Tests */
      describe('http tests', function () {
        
        beforeEach(module('SampleApp'));

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
            $httpBackend.whenGET('http://www.omdbapi.com/?s=terminator').passThrough();
          }));

          it('should load default movies (with real http request)', function (done) {
            var sampleController = $controller('SampleController', { $scope: $scope });

            setTimeout(function() {

              console.log('Look, real data:');
              console.log($scope.movies);

              expect($scope.movies).not.toEqual([]);
              done();
            }, 1000);

          });

        });

      });  