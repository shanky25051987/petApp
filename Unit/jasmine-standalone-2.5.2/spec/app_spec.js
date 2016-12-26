describe('mixing real and fake http tests', function() {

  beforeEach(angular.mock.http.init);
  afterEach(angular.mock.http.reset);

  beforeEach(inject(function(_$controller_, _$httpBackend_) {
    $controller = _$controller_;
    $scope = {};
    $httpBackend = _$httpBackend_;
  }));

  it('should load default movies (with real http request)', function (done) {

  	// make a real http call
    $httpBackend.whenGET('http://www.omdbapi.com/?s=terminator').passThrough();

    var moviesController = $controller('MovieController', { $scope: $scope });

    setTimeout(function() {
      expect($scope.movies).not.toEqual([]);
      done();
    }, 1000);

  });

  it('should search for movie (with fake http request)', function (done) {
    
    // use fakes only
    $httpBackend.whenGET('http://www.omdbapi.com/?s=terminator').respond({ Search: [{ title: 'Terminator' }] });
    $httpBackend.whenGET('http://www.omdbapi.com/?s=star+wars').respond({ Search: [{ title: 'Return of the Jedi'}] });

    var moviesController = $controller('MovieController', { $scope: $scope });
    
    $scope.keyword = 'star wars';
    $scope.search();
    
    setTimeout(function() {
      expect($scope.movies).toEqual([{ title: 'Return of the Jedi'}]);
      done();
    }, 1000);
    
  });

});