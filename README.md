Introduction
Railway Management System is a web application built using Node.js, Express.js, and MySQL, designed to manage train schedules, seat availability, and bookings. 
This README provides step-by-step instructions for setting up and running the project on your local machine.

Requirments : This is to be installed in your PC 
Node.js and npm (Node Package Manager)
MySQL Server

1.
clone the repo:
run this - git clone https://github.com/Himanshu30122002/Railway_managementsystem.git

2. mysql Database:
 All the userschema used is kept in "models" file in the the project directory - every sql command is there in models like creating and using database //just need to copy and make databases in the mysql

Important and caution:
check that mysql server is running  // we can check using (in windows - search - services and check if mysql80 or mysql server is in running state).
In index.js file for connection of mysql and nodejs - your username , your password , your database name(if same models file is run in mysql no need to change database name because database name is user).

 

    

3.
navigate to the project directory:
cd Railway_managementsystem

4.
install dependencies:
npm init or npm install

5.
Install this on your desired text/code editor using terminal

a. npm install mysql    //this package is used to connect nodejs to mysql
b. npm install express  // to create app
c. npm install body-parser //for encoding 
d. npm install bcryptjs // for encrypting and hashing the password for security
e. npm install jsonwebtoken // for creating token while booking 
f. npm install dotenv    // for creating .env file to keep APIKEY for only admin to add trains 

6. start the app
run command - node index.js  // editor terminal
after the app running 
got to https(web browser): localhost:4000

There only new user register, old user can login,admin user can also login and register.
After login of user or admin they will be redirected to the desired APIs for seat-availability,book-seats,add-train,get booking details etc.

Since time to do the assignment was a day so I implemented the things summarised in the task file, additionally have implemented some more functionalities(APIs for admin) and also added css to homepage.

for any queries or error please email - shekharhimanshu926@gmail.com   // will be very happy to understand and work for solving the doubts and problems.
from my end have verified the APIs and working of the APP to best of my knowledge.

.env file has API_KEY = "HIMAN" // this is for admin to verify authorization so that trains can be added and race conditions can be tackled.

Thank you.
 

   


