angular.module("MyApp.Services", []).service("googleService", function($http) {
	this.getContent = function(scope, wordOne, wordTwo) {
		var key = 'AIzaSyD6F4Zc-0L0ZjYCluhliqI0U8b8VdydZ38';
		var cx = '002944854588022878618%3Aopyefa__qce';
		var startIndex = Math.floor((Math.random() * 10) + 1);

		$http.get("https://www.googleapis.com/customsearch/v1?q=" + wordOne + "&cx=" + cx + "&searchType=image&start=" + startIndex + "&key=" + key).success(function(data, status) {
			var i = Math.floor((Math.random() * 10) + 1);
			startIndex = Math.floor((Math.random() * 10) + 1);
			scope.dataOne = data.items[i].link;

			$http.get("https://www.googleapis.com/customsearch/v1?q=" + wordTwo + "&cx=" + cx + "&searchType=image&start=" + startIndex + "&key=" + key).success(function(data, status) {
				var i = Math.floor((Math.random() * 10) + 1);
				scope.dataTwo = data.items[i].link;
				scope.imgDisplayValue = "initial";
			});
		});

	};
}).service("bingService", function($http) {
	this.getContent = function(scope, wordOne, wordTwo) {
		scope.imgAreaDisplayValue = "block";
		scope.progressDisplayValue = "block";
		scope.imgDisplayValue = "none";
		$http.defaults.headers.common.Authorization = "Basic OkhJd0NmTzdwWno3emhRL3RwSmplN0RINFc5M0FHNVFjTENoUFdyN1FUcjA9";
		var outerSkip = Math.floor((Math.random() * 1000) + 1);
		var innerSkip = Math.floor((Math.random() * 49));
		$http.get("https://api.datamarket.azure.com/Bing/Search/v1/Image?Adult='Off'&Query='" + encodeURIComponent(wordOne) + "'&$skip=" + outerSkip).success(function(data, status) {
			scope.dataOne = data.d.results[innerSkip].MediaUrl;

			outerSkip = Math.floor((Math.random() * 1000) + 1);
			innerSkip = Math.floor((Math.random() * 49));
			$http.get("https://api.datamarket.azure.com/Bing/Search/v1/Image?Adult='Off'&Query='" + encodeURIComponent(wordTwo) + "'&$skip=" + outerSkip).success(function(data, status) {
				scope.dataTwo = data.d.results[innerSkip].MediaUrl;

				scope.imgDisplayValue = "inline";
				scope.progressDisplayValue = "none";
			});

		});
	};
}).service("facebookService", function($http) {
	this.postImages = function(message, imgUrlA, imgUrlB) {
		var imgPost = function(albumId) {
			FB.api("/" + albumId + "/photos", "POST", {
				url : imgUrlA
			}, function(response) {
				if (response && !response.error) {
					FB.api("/" + albumId + "/photos", "POST", {
						url : imgUrlB
					}, function(response) {
						if (response && !response.error) {
							alert('done successfully');
						}
					});
				}
			});
		};

		var doImagePost = function() {
			var albumId = null;

			// Find the Cake|Meat album.
			FB.api("me/albums?fields=name", function(response) {
				if (response && !response.error) {
					var albums = response.data;
					for (var i = 0; i < albums.length && albumId == null; i++) {
						if (albums[i].name == "Cake|Meat Photos") {
							albumId = albums[i].id;
							imgPost(albumId);
						}
					}

					if (albumId == null) {
						// Create this album.
						FB.api("/me/albums", "POST", {
							name : "Cake|Meat Photos"
						}, function(response) {
							if (response && !response.error) {
								albumId = response.id;
								imgPost(albumId);
							}
						});
					}
				}
			});

		};

		// Step 1: Log in
		FB.login(function(response) {
			if (response.status == 'connected') {
				// Step 2:
				// publish
				doImagePost();
			}
		}, {
			scope : 'publish_actions,user_photos'
		});
	};
});
