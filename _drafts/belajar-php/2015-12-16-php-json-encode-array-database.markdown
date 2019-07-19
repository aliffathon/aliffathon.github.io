## json_encode ##

- smp1 :

```
$ar = array('apple', 'orange', 'banana', 'strawberry');
echo json_encode($ar); // ["apple","orange","banana","strawberry"]
...
echo json_encode($ar, JSON_FORCE_OBJECT);
// {"0":"apple","1":"orange","2":"banana","3":"strawberry"} 
...
// ["apple","orange",1,false,null,true,8];
alert( ar[3] ); // false
...
$book = array(
    "title" => "JavaScript: The Definitive Guide",
    "author" => "David Flanagan",
    "edition" => 6
);
?>
<script type="text/javascript">
var book = <?php echo json_encode($book, JSON_PRETTY_PRINT) ?>;
/* var book = {
    "title": "JavaScript: The Definitive Guide",
    "author": "David Flanagan",
    "edition": 6
}; */
alert(book.title);
</script>
```


## 

