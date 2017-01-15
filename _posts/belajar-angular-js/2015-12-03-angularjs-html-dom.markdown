AngularJS : Events, DOM, Form, Input, Validation, Http n More.

- Angular is a JavaScript Framework

```
<script src="http://ajax.googleapis.com/ajax/libs/angular/1.4.8/angular.min.js"></script>
```

- Sample 1:

```
<input type="text" ng-model="nama">
<p ng-bind="nama"></p>
```
```
<div ng-app="" ng-init="nama='John Lenon'">
<p ng-bind="nama"></p>
<p data-ng-bind="nama"></p>
```

## Expression : {{ Output }} ##
+ Integer

```
Simple Calc : {{ 5 + 5}}
```
```
after div ng-init: qty=5,cost=15
expression : {{ qty * cost }}
data bind  : <span ng-bind="qty * cost"></span>
```

+ String

```
<input type="text" ng-model="nama"> {{ nama }}
<div ng-init="fName='John';lName='Lenon'">
  {{ fName + " " + lName }}
  <span ng-bind="fName + ' ' + lName"></span>
</div>
```

+ Object

```
<div ng-init="person={fName:'John',lName:'Lenon'}">
  {{ person.fName }}
  <span ng-bind="person.lName"></span>
</div>
```

+ Array

```
<div ng-init="angka=[2,3,5,7,11,13,17,19]">
  {{ angka[4] }}
  <span ng-bind="angka[4]"></span>
</div>
```

## Directive ##

+ ng-bind & {{ }}

```
<div ng-init="fName='John'">
  Nama: <input type="text" ng-model="fName">
  <br> Hallo, {{ fName }}
</div>

<div ng-init="qty=5;cost=15">
  Qty: <input type="number" ng-model="qty">
  Cost:<input type="number" ng-model="cost">
  <br> Total : {{ qty * cost }}
</div>
```

+ ng-repeat

```
<div ng-init="nama=['John','June','Jane']">
  <li ng-repeat="x in nama"> {{ x }} </li>
</div>
<div ng-init="nama=[
  {nama='John',addr='WDC'},
  {nama='June',addr='LA'}
  {nama='Jane',addr='NY'}]">
  <li ng-repeat="x in nama"> {{ x.nama + " " + x.addr }} </li>
</div>
```

+ ng-app & ng-init
  define app & initialize var&value

```
<html ng-app="myApp" ng-init="var=val">
<div ng-app="myApp" ng-init="var=val">
```

+ ng-model
  bind controls (input, select, textarea) to app-data
  valid: app-data number, email, required
  state: invalid, dirty, touched, error
  html: css-class and form-elemen
```

+ ng-disable

```
<div ng-init="mySwitch=true">
  <p> <button ng-disabled="mySwitch">DisableMe!</button> </p>
  <p> <input type="checkbox" ng-model="mySwitch">EnableMe</p>
  <p> {{mySwitch}} </p>
</div>
```

+ ng-show & ng-hide

```
<div ng-app="">
  <p ng-show="true">I'm visible</p>
  <p ng-show="false">I'm hidden</p>
  <!-- kebalikan dari ng-show: ng-hide -->
  <p ng-hide="true">I'm hidden</p>
  <p ng-hide="false">I'm visible</p>
</div>

<div ng-app="" ng-init="hour=13">
  <p ng-show"hour > 12">Sudah Masuk PM!</p>
</div>
```

---

- Application : 
  + module
    define angular app
  + controller
    control of angular app

```
<script>
var app = angular.module('personApp' []);
app.controller('personCtrl',
  function($scope){
	$scope.names = [
	  {nama:'Jane',kota:'WDC'}
	  {nama:'July',kota:'NY'}
	  {nama:'John',kota:'LA'}
	];
});
</script>
...
<div ng-app="personApp" ng-controller="personCtrl">
  <li ng-repeat="x in names"> {{ x.nama + ', ' + x.kota }} </li>
