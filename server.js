
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
const {User} = require('./db/db.js');
app.use(bodyParser.json());    


app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();        
        res.status(201).send('User created');
    } catch (err) {
        res.status(400).send(err);
    }
});

app.post('/signin', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }); // Find the user in the database
      
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
  
      if (user.password !== password) {
        return res.status(401).json({ error: 'Incorrect password' });
      }
      
      //req.session.user = user;
      // Return a token or other information to the client
      return res.json({ message: 'Sign-in successful', user });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/user', (req, res) => {
    const { user } = req.session;
  
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
  
    // Return the user information to the client
    return res.json({ user });
  });
  

//non request storing data

// const mongoose = require('mongoose');
// const {User} = require('./db/db.js');
// app.use(bodyParser.json());

// const newUser = new User({
//     name: 'lia',
//     email: 'reydelgutierr',
//     password: 'rg012'
// });

// newUser.save()
//     .then(result => console.log(result))
//     .catch(error => console.error(error));


//start server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});