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

echo Npm version:
npm -v
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

echo Building backend...
cd /Users/joshua/Code/EchoesOfUnreality/backend
mvn clean install
echo 

echo Building frontend...
cd /Users/joshua/Code/EchoesOfUnreality/frontend
npm install
# npm run build # production mode
echo 

echo ~~~ Starting database ~~~
brew services start mongodb-community
echo Verifying database started...
brew services list
echo 

startBackend() { 
    echo ~~~ Starting backend ~~~
    echo 
    cd /Users/joshua/Code/EchoesOfUnreality/backend/target
    java -jar echoes-of-unreality-1.0.jar
    echo 
    echo ~~~ Backend stopped ~~~
}

startFrontend() {
    echo ~~~ Starting frontend ~~~
    echo 
    cd /Users/joshua/Code/EchoesOfUnreality/frontend
    npm run dev # development mode
    # npx serve -s build # production mode
    echo 
    echo ~~~ Frontend stopped ~~~
}

startFrontend & startBackend
wait

## ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
## execution pauses while frontend and backend run
## ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

echo 
brew services stop mongodb-community
echo Verifying database stopped...
brew services list
echo 

echo ~~~ Database stopped ~~~
echo 

echo ~~~ Echoes of Unreality World Generator Stopped ~~~
echo 