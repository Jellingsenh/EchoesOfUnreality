echo 
echo ~~~ Echoes of Unreality World Generator ~~~
echo 

echo Homebrew version:
brew -v
echo

echo Updating and upgrading homebrew:
brew update
brew upgrade
echo 

echo Checking versions and config...
echo 

echo Maven version:
mvn -v
echo 

echo Java version:
java -version
echo 

echo MongoDB version:
mongod --version
echo 

echo MongoDB database path:
grep dbPath /opt/homebrew/etc/mongod.conf
echo 

echo ~~~ Starting database ~~~
brew services start mongodb-community
echo Verifying database started...
brew services list
echo 

echo Building backend...
cd /Users/joshua/Code/EchoesOfUnreality/backend
mvn clean install
echo 

echo ~~~ Starting backend ~~~
cd target
java -jar echoes-of-unreality-1.0.jar
echo 

## ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
## execution pauses while backend runs
## ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

echo ~~~Backend stopped ~~~
echo 

brew services stop mongodb-community
echo Verifying database stopped...
brew services list
echo 

echo ~~~ Database stopped ~~~
echo 
