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

const inspectionReportSchema = new mongoose.Schema({
  typeOfIns: String,
  name: String,
  date: Date,
  status: String,
  report: String,
});

// Create the InspectionReport model
InspectionReport = mongoose.model('InspectionReport', inspectionReportSchema);



//db route for user sign in

// const signinSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// const signinUser = mongoose.model('signinUser', signinSchema);


//exporting modules
module.exports = {
    User,
    InspectionReport,
    // signinUser,
    createConnection,
    connection
};