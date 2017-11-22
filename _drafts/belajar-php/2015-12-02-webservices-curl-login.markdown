# WEBservices dengan curl - login #

(sumber)[http://www.phpindonesia.net/cURL-dan-Webservices]

Q: Login web menggunakan Akun web Lain
A: 1. jika sistem yang satu bisa ngakses database sistem yang satunya lagi.. tinggal di konekin ke database tersebut untuk validasi loginnya
   2. Jika ingin menggunakan webservice, pastikan di sistem yang buat ngecek login-nya itu nyediain API-nya, kalo nggak ada ya.. gak bisa tho?

```
CREATE TABLE user (
	email varchar(100) NOT NULL,
	username varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	PRIMARY KEY(email)
);

INSERT INTO user (email,username,password)
VALUES ('faiz.fadly@gmail.com','faiz fadly', '21232f297a57a5a743894a0e4a801fc3');
INSERT INTO user (email,username,password)
VALUES ('faiz_fadli@yahoo.com','Adly', 'fe01ce2a7fbac8fafaed7c982a04e229');
## faiz : admin
## adly : demo
```

API B - Login Data
```
$email = $_POST['email'];
$password = $_POST['password'];
$q = $db->get_where('user', array('username'=>$username, 'password'=>$password));
while($d = $q->fetch_assoc()){ $posts[] $d; }
echo json_encode(array('user'=>$posts), JSON_PRETTY_PRINT);
```


API B - Form Login
```
function login($url, $email, $pass){
	$du = array(
		'email'=> $email,
		'password'=>$pass
	);
	$pdu= "";
	foreach($du as $c => $v){
		$pdu .= $c ."=". $v ."&";
	}

	//$postData = http_build_query($user_data);
	$curlHandle = curl_init();
	curl_setopt($curlHandle, CURLOPT_URL, $url);
	curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $postdatauser); //
	curl_setopt($curlHandle, CURLOPT_HEADER, 0);
	curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curlHandle, CURLOPT_TIMEOUT,30);
	curl_setopt($curlHandle, CURLOPT_POST, 1);
	$string = curl_exec($curlHandle);
	curl_close($curlHandle);

	$return $string;
}
```

Usage & Result :
```
echo doLogin("http://localhost/sistem_A/api.php",$_POST[“email”], $_POST[“password”]);
```

```
{"user":[
	{
	"email":"faiz.fadly@gmail.com",
	"username":"faiz fadly",
	"password":"21232f297a57a5a743894a0e4a801fc3"
	}
]}
```

Decode Data JSON kembali

```
$string   = doLogin("http://localhost/sistem_A/api.php",$username,$password);
$arr      = json_decode($string,true);
$email    = $arr['user'][0]['email'];
$password = $arr['user'][0]['password'];\
```

Lakukan Pengecekan login:

```
if($email != ""){
	session_start();
	$_SESSION['email'] = $email;
	$_SESSION['password'] = $password;
	header("location: dashboard.php");
} else {
	header("location: login.php");
}