</div>
```

```
<script>
	// angular module('moduleAppName', []]);
	// array: [{index0:value0, index1:value1}]
	var app = angular.module('myApp', []);

	// angular controller ('ctrlName', callback);
	app.controller('myCtrl', function($scope){
		// controller property
		$scope.fName = "John";
		$scope.lName = "Lenon";
		// controller method()
		$scope.fulNm = function(){
			return $scope.fName + " " + $scope.lName;
		};
	});
</script>
...
<div ng-app="myApp" ng-controller="myCtrl">
First: <input type="text" ng-model="fName"> <br>
Last : <input type="text" ng-model="lName"> <hr>
Full : {{ fName + " " + lName }}
Full : {{ fulNm() }}
```

## Filter ##

|filter|desc|
|------|----|
|currency |num-to-currency     |
|filter   |item-subset-of-array|
|lowercase|string-to-lowercase |
|orderBy  |orderBy-expression  |
|uppercase|string-to-uppercase |

sample : expression

```
UPPER : {{ lName | uppercase }}
lower : {{ lName | lowercase }}
TOTAL : {{ (qty * price) | currency }}
<input type="type" ng-model="kota">
<li ng-repeat="x in names | orderBy:'kota'"> {{ x.kota | lowercase }} </li>
<li ng-repeat="x in names | filter:kota | orderBy:'kota'"> {{ x. kota }} </li>
```

## AJAX $http ##

- Data

```
{
"records": [
  {
    "Name": "Alfred Pennyworth",
    "City": "Gotham",
    "Country": "USA"
  },
  {
    "Name": "Bruce Wayne",
    "City": "Gotham",
    "Country": "UK"
  },
  {
    "Name": "Jim Gordon",
    "City": "Gotham",
    "Country": "USA"
  }
]
}
```
```
<script>
var app = angular.module('ajaxApp', []);
app.controller('ajaxCtrl', function($scope, $http){
	$http.get('cust_ajax.php')
	     .then(function(response){
	     	$scope.names = response.data.records;
	     });
});
</script>
...
<div ng-app="ajaxApp" ng-controller="ajaxCtrl">
<li ng-repeat="x in names"> {{ x.Name + ', ' + x.City + ', ' + x.Country }} </li>
</div>
```

## Table ##

```
<tr ng-repeat="x in names">
  <td> {{ $index + 1 }} </td> <!-- $index-ing -->
  <td> {{ x.nama }} </td>
  <td> {{ x.city }} </td>
  <td> {{ x.country }} </td>
</tr>
<tr ng-repeat="x in names">
  <td ng-if="$odd"> {{ x.name }} </td>
  <td ng-if="$even">{{ x.name }} </td>
  <td ng-if="$odd"> {{ x.country }} </td>
  <td ng-if="$even">{{ x.country }} </td>
