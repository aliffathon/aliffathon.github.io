---
layout: post
title: Angular - Scope
categories: angularjs
tags: [tutorial, angularjs, javascript, framework]
---


## 16. [scopes](#scopes) ##
---
$scope : special js object connects controllers with views, contain model data;

{% highlight html %}
{% raw %}<script type="text/javascript">
	// scope inherits values from parent to child
	app.controller('shapectrl', function($scope){
		$scope.message = "puts messages here";		// $scope.message assigned here
	});
	app.controller('circlectrl', function($scope){
		$scope.message = "puts message here too";	// $scope.message override here
	});
</script>{% endraw %}
{% endhighlight %}

## 17. [services](#services) ##
---
services: js function with specific task; injected using dependency injection mechanism.
built-in services always start prefix $ symbol.
how: 2 ways to create services :
- factory
- service

{% highlight html %}
{% raw %}<script>
	// using factory
	app.factory('MathSvc', function(){
		var factory = {};
		factory.multiply = function(a,b){
			return a*b;
		}
		return factory;
	});
	// using services; inject already avail service
	app.services('CalcSvc', function(MathSvc){
		this.square = function(a){
			return MathSvc.multiply(a,a);
		}
	});
	app.controller('CalcCtrl', function($scope, CalcSvc){
		$scope.function(){
			$scope.result = CalcSvc.square($scope.no);
		}
	});
</script>
<!-- implementation here -->
<div ng-app="" ng-controller="">
	<input type="text" ng-model="no">
	<button type="button" ng-click="square()">X<sup>2</sup></button>
	Result : {{ result }}
</div>{% endraw %}
{% endhighlight %}

## 18. [dependency-injection](#dependency-injection) ##
---

DI : inject components dependencies instead of hard coding it; relieves component from locating and make configurable. reusable, maintainable and testable.

DI Core Components : 

- Value 	: obj pass val to ctrl during config phase(when aj bootstrap itself).
- Factory 	: ret val; val on demand when svc or ctrl need it; using funct & ret val.
- Service 	: singleton obj funct to perform certain task. svc() injected into ctrl
- Provider 	: internally to create service, factory, etc. get() ret val/svc/factory.
- Constant 	: pass vals at config phase; infact vals cant pass while config

{% highlight html %}
{% raw %}<script>
	// create main app
	var app = angular.module('myApp', []);

	// provider: craete a services, define method, return square to numbers
	app.config(function($provide){
		$provide.provider('MathSvc', function(){
			this.$get = function(){
				var factory = {};
				factory.multiply = function(a,b){ return a*b; }
			}
			return factory;
		});
	});

	// create a value obj as defInp and pass it a data
	app.value('defInp', 5);

	// Constant pass vals at config phase; infact vals cant pass while config
	app.constant('configParam', 'constant value');

	// using factory
	app.factory('MathSvc', function(){
		var factory = {};
		factory.multiply = function(a,b){ return a*b; }
		return factory;
	});

	// inject ke service
	app.service('CalcSvc', function(MathSvc){
		this.square = function(a){ return MathSvc.multiply(a,a); }
	});

	// inject ke controller
	app.controller('appCtrl',
		function($scope, CalcSvc, defInp){
			$scope.no = defInp;
			$scope.result = CalcSvc.square($scope.no);
			$scope.square = function(){
				$scope.result = CalcSvc.square($scope.no);
			}
		});

</script>
<!-- usage sample -->
<div ng-app="myApp" ng-controller="appCtrl">
	Number : <input type="text" ng-model="numb">
	<br>	 <button type="button" ng-click="square()">X<sup>2</sup></button>
	<br> Result : {{ result }}
</div>{% endraw %}
{% endhighlight %}

## 19. [custom-directives](#custom-directives) ##
---
during bootstraps aj find matching elements and does one-time activity using its compile() method of custom directive
then processes element using link() method based on $scope directive
create custom directive using :

- element directive : activates when matching element encountered
- attribute : activates on matching attribute encountered
- css : activates on matching css encountered
- comment : activates on matching comment encountered

### Understanding custom directives ###

{% highlight html %}
{% raw %}<script type="text/javascript">
app.directive('student', function(){
	var directive = {};
	directive.restrict = 'E';
	directive.template = "Student: <b>{{ student.name }} </b>, Roll No: <b>{{ student.rollno }}</b>";
	directive.scope = { student: "=name" }
	directive.compile = function(element, attribs){
		element.css("border", "1px solid #cccccc");
		var linkFunct = function($scope, element, attribs){
			element.html("Student: <b>"+ student.name +"</b>, Roll No: <b>"+ student.rollno +"</b>");
			element.css("background-color", "#fff0ff");
		}
		return linkFunct;
	}
	return directive;
	});

	app.controller('StudentController', function($scope){
		$scope.nm1.nama = '';
		$scope.nm1.email= '';
		$scope.nm1.rollno= 1;
		$scope.nm2.nama = '';
		$scope.nm2.email= '';
		$scope.nm2.rollno= 2;
		});
</script>
<!-- html code here -->
<div ng-app="" ng-controller="StudentController">
	<student name="nm1"></student><br>
	<student name="nm2"></student>
</div>{% endraw %}
{% endhighlight %}


## 20. [internationalization](#internationalization) ##
---

suppport : currency, date, numbers.

{% highlight html %}
{% raw %}<!-- danish locale -->
<script type="text/javascript" src="angular-locale_da-dk.js"></script>
<script type="text/javascript">
	app.controller('appCtrl',
		function($scope){
			$scope.fees   = 100;
			$scope.doDate = new Date();
			$scope.rollNo = 123.45;
		});
</script>
<!-- usage -->
{{ fees | currency }}
{{ doDate | date }}
{{ rollNo | number }}{% endraw %}
{% endhighlight %}
