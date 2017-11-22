# Belajar menggunakan Jekyll #
#### Static web generator ####


## Install Jekyll dan Dependencies ##

- install ruby, ruby-dev dan make
```
sudo apt-add-repository ppa:brightbox/ruby-ng 
sudo apt-get install ruby
sudo apt-get install ruby-dev
sudo apt-get install make gcc nodejs
```

- install jekyll
```
sudo gem install jekyll --no-rdoc --no-ri
```

- start jekyll
  ```
  jekyll -v
  jekyll serve
  ```
  + memantau perubahan dan generate otomatis
  ```
  jekyll serve -w
  ```

  + menjalankan pada port tertentu
  ```
  jekyll serve --port 4001
  ```

  + menggunakan file _config.yml tertentu
  ```
  jekyll serve --config _config-local.yml
  ```

  + meng-generate file tanpa menjalankan server
  ```
  jekyll build
  ```

  + update jekyll
  ```
  sudo gem udpate jekyll --no-rdoc --no-ri
  sudo gem update github-pages --no-rdoc --no-ri
  ```

  + 

- install github pages dan perintah git
```
sudo apt-get install git
sudo gem install github-pages --no-rdoc --no-ri
```

- membuat/mengambil content website
```
git clone git://github.com/mchelen/michaelchelen.net.git
cd michaelchelen.net
```
```
jekyll new <nama-web-baru>
cd <nama-web-baru>
```