---
layout: post
title: Angular - First App
categories: angularjs
tags: [tutorial, angularjs, javascript, framework]
---

## Prequel ##
---


{% highlight html %}
<script type="text/javascript" src="lib/Angular/angular.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular.js"></script>
{% endhighlight %}





## [4. First Application](#first-app) ##
---

{% highlight html %}
{% raw %}<script src="apps.js" type="text/javascript"></script>
<script>
	var app = angular.module('appSatu', []);
	app.controller('controllerSatu',
		function($scope, $http){
			// scope data
			$scope.nama = '--masukan nama anda--';
			$scope.email = '--masukan email anda--';
			$scope.tglLahir = '--masukan tgl lahir anda--';
			$scope.alamat = {
			  desa:'Bojongsari 1/9',
			  kec: 'Purbalingga Utara',
			  kab: 'Purbalingga',
			  prov: 'Jawa Tengah',
			  negara : 'Indonesia',
			  pos: '53774'
			}
			// ajax send-get-json
			$http.get('data.json')
				 .success(
				 	function(result)
			 		{
			 			$scope.hasilData = result;
			 		}
				 );
		});
</script>
<!-- comment here -->
<div ng-app="appSatu" ng-controller="controllerSatu">
Masukan Nilai Disini : <input type="text" ng-model="inputan">
Output tertampil disini : {{ inputan }}
atau dengan cara ini : <div ng-bind="inputan"></div>
<!-- comment here -->
nama : <input type="text" ng-model="nama">
email : <input type="text" ng-model="email">
tanggal lahir : <input type="text" ng-model="tglLahir"> <span>dd/mm/yyyy</span>
<!-- comment here -->
nama {{ nama }}
email {{ email }}
tanggal lahir {{ tglLahir }}
alamat - desa {{ alamat.desa }},
		 kec. {{ alamat.kec }},
		 kab. {{ alamat.kab }},
		 prov. {{ alamat.prov }},
		 negara. {{ alamat.negara }},
		 pos. {{ alamat.pos }}
<!-- comment here -->
<!-- output dengan opsi -->
<li class="itemHolder" ng-repeat="i in array | filter:pencarian | orderBy:selectOpsiValue:reverse">
	{{ 'Nama Field:' + i.namaField + ', Field 2: ' + i.field2 }}
</li>
<!-- comment here -->
<!-- menampilkan array via index -->
{{ namaArray[indexno] }}
<!-- menampilkan array via object -->
{{ namaArray.namaField }}
</div>{% endraw %}
{% endhighlight %}
