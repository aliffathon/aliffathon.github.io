date: 2015-12-13 11:09
title: tutorial angularjs html5
author: aliffathon


## Bagian 1 : CDN dan Local Lib ##
```html
<script type="text/javascript" src="lib/Angular/angular.min.js"></script>
```

## Bagian 2 : Simple ng-app ##
- Simple App
```html
<html ng-app>
```
- Input & Output
```html
<input type="text" ng-model="name">
<h2> Welcome {{name}} </h2>
```

## Bagian 3 : inner script data ##
- Inner Script Function
```js
function controller($scope){
  $scope.datakaryawan = {
    'nama' = 'Nana',
    'jabatan' = 'Direktur',
    'usia' = '28 tahun'
  }
}
```
- HTML Output
```html
<div ng-controller = "controller">
  <h1> {{datakaryawan.nama}} </h1>
  <h2> {{datakaryawan.jabatan}} </h2>
  <h3> {{datakaryawan.usia}} </h3>
</div>
```

## Bagian 4 : ng-app=myApp ##
- index.html
```html
<html ng-app="myApp">
...
<script src="controller.js">
...
<div ng-controller = "controller">
  <h1 {{datakaryawan.nama}} </h1>
</div>
```
- controller.js
```js
var myApp = angular.module("myApp", []);
myApp.controller(
  "controller",
  function controller($scope) {
    $scope.dataKaryawan = {
       'nama' : 'Nunung',
       'jabatan' : 'Jabat Tangan',
       'usia' : '1000 Tahun'
    }
  }
)
```

## Bagian 5 : Array Data ##
- index.html
```
<div class="main" ng-controller="controller">
  <li class="itemHolder" ng-repeat="item in datakaryawan">
    <div>
      <h3>Nama : {{item.nama}} </h3>
      <p> Jabatan : {{item.jabatan}} </p>
      <p> Usia : {{item.usia}} </p>
    </div>
```
- controller.js
```
var myApp = angular.module("myApp", []);
myApp.controller("controller",
function controller($scope) {
    $scope.dataKaryawan = [
        {
            "name" 	 : "1. Nunung",
            "jabatan": "Jabat Tangan.",
            "usia"	 :  "1000 Tahun"
        },
        {
            "name" 	 : "2. Pamungkas",
            "jabatan": "Jabat Kaki.",
            "usia"	 :  "101 Dalmation"
        },
        {
            "name" 	 : "3. Jayuda",
            "jabatan": "Jabat Hati.",
            "usia"	 :  "1 Hari"
        }
    ]
}
);
```

## Bagian 6 : JSON ##
- data.json
```
[
    {
        "name" 	 : "1. Nunung",
        "jabatan": "Jabat Tangan.",
        "usia"	 :  "1000 Tahun"
    },
    {
        "name" 	 : "2. Pamungkas",
        "jabatan": "Jabat Kaki.",
        "usia"	 :  "101 Dalmation"
    },
    {
        "name" 	 : "3. Jayuda",
        "jabatan": "Jabat Hati.",
        "usia"	 :  "1 Hari"
    }
]
```
- controllers.js
```
var myApp = angular.module("myApp", []);
myApp.controller(
        "controller", 
        [   
            '$scope',
            '$http',
            function($scope, $http) {
                $http.get('data.json').success (
                    function(data){$scope.dataKaryawan = data;});
            }
        ]
);
```

## Bagian 7 : ng-model ##
- controllers.js
```
var myApp = angular.module("myApp", []);
myApp.controller(
        "controller", 
        [   
            '$scope',
            '$http',
            function($scope, $http) {
                $http.get('js/data.json').success (function(data){
                    $scope.dataKaryawan = data;
                    $scope.orderKaryawan = 'name';
                });
            }
        ]
);
```
- index.html
```
<!-- search -->
<input type="text" ng-model="query">
...
<!-- sortin -->
<select ng-model="orderKaryawan">
  <option value="name" seleced> name </option>
  <option value="reknown"> reknown </option>
</select>
<!-- orderin -->
<input type="radio" ng-model="direction" name="direction" checked> Asc
<input type="radio" ng-model="direction" name="direction" value="reverse"> Desc
<!-- listing -->
<li class="itemHolder" ng-repeat="item in datakaryawan | filter:query | orderBy:orderKaryawan:direction" >
<div> Nama : {{item.nama}} <br>Jabatan : {{item.jabatan}} <br>Usia : {{item.usia}} <hr> </div>
</li>
```
