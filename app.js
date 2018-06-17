myApp = angular.module("myApp", ["ngRoute"]);



myApp.controller("movieByYear", function($scope, movieProvider,$routeParams, $location){

	$scope.year = $routeParams.year;
		movieProvider.year($routeParams.year,function(response){
			$scope.movies = response.data.results;
			
		});
	
	$scope.movieYear =function(year)
	{
		if(year){
			$location.path("/movie/year/" + year);
					}
		
		else{
	$location.path("/movie/year/" + 2018);
							}
						};


});

myApp.service("movieProvider", function($http){

	this.year = function(year, response){
	var url = "https://api.themoviedb.org/3/discover/movie?api_key=de333a9d325f5271c1c8100037377de1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=" + year ;
	$http.get(url).then(response);
}

	});

myApp.config(function($routeProvider){
	$routeProvider
	.when("/movie/year/:year" , {
		"controller" : "movieByYear",
		"templateUrl" : "MovieByYear.html"
	})
	

	.otherwise({"redirectTo" : "/movie/year/2018" });

});
