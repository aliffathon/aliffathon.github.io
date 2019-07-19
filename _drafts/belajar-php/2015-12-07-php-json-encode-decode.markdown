    <?php
    // koneksi ke database
    $c  = mysql_connect("localhost", "root", "");
    $db = mysql_selectdb("bukubase", $c);
     
    // jika tidak bisa terkoneksi ke database, hentikan proses.
    if(!$db){
        echo "Purcase DB! :p";
        exit();
    }
     
    // MEMBUAT DATA DENGAN FORMAT JSON
     
    // buat inisialisasi variabel dengan tipe data array yang masih kosong
    // ambil data dari tabel daftar_buku di database
    // kemudian masukkan data-data tersebut ke variabel $datas;
    $datas = array();
    $get = mysql_query("select * from daftar_buku order by buku_kode");
    while($data = mysql_fetch_array($get)){
        $datas[] = $data;
    }
     
    //konversi data array tadi menjadi "semuah string" dengan format json.
    $json_format = json_encode($datas);
     
    echo $json_format;
    echo "<br/>";
     
    // MENGOLAH DATA BERFORMAT JSON
    // true untuk menjadikannya array
    $json_data = json_decode($json_format,true);
     
    for($i=0; $i<count($json_data); $i++){
        echo $json_data[$i]['buku_kode']."<br/>";
        echo $json_data[$i]['buku_judul']."<br/>";
        echo $json_data[$i]['buku_penerbit']."<br/>";
        echo $json_data[$i]['buku_tahun']."<br/>";
        echo "<br/>";
    }
     
    echo "<br/>";
    foreach ($json_data as $thedata->buku_kode) {
        foreach ($thedata as $value) {
            echo $value['buku_kode']."<br/>";
            echo $value['buku_judul']."<br/>";
            echo $value['buku_penerbit']."<br/>";
            echo $value['buku_tahun']."<br/>";
            echo "<br/>";
        }
    }
     
    ?>