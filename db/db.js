const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const uri = 'mongodb+srv://mywebnode:Rg012499@webnodecluster.edegyif.mongodb.net/?retryWrites=true&w=majority';

function createConnection() {
    return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});



// db route for user registration
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

User = mongoose.model('User', userSchema);

const workOrderSchema = new mongoose.Schema({
  title: String,
  name: String,
  date: Date,
  status: String,
  comments: String,
  dueDate: Date
});

// Create the InspectionReport model
newWorkOrder = mongoose.model('newWorkOrder', workOrderSchema);


const pastWorkOrderSchema = new mongoose.Schema({
  title: String,
  name: String,
  date: String,
  status: String,
  comments: String,
  dueDate: Date,
  employeeReport: String,
  employeeName: String,
  dateCompleted: Date
});

// Create the InspectionReport model
pastWorkOrder = mongoose.model('pastWorkOrder', pastWorkOrderSchema);


const serviceCallSchema = new mongoose.Schema({
  unit: String,
  name: String,
  date: Date,
  ot: String,
  report: String,
});

ServiceCall = mongoose.model('ServiceCall', serviceCallSchema);

//inspection model
const newInspectionSchema = new mongoose.Schema({
  title: String,
  date: Date,
  name: String,
  report: String
});

// Create the InspectionReport model
newInspection = mongoose.model('newInspection', newInspectionSchema);


//exporting modules
module.exports = {
    User,
    newWorkOrder,
    pastWorkOrder,
    ServiceCall,
    newInspection,
    // signinUser,
    createConnection,
    connection
};