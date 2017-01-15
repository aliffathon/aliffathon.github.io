## js : json.parse ##

```
var json = '["apple","orange","banana","strawberry"]';
...
var data = JSON.parse(json);
console.log(data); // ["apple", "orange", "banana", "strawberry"]
alert( data[3] ); // "strawberry"
...
var data2 = eval( '(' + json + ')' );
console.log(data2); // ["apple", "orange", "banana", "strawberry"]
alert( data2[2] ); // "banana"
```

```
$books = array(
    array(
        "title" => "Professional JavaScript",
        "author" => "Nicholas C. Zakas"
    ),
    array(
        "title" => "JavaScript: The Definitive Guide",
        "author" => "David Flanagan"
    ),
    array(
        "title" => "High Performance JavaScript",
        "author" => "Nicholas C. Zakas"
    )
);
...
// using JSON.parse on the output of json_encode
var books = JSON.parse( '<?php echo json_encode($books); ?>' );

/* output (with some whitespace added for readability)
[
    {"title":"Professional JavaScript", "author":"Nicholas C. Zakas"},
    {"title":"JavaScript: The Definitive Guide", "author":"David Flanagan"},
    {"title":"High Performance JavaScript", "author":"Nicholas C. Zakas"}
]
*/

// how to access
console.log( books[1].author ); // David Flanagan
```

```
