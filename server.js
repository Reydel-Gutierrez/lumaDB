
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

const {createConnection, newWorkOrder} = require('./db/db.js');

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
      
      return res.json({ message: 'Sign-in successful', user });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // const {newWorkOrder} = require('./db/db.js');

  app.post('/newWorkOrder', async (req, res) => {
    try {
      const { title, name, date, status, comments, dueDate } = req.body;
  
      // Save the inspection report to the database
      const workOrder = new newWorkOrder({  title, name, date, status, comments, dueDate });
      await workOrder.save();
  
      // Return a success response
      res.status(200).json({ message: 'Inspection report submitted successfully' });
    } catch (error) {
      console.error('Error submitting inspection report:', error);
      // Return an error response
      res.status(500).json({ error: 'Internal server error' });
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

  app.get('/viewWorkOrders', async (req, res) => {
    try {
      // Fetch all inspection reports from the database
      const workOrders = await newWorkOrder.find().sort({ date: -1 });
  
      // Return the reports as JSON response
      res.status(200).json({ workOrders });
    } catch (error) {
      console.error('Error fetching inspection reports:', error);
      // Return an error response
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  const {pastWorkOrder} = require('./db/db.js');

  app.post('/pastWorkOrders', async (req, res) => {
    try {
      const { userNumber, userName, userDate, userReport } = req.body;
  
      const workOrder = await newWorkOrder.findOne({ _id: userNumber });

      if (workOrder) {
        const newPastWorkOrder = new pastWorkOrder({
          title: workOrder.title,
          name: workOrder.name,
          date: workOrder.date,
          status: "Closed",
          comments: workOrder.comments,
          dueDate: workOrder.dueDate,
          employeeReport: userReport, // Directly assign userReport to employeeReport
          employeeName: userName,     // Directly assign userName to employeeName
          dateCompleted: userDate,    // Directly assign userDate to dateCompleted
        });
  
        await newPastWorkOrder.save();
  
        await newWorkOrder.deleteOne({ _id: userNumber });
  
        res.status(200).json({ message: 'Inspection report submitted successfully' });
      } else {
        res.status(404).json({ error: 'Work Order not found' });
      }
    } catch (error) {
      console.error('Error submitting inspection report:', error);
      // Return an error response
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/viewPastWorkOrders', async (req, res) => {
    try {
      // Fetch all inspection reports from the database
      const pastWorkOrders = await pastWorkOrder.find().sort({ date: -1 });
  
      // Return the reports as JSON response
      res.status(200).json({ pastWorkOrders });
    } catch (error) {
      console.error('Error fetching inspection reports:', error);
      // Return an error response
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/home', async (req, res) => {
    try {
      // Fetch all inspection reports from the database
      const homePastWorkOrders = await pastWorkOrder.find().sort({ date: -1 }).limit(5);
      const WorkOrders = await newWorkOrder.find().sort({ date: -1 }).limit(5);
  
      // Return the reports as JSON response
      const data = {
        WorkOrders: WorkOrders,
        homePastWorkOrders: homePastWorkOrders,
      };
  
      res.status(200).json(data);
        
    } catch (error) {
      console.error('Error fetching inspection reports:', error);
      // Return an error response
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  const {ServiceCall} = require('./db/db.js');

  app.post('/newServiceCall', async (req, res) => {
    try {
      const { unit, name, date, ot, report } = req.body;
  
      // Save the inspection report to the database
      const newServiceCall = new ServiceCall({  unit, name, date, ot, report });
      await newServiceCall.save();
  
      // Return a success response
      res.status(200).json({ message: 'Service Call submitted successfully' });
    } catch (error) {
      console.error('Error submitting inspection report:', error);
      // Return an error response
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/serviceCalls', async (req, res) => {
    try {
      // Fetch all inspection reports from the database
      const serviceCalls = await ServiceCall.find().sort({ date: -1 });
      
      // Return the reports as JSON response
      console.log('Service Calls:', serviceCalls); // Add this line for debugging
      res.status(200).json(serviceCalls);
        
    } catch (error) {
      console.error('Error fetching inspection reports:', error);
      // Return an error response
      res.status(500).json({ error: 'Internal server error' });
    }
  });


//inspections

const {newInspection} = require('./db/db.js');

  app.post('/newInspection', async (req, res) => {
    try {
      const { title, date, name, report } = req.body;
      console.log(title);
  
      // Save the inspection report to the database
      const inspection = new newInspection({ title, date, name, report });
      await inspection.save();
  
      // Return a success response
      res.status(200).json({ message: 'Inspection report submitted successfully' });
    } catch (error) {
      console.error('Error submitting inspection report:', error);
      // Return an error response
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  app.get('/viewInspections', async (req, res) => {
    try {
      // Fetch all inspection reports from the database
      const viewInspections = await newInspection.find().sort({ date: -1 });
  
      // Return the reports as JSON response
      res.status(200).json({ viewInspections });
    } catch (error) {
      console.error('Error fetching inspection reports:', error);
      // Return an error response
      res.status(500).json({ error: 'Internal server error' });
    }
  });



//start server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});