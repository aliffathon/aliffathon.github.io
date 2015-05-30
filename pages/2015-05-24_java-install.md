tar xzvf oracle-java-jdk.tar.gz
mv jdk /opt

vi /etc/profile
	export JAVA_HOME=/opt/jdk
	export JRE_HOME=$JAVA_HOME/jre
	export OLD_PATH=$PATH
	export PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$PATH

install java, javac, javaws, jar
update-alternatives --install <link> <name> <path> <no>
sudo update-alternatives --install "/usr/bin/java" "java" "/opt/jdk/bin/java" 1
sudo update-alternatives --set java /opt/jdk/bin/java
which java; java -version

