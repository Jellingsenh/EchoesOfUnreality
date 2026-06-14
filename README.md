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
Set dbPath in MongoDB config file (/opt/homebrew/etc/mongod.conf) to a valid directory on your machine (ex: {your_path_here}/EchoesOfUnreality/database/MongoDatabase)
<br>

Install Npm (brew install node)
<br>
Install react dependencies: 
<br>
npm install react-intersection-observer
<br>
npm install @base-ui/react
<br>
(npm install react-select)
<br>
npm install @mui/icons-material @mui/material @emotion/react @emotion/styled
<br>
npm install mui-tiptap
<br>

<br>
Create React Typescript project with Vite (npm create vite@latest frontend -- --template react-ts)
<br>
navigate to the EchoesOfUnreality directory (cd {your_path_here}/EchoesOfUnreality)
<br>
Grant permissions to the start script (chmod +x startEchoes.command)
<br>
Start the program (./startEchoes.command)
<br>
<br>
<br>
<br>
<br>
HOSTING:
<br>
nginx
<br>



