---
layout: post
title: Angular - $http Services
categories: angularjs
tags: [tutorial, angularjs, javascript, framework, random]
---

## General Usage ##

{% highlight html %}
{% raw %}<script>
$http({
	method: 'GET',
	url: '/products'
}).then(function successCallback(response){
	$scope.result = response;
	// success return result data
}, function errorCallback(response){
	$scope.result = {};
	// error return empty array
}
});
// response object :
// data: {string|object} : response body
// status: {number} : http status code
// headers: {function([headerName])} : header getter function
// config: {object} : config object to generate req
// statusText: {string} : http status text

// shortcut
$http.get('/apiurl', config).then(successCallback, errorCallback);
$http.post('/apiurl', data, config).then(successCallback, errorCallback);
// another .method(): head put delete jsonp patch
</script>{% endraw %}
{% endhighlight %}


## Setting HTTP Headers ##

$httpProvider.default.headers:
- .common	: common header `Accept: application/json, text/plain, */*`
- .post 	: POST req head `Content-Type: application/json`
- .put 		: PUT req head  `Content-Type: application/json`

## Transforming Result ##

- Default Transform:

{% highlight html %}
{% raw %}<script>
$httpProvider.defaults.transformRequest;
$httpProvider.defaults.transformResponse;
function(data, headersGetter, status);
</script>{% endraw %}
{% endhighlight %}

- Override Transform

{% highlight html %}
{% raw %}<script>
function appendTrans(defs, transf){
	// check result is array?
	defs = angular.isArray(defs)? defs : [defs];
	// append new defs values
	return defs.concat(transf);
}
$http({
	url: '/target',
	method: 'GET',
	transformResponse: appendTrans($http.defaults.transformResponse,
		function(value){ return doTransform(value); })
});
</script>{% endraw %}
{% endhighlight %}

- Interceptors
  - response
  - responseError
  - request
  - requestError


{% highlight html %}
{% raw %}<script>
$provide.factory('myHttpInterceptor',
	function($q, dep1, dep2){
		return {
			'request': function(config){
				return config;
			},

			'requestError': function(rejection){
				if(canRevocer(rejection)){
					return responseOrNewPromise;
				}
				return $q.reject(rejection);
			},

			'response': function(response){
				return response;
			},

			'responseError': function(){
				if(canRevocer(rejection)){
					return responseOrNewPromise;
				}
				return $q.reject(rejection);
			}
		}
	});
$httpProvider.interceptors.push('myHttpInterceptor');
$httpProvider.interceptors.push(function($q, dep1, dep2){
	return {
		'request': function(config){

		},
		'response': function(response){

		}
	};
});
</script>{% endraw %}
{% endhighlight %}


{% highlight html %}
{% raw %}

{% endraw %}
{% endhighlight %}