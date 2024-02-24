# 2024-SHIELD-SolutionChallenge
## Camera
This is the camera arduino code for ESP32-CAM. </br>
Prgrammed to take a picture every 1 minute and sends the picture to AWS API gateway. </br>

## Backend
Here's what you need to do before you run the code </br>

: Create a database named 'shield' with the root account on the MySQL Workbench. And in the application.properties file in the shield-backed folder, replace the password for 'spring.datasource.password=password' with your root account password. </br>

: Download the files on S3 from EC2. Use Putty and Puttygen to replace the .pem keypair received from aws with .ppk. Use FileZilla to access EC2 and download the files on EC2 (the files in the S3 bucket) to your local computer. (In this process, the keypair changed to .ppk will be used.) Put the downloaded directory path into the phrase 'private final String downloadDirectory = "directory path where downloaded files are stored";' in the EC2Service class. Then write your S3 bucket name in the "BucketName" in the FireController class.</br>

## Frontend
After importing the file, enter the "npm install" command in the terminal. </br>
Next, run with "npm run dev".