</tr>
```

## SQL ##

```
<script>
var app = angular.module('phpApp', []);
app.controller('phpCtrl', function($scope, $http){
	$http.get('cust_mysql.php')
	// $http.get('cust_mysql.aspx')
	     .then(function(response){
	     	$scope.names = response.data.records;
	     });
});
</script>
```

|server|fetch_return|
|------|------------|
|php-mysql|json|
|php-ms.ac|json|
|aspnet-vb-ac|json|
|aspnet-razor-sqlite|json|

- cross site request `header("Access-Control-Allow-Origin: *");`

1. Server Code PHP-MySQL

```
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$db = new mysqli("localhost","root","","database");
$res= $db->query("SELECT companyName,city,country FROM customer");
$x = "";
while ($d = $res->fetch_array(MYSQLI_ASSOC)) {
	if($x != "") { $x .= ","; }
	$x .= '{"Name":"'  .$d["companyName"].'",';
	$x .= '"City":"'   .$d["city"]       .'",';
	$x .= '"Country":"'.$d["country"]    .'"},';
}
$x = '{"records": ['. $x .']}';
$db->close();
echo $x;
?>
```

2. Server Code PHP-Ms.Access
```
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=ISO-8859-1");
$db = new COM("PROVIDER=Microsoft.Jet.OLEDB.4.0;Data Source=customer.mdb");
$res= $db->execute("SELECT companyName,city,country FROM customer");
$x = "";
while (!$res->EOF) {
	if($x != "") { $x .= ","; }
	$x .= '{"Name":"'   .$d["companyName"].'",';
	$x .= '"City":"'   .$d["city"]       .'",';
	$x .= '"Country":"'.$d["country"]    .'"},';
	$res->MoveNext();
}
$x = '{"records": ['. $x .']}';
$db->close();
echo $x;
?>
```

## HTML DOM ##

ng-disabled ng-show ng-hide


## EVENT ##

- ng-click

```
<button ng-click="count = count + 1">ClickMe!</button> {{ count }}
<!-- hiding elemen -->
<button ng-click="toggle()">Toggle</button>
<p ng-hide="myVar"></p> <!-- hide elemen -->
<p ng-show="myVar"></p> <!-- show elemen -->
<script>
$scope.myVar = false;
$scope.myVar = true;
$scope.toggle = function(){ $scope.myVar = !$scope.myVar; };
</script>
```

## FORMS ##

controls : input button textarea select
```
<form novalidate> <!-- html5 disable validate -->
  <input type="text" ng-model="user.firstName">
  <input type="text" ng-model="user.lastName">
  <button ng-click="reset()">RESET</button>
  form  : {{ user }}
  master:{{ master }}
</form>
...
form  = {"firstName":"John","lastName":"Doe"}
master= {"firstName":"John","lastName":"Doe"}
...
<script>
var app = angular.module('myApp', []);
app.contrtoller('myCtrl', function($scope){
	$scope.master = {firstName: "John", lastName: "Doe"};
	$scope.reset  = function(){
		$scope.user = angular.copy($scope.master);
	};
	$scope.reset();
});
</script>
```

## INPUT VALIDATION ##

```
<form ng-app="appValid" ng-controller="validate" name="myForm" novalidate>
  <input type="text" name="user" ng-model="user" required placeholder="Username">
    <span ng-show="myForm.user.$dirty && myForm.user.$invalid"></span>
    <span ng-show="myForm.user.$error.required">Username is Required. </span>
  <input type="text" name="email" ng-model="email" required placeholder="Email">
    <span ng-show="myForm.email.$dirty && myForm.email.$invalid"></span>
    <span ng-show="myForm.email.$error.required">Username is Required. </span>
  <input type="submit"
    ng-disabled="myForm.user.$dirty && myForm.user.$invalid
    || myForm.email.$dirty && myForm.email.$invalid">
</form>
<script>
var app = angular.module('myApp', []);
app.contrtoller('myCtrl', function($scope){
	$scope.user = 'John Doe';
	$scope.email = 'john.doe@example.com';
});
</script>
```

|property |description    |
|---------|---------------|
|$dirty   |interacted     |
|$valid   |content valid  |
|$invalid |content invalid|
|$pristine|not interacted |


## API ##

| API | Desc |
|-----|------|
|angular.lowercase()|lowercase|
|angular.uppercase()|uppercase|
|angular.isString() |StringT/F|
|angular.isNumber() |NumberT/F|

$scope.x = angular.lowercase($scope.a);

## Angular + BootStrap ##

```
<tr ng-repeat="user in users">
  <td> {{ user.name }} </td>
  <td> {{ user.email}} </td>
  <td>
    <button class="btn" ng-click="editUser(user.id)">
    <span class="glyphicon glyphicon-pencil"></span>
     Edit </button>
    <button class="btn" ng-click="deleteUser(user.id)">
    <span class="glyphicon glyphicon-trash"></span>
     Delete </button>
   </td>
</tr>
...
<button class="btn btn-success" ng-click="editUser('new')">
  <span class="glyphicon glyphicon-user"></span> Create New User
