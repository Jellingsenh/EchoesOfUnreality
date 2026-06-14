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

echo Node version:
node --version
echo 

echo Vite version:
(cd /Users/joshua/Code/EchoesOfUnreality/frontend && npm list vite) 

echo Npm version:
npm -v
echo 

echo Building frontend...
(cd /Users/joshua/Code/EchoesOfUnreality/frontend && npm install && npm run build)
echo 

echo Building backend...
(cd /Users/joshua/Code/EchoesOfUnreality/backend && mvn clean install)
echo 

echo ~~~ Starting database ~~~
brew services start mongodb-community
echo 

echo Verifying database started...
brew services list
echo 

echo MongoDB database port:
grep port /opt/homebrew/etc/mongod.conf
echo 

startBackend() { 
    echo ~~~ Starting backend ~~~
    echo 
    (cd /Users/joshua/Code/EchoesOfUnreality/backend/target && java -jar echoes-of-unreality-1.0.jar)
    ## ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
    echo ~~~ Backend stopped ~~~
    echo 
}

startFrontend() {
    echo ~~~ Starting frontend ~~~
    # echo 
    (cd /Users/joshua/Code/EchoesOfUnreality/frontend && npm run dev) # dev or preview
    ## ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
    echo ~~~ Frontend stopped ~~~
    echo 
}

startFrontend & startBackend
wait

## ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
## execution pauses while frontend and backend run
## ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

brew services stop mongodb-community
echo Verifying database stopped...
brew services list
echo 

echo ~~~ Database stopped ~~~
echo 

echo ~~~ Echoes of Unreality World Generator Stopped ~~~
echo 