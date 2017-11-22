# API PHP MySQL Sederhana #

api url: `http://api.hostname.domain/api_names/`

file `api_names/get.php`

```
if(isset($_GET['format']) && intval($_GET['num'])){
	$format = $_GET['format'];
	$num    = $_GET['num'];

	$conn   = new mysqli('localhost','username','password','database');
	$query  = $conn->query("SELECT * FROM table ORDER BY column DESC LIMIT ?", $num);
	if($format == 'json'){
		$res= array();
		while($r = $query->fetch_assoc()){
			$rs[]= array('title'=>$r);
		}
		$out = json_encode(array('titles'=>$rs));
	} elseif($format == 'xml'){
		header('Content-type: text/xml');
		$out = "<?xml version=\"1.0\"?>\n";
		$out.= "<propertis>\n";
		for($i=0; $i < $query->num_rows; $i++){
			$row = $query->fetch_assoc();
			$out.= "<property>\n". "<property_id>". $row['col_id'] ."</property_id>\n";
			$out.= "<property_name>". $row['col_name'] ."</property_name>";
			$out.= "</property>\n";
		}
		$out .= "</properties>";
	} else {
		die('Improper Response Format');
	}
	echo $out;
}
```