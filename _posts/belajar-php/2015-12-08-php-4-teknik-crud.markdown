# Teknik Pemrograman dengan PHP #


1. PHP-Prosedural
2. PHP-Object Oriented
3. PHP-Data Object
4. PHP-ORM


(#prosedural)[#prosedural]

```
<?php
$conn  = mysqli_connect($host, $user, $pass, $dbase);
$query = mysqli_query($sql);
$result= mysqli_fetch_array($query);
$rows  = mysqli_num_rows($query);
?>
```

(#object-oriented)[#object-oriented]

```

<?php
$conn  = new mysqli($host, $user, $pass, $dbase);
$query = $conn->query($sql, $params);
$result= $query->fetch_assoc();
$rows  = $query->num_rows;
$stmt  = $conn->stmt_init();
$stmt->prepare($sql);
$stmt->bind_param("s", $cols);
$stmt->execute();
?>
```

(#data-object)[#data-object]

```
<?php
$conn  = new PDO("mysql:host=localhost;database=dbase","username","password");
$stmt  = $conn->prepare($sql);
$stmt->execute(array($params));
$sql_i = "INSERT INTO table VALUES (?,?)";
$sql_u = "UPDATE table SET column=? WHERE key=?";
$sql_d = "DELETE FROM table WHERE key=?";
$sql_s = "SELECT * FROM table WHERE key=?";
$query = $conn->query($sql);
$result= $query->fetch(PDO::FETCH_OBJ);
?>
```


(#orm-active-record)[#orm-active-record]

```
<?php
// model
class Model extends ActiveRecord\Model{
	static $table_name = 'table';
	static $primary_key= 'col_id';
}
// connect
ActiveRecord\Config::Initialize(function($cfg){
	$cfg->set_model_directory('model');
	$cfg->set_connections(array('development'=>'mysql://root@127.0.0.1/database'));
});
// read
$object = new Model();
$data   = object->find('all');
foreach($data as $column){ $column->col_name; }
// create
$object->property_name = $values;
$object->save();
// update
$object = Model::find($where);
$object->column = $new_values;
$object->save();
// delete
$object = Model::find($where);
$delete = $object->delete();
?>
```

- MVC : Model-View-Controller
- HMVC: Modul/Komponen dalam satu folder