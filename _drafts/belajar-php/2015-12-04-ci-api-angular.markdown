# API Code Igniter & AngularJS Client #

## API Code Igniter

- codeigniter.zip ke /api
- app/config/database.php

```
$db['default']['hostname'] = 'localhost';
$db['default']['username'] = 'root';
$db['default']['password'] = '';
$db['default']['database'] = 'db_api';
```

- controller `server_api`

```
function __construct(){
	parent::__construct();
	$this->load->database();
}
function index(){
	
}
function getAll(){
	$q = $this->db->get('tb_api');
	$json = $q->result_array();
	$head = array("data_api"=>$json)
	echo json_encode($head, JSON_PRETTY_PRINT);
}
```

```

## API Component ##
faktor yang harus diperhatikan :
- URL (Routing)
- Proccess (Function)
- Output (JSON)
- Security KEY (API KEY)


## Client AngularJS ##

- file `client/apps.js`

```
<script src="angular.min.js" type="text/javascript"></script>
<script>
	var app = angular.module('clientApi', []);
	app.controller('apiCtrl', function($scope, $http){
		$http.get("/api/server_api/getAll").success(function(response){
			 	$scope.apis = response;
		});
	});
</script>
```

- file `client/index.html`

```
<table>
  <tr>
    <td>Kode</td> <td>Kode</td> <td>Nama</td> <td>Alamat</td>
  </tr>
  <tr ng-repeat="x in apis">
    <td>{{x.kode}}</td>
    <td>{{x.kode}}</td>
    <td>{{x.nama}}</td>
    <td>{{x.alamat}}</td>
  </tr>
</table>
```
