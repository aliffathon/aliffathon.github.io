---
layout: post
title: Angular - Directives
categories: angularjs
tags: [tutorial, angularjs, javascript, framework]
---

## 5. [Directives](#directives) ##
---

| directives     | keterangan                        |
|----------------|-----------------------------------|
| ng-app         | root angular app                  |
| ng-bind        | bind var values                   |
| ng-model       | data 2 arah - scope dan view      |
| -options       | how ng-model updated              |
| ng-class       | class attrib loaded dynamics      |
| ng-controller  | app-controller                    |
| ng-repeat      | looping data array                |
| ng-show;hide   | show;hide elemen: true            |
| ng-switch;When | switch(var)When(val)Default       |
| ng-view        | menangani rute sebelum controller |
| ng-if          | menampilkan elemen sesuai value   |
| ng-aria        | support attrib ARIA               |
| ng-animate     | css3 transmisi - keyframe animate |


## 6. [Expression](#Expression) ##
---

## 7. [Controllers](#Controllers) ##
---

{% highlight html %}
{% raw %}
<script>
function contoh($scope){
	$scope.arrdata = {
		depan = 'nama depan',
		belakang = 'nama belakang',
		penuh = function(){
			var contohObj;
			contohObj = $scope.arrdata;
			return contohObj.depan + " " + contohObj.belakang;
		}
	};
}
</script>
<!-- comment here -->
nama penuh : {{ arrdata.penuh }}
upper : {{ nama | uppercase }}
lower : {{ alamat | lowercase }}
<li ng-repeat="i in items | filter:modelName">
	{{ i.name + i.price }}
</li>
<li ng-repeat="i in items | orderBy:price:reverse"></li>{% endraw %}
{% endhighlight %}

## 8. [Filters](#Filters) ##
---

| nama | desc |
|------|------|
| uppercase | to uppercase |
| lowercase | to lowercase |
| currency  | currency fmt |
| filter    | criteria filt|
| orderby   | criteria ordr|



## 9. [Tables](#Tables) ##
---

{% highlight html %}
{% raw %}<table>
	<tr>
		<td> Column Header </td>
	</tr>
	<tr ng-repeat="s in array.subjects">
		<td> {{ s.objectName }} </td>
	</tr>
</table>{% endraw %}
{% endhighlight %}



## 10. [HTML-Dom](#HTML-Dom) ##
---

| directive   | desc            |
|-------------|-----------------|
| ng-show     | show=true       |
| ng-hide     | hide=true       |
| ng-disabled | disabled=true   |
| ng-click    | click=function()|


{% highlight html %}
{% raw %}<!-- show button -->
<button ng-model="showme">show me !</button>
<button ng-show="showme"> click me!</button>
<!-- hide button -->
<button ng-model="hideme">hide me !</button>
<button ng-hide="hideme"> click me!</button>
<!-- disabled button -->
<button type="button" ng-model="disableme">   i am enable</button>
<button type="button" ng-disabled="disableme">disable me!</button>
<!-- click button -->
<button type="button" ng-click="{{ count = count + 1 }}"></button>
click counter : {{ count }}{% endraw %}
{% endhighlight %}

## 11. [Modules](#Modules) ##
---

{% highlight html %}
{% raw %}<script>
var moduleApp = angular.module('namaModule', []);
moduleApp.controller('namaController', function($scope){<!-- comment here -->});
</script>
<!-- comment here -->
<div ng-app="namaModule" ng-controller="namaController"></div>{% endraw %}
{% endhighlight %}