</button>
...
<form class="form form-horizontal" ng-hide="hideform">
<h3 ng-show="edit">Create New User</h3>
<h3 ng-hide="edit">Edit User</h3>
<!-- input controls -->
<input type="text" ng-model="name" ng-disabled="!edit" placeholder="Username">
<input type="text" ng-model="email" ng-disabled="!edit" placeholder="Email">
<input type="text" ng-model="pass1" placeholder="Password">
<input type="text" ng-model="pass2" placeholder="Repeat Password">
<!-- save command -->
<button class="btn btn-success" ng-disabled="error || incomplete">
  <span class="glyphicon glyphicon-save"></span>
</button>
</form>
```

- myUsers.js

```
<script>
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope){
	$scope.name  = ''; //username
	$scope.email = ''; //email address
	$scope.pass1 = ''; //password new
	$scope.pass2 = ''; //password verify
	$scope.users = [
		{ id:1, name:"John Doe", email: "john.doe@example.com" },
		{ id:2, name:"John Smith", email: "john.smith@example.com" },
		{ id:3, name:"Jane Smith", email: "jane.smith@example.com" },
		{ id:4, name:"June Doe", email: "june.doe@example.com" },
		{ id:5, name:"Julie MA", email: "julie.ma@example.com" },
		{ id:6, name:"Janin SA", email: "janin.sa@example.com" }
	]; // daftar user sedia edit
	$scope.edit = true; 		//bisa di-edit
	$scope.error = false;		//tidak ada error
	$scope.incomplete = false;	//semua complete
	$scope.hideform = true;		//form disembunyikan
	$scope.editUser = function(id){
		$scope.hideform.false;	// tampilkan form edit
		if(id == 'new'){		// buat user baru
			$scope.edit = true;	// edit adl true
			$scope.incomplete = true;	// semua kosong
			$scope.name = '';	// kosongkan name
			$scope.email = '';	// kosongkan email
		} else {
			$scope.edit = false;// tampilkan form edit user
			$scope.name = $scope.users [id-1].name; //ambil username lama
			$scope.email= $scope.users [id-1].email;//ambil email lama

		}
	};

	$scope.$watch('pass1', function() { $scope.test(); }); //lakukan test: password
	$scope.$watch('pass2', function() { $scope.test(); }); //lakukan test: password
	$scope.$watch('name', function() { $scope.test(); });  //lakukan test: username
	$scope.$watch('email', function() { $scope.test(); }); //lakukan test: email

	// fungsi test/ validasi
	$scope.test = function(){
		if ( $scope.pass1 !== $scope.pass2 ) {
			$scope.error = true;	// password tidak sama
		} else {
			$scope.error = false;	// password sama
		}
	$scope.incomplete = false;		// semua telah terisi
	// cek data inputan
	if($scope.edit && (!$scope.name.length || !scope.email.length || 
		!$scope.pass1.length || !$scope.pass2.length )) {
		$scope.incomplete = true;	// masih ada inputan kosong; length=0;
	}

	}; //end test function
});
</script>
```

## Include HTML `ng-include` ##

```
<!-- begin file.html -->
<div ng-include="'file-outside.html'"></div>
<!-- end file.html -->
<!-- begin table.html -->
<table>
  <tr ng-repeat="x in names">
    <td> {{ x.name }} </td> <td> {{ x.email }} </td>
  </tr>
</table>
<!-- end table.html -->
```

## Sample Note App ##

```
<div ng-app="noteApp" ng-controller="noteCtrl">
  <p> <textarea ng-model="msg" cols="40" rows="10"></textarea> </p>
  <p>
    <button ng-click="save()">Save</button>
    <button ng-click="clear()">Clear</button>
  </p>
  <p> <span ng-bind="left()"></span> Character(s) left; </p>
</div>
<script>
var app = angular.module('noteApp', []);
app.controller('noteCtrl', function($scope){
	$scope.msg   = "";
	$scope.left  = function(){ return 100 - $scope.msg.length; };
	$scope.clear = function(){ $scope.msg = ""; };
	$scope.save  = function(){ alert("Note Saved"); };
});
</script>
```