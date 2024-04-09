const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const encoder = bodyparser.urlencoded();

const app = express();

app.use(bodyparser.json()) // for parsing application/json
app.use(bodyparser.urlencoded({ extended: true }))


const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',         // your username
    password: 'Himan@12345',  // your password
    database: 'user'          // your databasename 
});

// checking the connection with mysql server and querying some tables - trains,users
con.connect(function (error) {
    if (error) throw error
    else console.log("connect")
    con.query("select * from users", function (error, result) {
        if (error) throw error
        else {
            console.log(result);
        }
    })

    con.query("select * from trains", function (error, result) {
        if (error) throw error;
        else {
            console.log(result);
        }
    });

});


// various get methods 
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});



app.get("/register", function (req, res) {
    res.sendFile(__dirname + "/register.html");
});

app.get("/login", function (req, res) {
    res.sendFile(__dirname + "/login.html");
});

app.get("/adminlogin", function (req, res) {
    res.sendFile(__dirname + "/adminlogin.html");
});

app.get("/admin/add-train", function (req, res) {
    res.sendFile(__dirname + "/addtrain.html");
});

app.get("/sourcedes", function (req, res) {
    res.sendFile(__dirname + "/sourcedes.html");
});

app.get("/book-seat", function (req, res) {
    res.sendFile(__dirname + "/bookseat.html");
});

app.get("/bookdetails", function (req, res) {
    res.sendFile(__dirname + "/bookdetails.html")
});

app.get("/menu", function (req, res) {
    res.sendFile(__dirname + "/menu.html")
});

app.get("/adminmenu", function (req, res) {
    res.sendFile(__dirname + "/adminmenu.html");
})


// various post methods 

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to hash password' });
        }


        con.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err, result) => {
            if (err) {
                console.error('Error registering user:', err);
                res.status(500).json({ error: 'Failed to register user' });
            } else {
                console.log('User registered successfully');
                res.redirect("/menu");
            }
        });
    });
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Retrieve user from database
    const query = 'SELECT * FROM users WHERE username = ?';
    con.query(query, [username], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const user = results[0];
        // Compare passwords
        bcrypt.compare(password, user.password, (err, match) => {
            if (!match) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            // Generate JWT token
            const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });
            console.log(token);
            res.redirect("/menu");
        });
    });

});

app.post('/adminlogin', (req, res) => {
    const { username, password } = req.body;

    // Retrieve user from database
    const query = 'SELECT * FROM users WHERE username = ?';
    con.query(query, [username], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const user = results[0];
        // Compare passwords
        bcrypt.compare(password, user.password, (err, match) => {
            if (!match) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            // Generate JWT token
            const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });
            console.log(token);
            res.redirect("/adminmenu");
        });
    });

});

const apikey = process.env.API_KEY;

app.post('/admin/add-train', (req, res) => {
    const { source, destination, totalSeats, API_KEY } = req.body;
    if (API_KEY != apikey) {
        return res.status(500).json({ message: 'incorrect api key' });
    }
    con.query('INSERT INTO trains (source, destination, total_seats) VALUES (?, ?, ?)', [source, destination, totalSeats], (err, result) => {
        if (err) {
            console.error('Error adding train:', err);
            res.status(500).json({ error: 'Failed to add train' });
        } else {
            console.log('Train added successfully');
            res.status(200).json({ message: 'Train added successfully' });
        }
    });
});

// const source = 'delhi';
// const destination = 'patna';

app.get('/seat-availability', (req, res) => {
    // res.sendFile(__dirname + "/sourcedes.html");
    const { source, destination } = req.query;
    con.query('SELECT * FROM trains WHERE source = ? AND destination = ?', [source, destination], (err, result) => {
        if (err) {
            console.error('Error fetching seat availability:', err);
            res.status(500).json({ error: 'Failed to fetch seat availability' });
        } else {
            res.status(200).json({ trains: result });

            // console.log(result.length);
        }
    });
});

app.post('/book-seat', (req, res) => {
    const { userId, trainId } = req.body;
    con.query('INSERT INTO bookings (user_id, train_id) VALUES (?, ?)', [userId, trainId], (err, result) => {
        if (err) {
            console.error('Error booking seat:', err);
            res.status(500).json({ error: 'Failed to book seat' });
        } else {
            console.log('Seat booked successfully');
            res.status(200).json({ message: 'Seat booked successfully' });
        }
    });
});



app.get('/booking-details', (req, res) => {
    const { userId } = req.query; // Retrieve user ID from query parameters
    con.query('SELECT * FROM bookings WHERE user_id = ?', [userId], (err, result) => {
        if (err) {
            console.error('Error fetching booking details:', err);
            res.status(500).json({ error: 'Failed to fetch booking details' });
        } else {
            res.status(200).json({ bookings: result });
        }
    });
});






// listening on port number - 4000 
app.listen(4000);
