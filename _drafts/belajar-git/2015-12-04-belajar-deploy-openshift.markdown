## Deploy Web Site Statis di OpenShift ##


## Pendaftaran & login ##
## Membuat Aplikasi ##
  '--> create your first application now'
  ### Choose application type : ###
  'cartridge/starter pack khusus: jekyll'
  ### Configure ###
  'public:' 'http://blog-bisnis.webhost.com'
  ### cloning ke directory local ###
  ```
  git clone ssh://xxxblog-bisnis-username.rhcloud.com/~/git/blog-bisnis.git/
  git add .
  git commit -m "perubahan"
  git push
  ```
## Install Aplikasi Openshift di PC ##
```
gem install openshift
rhc setup
```
`rhc app create jekyll https://raw.github.com/openshift-cartridges/openshift-jekyll-cartridge/master/metadata/manifest.yml`

## Proses Deployment via git ##
```
git clone ssh://54d478d14382ec586c000058@blogbisnis-endymuhardin.rhcloud.com/~/git/blogbisnis.git blogbisnis
cd blogbisnis
git add -A .
git commit -m "commit pertama website jekyll"
git push
```

## Custom domain ##
