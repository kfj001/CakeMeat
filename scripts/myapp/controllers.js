angular.module("MyApp.Controllers", []).controller("home", function($scope, bingService, facebookService) {
	$scope.wordOne = "";
	$scope.wordTwo = "";
	$scope.message = "hello world";
	$scope.imgAreaDisplayValue = "none";
	$scope.imgDisplayValue = "none";
	$scope.data = {};

	$scope.handleClick = function() {
		bingService.getContent($scope, $scope.wordOne, $scope.wordTwo);
	};

	$scope.postToFacebook = function() {
		facebookService.postImages($scope.wordOne + " " + $scope.wordTwo, $scope.dataOne, $scope.dataTwo);
	};
}); 