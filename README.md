# Video Conferencing
This is a Video Conferencing Web Application.

As Chrome,FireFox and Safari browsers support WebRTC API interface, so that I can built a primitive Video Conferencing Web Application.

The web application is divided into 2 part: front end and back end.

Currently, I build front end with React framework and bootstrap, I am using Express to build backend.

Moreover, I am using Peerjs library to handle the WebRTC communication between browser.

**Software Requirement**

   1. Node.JS
   2. A SSL cert for your domain.

> If your server is connected to the internet directly, please amend the api/server.js to include the certificate to the server.

**Installation**

   1. Go to the /api folder,enter the following command to install all the dependencies:
      
          npm install
      
   2. Go to the /client folder, enter the following command to install all the dependencies:
   
          npm install
          
   3. Enter the following command to build the front end code:          
    
          npm run build

   4. After the building process, a "build" folder is generated.
   
   5. Go to the /api folder, create a symbolic link "build" to point to the /client/build folder.
   
   > For Linux OS, please refer the ln command; for Windows OS, please refer the mklink command.
   
   6. Finally, enter the following command to start the application.
   
             npm start
