---
layout: post
title: Angular - Forms
categories: angularjs
tags: [tutorial, angularjs, javascript, framework]
---


## 12. [Forms](#Forms) ##
---

| events       | sample code |
|--------------|-------------|
| ng-click     | =\"reset()\"|
| ng-dbl-click | - |
| ng-mousedown | - |
| ng-mouseup   | - |
| ng-mouseenter| - |
| ng-mouseleave| - |
| ng-mousemove | - |
| ng-mouseover | - |
| ng-keydown   | - |
| ng-keyup     | - |
| ng-keypress  | - |
| ng-change    | - |


| validate | description |
|----------|-------------|
| $dirty   | val changed |
| $invalid | invalid stat|
| $error   | exact error |


{% highlight html %}
{% raw %}<form action="" method="post" name="frmName" novalidate>
first : <input type="text" ng-model="first" required>
	<span ng-show="frmName.first.$dirty && frmName.first.$invalid">
		<span ng-show="frmName.first.$error.required">first is Required</span>
	</span>

email : <input type="text" ng-model="email" required>
	<span ng-show="frmName.email.$dirty && frmName.email.$invalid">
		<span ng-show="frmName.email.$error.email">email is Required</span>
	</span>

<button type="button" ng-click="reset()">RESET</button>
<button type="button" ng-disabled="frmName.first.$dirty && frmName.first.$invalid
	|| frmName.email.$dirty && frmName.email.$invalid"
	ng-click="submit()">Submit</button>
</form>
<!-- angular script here -->
<script>
function frmCtrl($scope){
	$scope.reset = function(){
		$scope.first = '';
		$scope.email = '';
	}
	$scope.reset(); // eksekusi function reset();
}
</script>{% endraw %}
{% endhighlight %}

## 13. [includes](#includes) ##
---

HTML not supporting embedding HTML pages within HTML page.
- AJAX: make a server call to get corresponding HTML and set it in innerHTML
- Server Side Include: JSP PHP ASPX

{% highlight html %}
{% raw %}<div ng-app="" ng-controller="">
	<div ng-include="'main.htm'"></div>
	<div ng-include="'sidebar.htm'"></div>
	
</div>{% endraw %}
{% endhighlight %}


## 14. [ajax](#ajax) ##
---

{% highlight html %}
{% raw %}<script>
function stdCtrl($scope, $http){
	var url = 'data.txt'; // data.json; data.php;
	$http.get(url).success(
		function(response){
		$scope.result = response;
	});
}
</script>
<!-- [ { id: 1, fields: values}, { id: 2, fields: values} ] -->{% endraw %}
{% endhighlight %}


## 15. [views](#views) ##
---

{% highlight html %}
{% raw %}<!-- $routeProvider: key services sets confg url, map html or ng-template, attach controller -->
<!-- 1. define ng-template; 2. define route config; -->
<script>
	var mAp = angular.module('mApp', ['ngRoute']);
	// define $routeProvider as $routeProvider function
	mAp.config(['$routeProvider',
		function($routeProvider){
			$routeProvider.
			when('/addStudent',						// map url
			{	templateUrl: 'addStudent.htm',		// target url
				controller: 'AddStudentController'	// target controller
			}).
			when('/viewStudent',					// map url
			{	templateUrl: 'viewStudent.htm',		// target url
				controller: 'ViewStudentController'	// target controller
			}).
			otherwise({								// default url
				redirectTo: 'addStudent'			// default route
			});
		}]);
	mAp.controller('AddStudentController',function($scope){
		$scope.message = "This page will be used as Add Student Form";
	});
	mAp.controller('ViewStudentController',function($scope){
		$scope.message = "This page will show all Student";
	});
</script>
<!-- comment here -->
<!-- html code here -->
<a href="#addStudent">Add Student</a>
<a href="#viewStudent">View Student</a>
<!-- ng-view usage -->
<div ng-view></div>
<!-- define ng-template to ng-view -->
<script type="text/ng-template" id="addStudent.htm">
	<h2> Add Student </h2>
	{{ message }}
</script>
<script type="text/ng-template" id="viewStudent.htm">
	<h2> View Student </h2>
	{{ message }}
</script>{% endraw %}
{% endhighlight %}

