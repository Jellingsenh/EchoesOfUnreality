SETUP INSTRUCTIONS (MacOS):
<br>
Open terminal
<br>
Install homebrew (https://docs.brew.sh/Installation)
<br>
Install Maven (brew install maven)
<br>
Point your JAVA_HOME variable at your Maven jdk (add 'export JAVA_HOME="/opt/homebrew/Cellar/openjdk/25.0.2/libexec/openjdk.jdk/Contents/Home"' to your .bash_profile or ./zshrc file)
<br>
Install MongoDB (brew tap mongodb/brew && brew install mongodb-community)
<br>
Set db path in MongoDB config file (/opt/homebrew/etc/mongod.conf) to a valid directory on your machine (ex: {your_path_here}/EchoesOfUnreality/database/)
<br>
Install Npm (brew install node)
<br>
Create ReactTs project with Vite (npm create vite@latest frontend -- --template react-ts)
<br>
navigate to the EchoesOfUnreality directory
<br>
chmod +x startEchoes.command
<br>
./startEchoes.command
<br>



