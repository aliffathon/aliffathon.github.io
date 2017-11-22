# WEB Services dengan PHP PDO #

## database & table ##

- `koneksi.php`

```
<?php
class Koneksi{
	protected $dns = "mysql:host=localhost;dbname=test";
	protected $dbu = "root";
	protected $dbp = "";
	protected $kon = "";

	public function getKon(){
		try{
			$db = new PDO($this->dns, $this->dbu, $this->dbp);
			$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXECTION);
			if($db==FALSE){
				throw new Exception("Koneksi Gagal");
			} else {
				$this->konek = $db;
			}
		} catch (Exception $x){
			echo "Error : ".$x.getMessage();
		}
		return $this->konek;
	}

	public function closeKon(){
		$this->konek = NULL;
	}
}

class ActiveRecord extends Koneksi {
	
	public function fetchObject($sql){
		$clone = array();
		try{
		   $data =  $this->getKon()->prepare($sql);
		   $data->setFetchMode(PDO::FETCH_INTO,$this);
		   $data->execute(); 
		   while($result = $data->fetch()){
			$clone[] = clone $result;
		   }
		   $this->closeKon();
		}catch(PDOException $e){
		    echo $e->getMessage();
		}
	       return $clone;
		}
}
?>
```

- file `mhs.php`

```
<?php
class MhsWebSvc {
	protected $name;
	protected $umur;
	protected $api = khss999999; //klien api
	public function setNama($nama){ $this->nama = $nama; }
	public function getNama(){ return $this->nama; }
	public function setUmur($umur){ $this->umur = $umur; }
	public function getUmur(){ return $this->umur; }
	public function validateAPI($api){ if($this->api != $api) return false; return true; }
	public function getMhs(){
		$objAr = new ActiveObject();
		$qr = "SELECT * FROM mhs WHERE 1=1";
		if($this->getNama()){
			$qr .= " AND nama LIKE '%{$this->getNama()}%'";
		}
		if($this->getUmur()){
			$qr .= " AND umur LIKE '%{$this->getUmur()}%'";
		}
		return $objAr->fetchObject($qr);
	}
}
?>
```

- file `server_api.php`

```
<?php
header('Content-Type: application/json');
$hasil  = array();
$s_name = $_GET['name'];
$s_umur = $_GET['umur'];
$s_API  = $_GET['API'];
$mhs = new MhsWebService();
if($mhs->validateAPI($s_API)){
	$mhs->setName($s_name);
	$mhs->setUmur($s_umur);
    $data = $mhs->getMhs();
    reset($data);
    $i=0;
    while(list(,$r) = each($data)){
    	$h[$i]['nama'] = $r->nama;
    	$h[$i]['umur'] = $r->umur;
    	$h[$i]['alamat'] = $r->alamat;
    	$i++;
    }
    $h['status'] = TRUE;
} else {
	$h['status'] = FALSE;
}

echo json_encode($h, JSON_PRETTY_PRINT);
?>
```


- file `akses_data.html`

```
<form method="get" action="">
	<input type="text" name="nama" placeholder="Nama...">
	<input type="text" name="umur" placeholder="Umur...">
	<button type="submit">Cari</button>
</form>
<?php
if($_GET){
	$snama = isset($_GET['nama'] ? $_GET['nama'] : '');
	$sumur = isset($_GET['umur'] ? $_GET['umur'] : '');
	$url   = "web_service.php?API=khss8363621&name={$s_name}&umur={$s_umur}";
	$cols  = array('nama'=>$snama, 'umur'=>$sumur);
	$data  = http_build_query($cols);
	$header= stream_context_create(array(
		'http'=>array(
			'method'=>'GET',
			'header'=>'Content-Type: application/x-www-form-urlencoded',
			'content'=> $data
			);
		);
	);
	$result file_get_contents($url, false, $header);
	$var = json_encode($result, true);
	echo "<pre>";
		print_r($var);
	echo "</pre>";
}
?>
```