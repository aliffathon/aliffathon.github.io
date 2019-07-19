# Chain Dropdown in PHP #

- file `apps.js`

```
<script src='jquery.js'></script>
<script>
jQuery(document).ready(function(){
    jQuery("#provinsi").change(function(){
        var getValue= jQuery(this).val();
        if(getValue == 0)
        {
            jQuery("#kota").html("<option>Pilih Provinsi Dulu</option>");
        }
        else
        {
            jQuery.getJSON('getdata.php',{'idprovinsi' : getValue},function(data){
                var showData;
                jQuery.each(data,function(index,value){
                    showData += "<option>"+value.kab_kota+"</option>";
                });
                jQuery("#kota").html(showData);
            });
        }
    });
});
</script>
```

- file `query.php`

```
<select name="provinsi">
	<option value="0">pilih provinsi</option>
<?php
$sql = "SELECT * FROM datas";
$q = $db->query($sql);
$o = "";
while($z = $q->fetch_object()){
	$o .= '<option value="' .$z->id_prov. '">' .$z->nama_prov. '</option>';
}
echo $o;
?>
</select>
```

- script `pilih_kota.js` sub-menu/dropdown

```
<script type="text/javascript">
	$(function(){
		$("#prov").change(function(){
			var vals = $(this).val();
			if(vals == 0){
				$("#kota").html("<option>Pilih Provinsi Dulu</option>");
			}
			else
			{
				$.getJSON('getdata.php', {'id_prov':vals}, function(data){
					var showData;
					$.each(data, function(index, value){
						showData += "<option>"+value.kota+"</option>";
					});
					$("#kota").html(showData);
				});
			}
		});
	});
</script>
```

- output sub-dropdown

```
<?php 
$id = isset($_GET['id_prov']) ? intval($_GET['id_prov']) : 0;
$sq = "SELECT * FROM kota WHERE id_kota='$id'";
$q = $db->query($sq);
$r = array();
while($h = $q->fetch_array()){
	$r[] = $h;
}
$data = array('kota'=>$r);
$json = json_encode($data, JSON_PRETTY_PRINT);
echo $json;
?>
```