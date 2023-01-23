
const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const hostname = '127.0.0.1';
const port = 3000;

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use(express.static('static'));
app.use(cors());

const {createConnection} = require('./db/db.js');

createConnection()
    .then(() => {
        // connection established successfully
    })
    .catch((err) => {
        console.log(`Error connecting to MongoDB: ${err}`);
    });

//user handling
const User = require('./db/db.js');
app.use(bodyParser.json());

app.post('http://127.0.0.1:3000/user', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).send('User created');
    } catch (err) {
        res.status(400).send(err);
    }
});

//start server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});