# Tutorial membuat dan membaca format JSON #

(sumber)[http://www.phpindonesia.net/Create-JSON-dan-Parsing-JSON-dengan-PHP]

## Apa Itu JSON ##

JSON (JavaScript Object Notation) adl Format pertukaran data yang ringan dan mudah dibaca/ditulis oleh manusia, serta mudah diterjemahkan(generate) oleh komputer.

contoh JSON :
```
{"posts":[
	{
	"headline":"The Headline for Post 1",
	"body":"Lorem Ipsum",
	"posted_on":"Feb 11, 2014",
	"posted_by":"administrator"
	},
	{
	"headline":"The Headline for Post 2",
	"body":"Lorem Ipsum",
	"posted_on":"Feb 12, 2014",
	"posted_by":"administrator"
	}
]}
```


## Create JSON ##

### Query Result ###

- Database Table

```sql
CREATE TABLE `artikel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `headline` varchar(100) DEFAULT NULL,
  `body` text,
  `postdate` int(11),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
```

- Data Sample

```sql
INSERT INTO artikel(id,headline,body,postdate)
VALUES('1','The Headline for post 1','Lorem ipsum dolor sit posting 1','1351570931');
INSERT INTO artikel(id,headline,body,postdate)
VALUES('2','The Headline for post 2','Lorem ipsum dolor sit posting 2','1351570931');
INSERT INTO artikel(id,headline,body,postdate)
VALUES('3','The Headline for post 3','Lorem ipsum dolor sit posting 3','1351570931');
```

- file `json_generate.php`

```
<?php
$db = new mysqli('localhost','root','','dblat');
$qr = $db->query("SELECT * FROM artikel");
if($qr->num_rows > 0){
	while($row = $qr->fetch_array()){
		$res[] = $row;
	}
} else {
	$res[] = array();
}
echo json_encode(array('artikel'=>$res));
?>
```

## READ & PARSING JSON ##

- file `json_parsing.php`

```
<?php
$json_url = "json_generate.php";
$ch = curl_init($json_url);
$opt = array(
	CURLOPT_RETURNTRANSFER => TRUE,
	CURLOPT_HTTPHEADER => array('Content-type: application/json'),
	CURLOPT_POSTFIELDS => $json_string
	);
curl_setopt_array($ch, $opt);
echo $result = curl_exec($ch);

// decode dari format json
$decode = json_decode($result, true);
print_r($decode);
?>
```

Contoh result_array :

```
Array (
   [artikel] => Array (
       [0] => Array (
	         [id] => 1
	         [headline] => The Headline 1
	         [body] => Lorem ipsum dolor sit posting 1
	         [postdate] => 1351570931
	         )
       )
)
```

Cara Parsing array :

```
echo $decode['artikel'][0]['headline'];
//akan menghasilkan The Headline 1
echo $decode['artikel'][0]['body'];
//Lorem ipsum dolor sit posting 1
```

Output dalam perulangan :

```
foreach($decode['artikel'] as $row){
       echo "<div id='content'>";
       echo "<p id='judul'>".$row['headline'] ."</p>";
       echo "<p id='isi'>".$row['body'] ."</p>";
       echo "<p id='tanggal'>".$row['postdate'] ."</p>";
       echo "</div>";
}
```

