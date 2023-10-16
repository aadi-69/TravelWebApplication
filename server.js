const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Travel', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
const Schema = mongoose.Schema;

const travelSchema = new Schema({
  username: String,
  fromPlace: String,
  toPlace: String,
  dateTime: String,
  numOfPeople: Number,
  modeOfTransport: String,
  carDriverName: String,
  carNumber: String,
  selectedCar: String,
  numOfSeats: Number,
  trainNumber: String,
  trainName: String,
  busNumber: String,
  busStandLocation: String,
  flightNumber: String,
  flightName: String,
});

const TravelModel = mongoose.model('Travel', travelSchema);

mongoose.createConnection('mongodb://localhost/Login', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const loginDb = mongoose.connection;
loginDb.on('error', console.error.bind(console, 'MongoDB Login connection error:'));

loginDb.once('open', () => {
  console.log('Connected to MongoDB for Login');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get('/save', (req, res) => {
  const jsonData = req.query.data;
  const formData = JSON.parse(jsonData);

  // Create a new document using the Travel model and the form data
  const travelData = new TravelModel(formData);

  // Save the document to the MongoDB collection using Promises
  travelData.save()
    .then(() => {
      res.send('Form data received and saved to MongoDB');
    })
    .catch((err) => {
      console.error('Error saving data to MongoDB:', err);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/search', (req, res) => {
  const from = req.query.from;
  const to = req.query.to;
  TravelModel.find({ fromPlace: from, toPlace: to })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
})

app.get('/searchJSON', (req, res) => {
  const mode = req.query.mode;
  const no = req.query.no;
  const user = req.query.username

  TravelModel.find({ username: user, numOfPeople: parseInt(no), modeOfTransport: mode })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    })
})

app.get('/getHome', (req, res) => {
  res.sendFile(__dirname + '/public/home.html')
})

const loginSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  // Add more fields as needed for your login data
});
const LoginModel = loginDb.model('Login', loginSchema);

var currentUser = '';

app.get('/getUsername', (req, res) => {
  res.send(currentUser);
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await LoginModel.findOne({ username, password });

    if (user) {
      currentUser = username;
      res.status(200).sendFile(__dirname + "/public/home.html");
    } else {
      res.status(401).send('Unauthorized: Invalid username or password');
    }
  } catch (err) {
    console.error('Error while querying the database:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/signup', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Check if the username already exists in the "Login" collection
    const existingUser = await LoginModel.findOne({ username });

    if (existingUser) {
      // Username already exists, so respond with a conflict status (409) and a message
      return res.status(409).send('Conflict: Username already exists');
    }

    // Username is unique, so create a new document and save it
    const loginData = new LoginModel({ email, username, password });
    await loginData.save();

    // Respond with a success status (200) and send the index.html file
    res.status(200).sendFile(__dirname + '/public/index.html');
  } catch (err) {
    console.error('Error while handling signup:', err);
    res.status(500).send('Internal Server Error');
  }
});

mongoose.createConnection('mongodb://localhost/Request', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const requestDb = mongoose.connection;
requestDb.on('error', console.error.bind(console, 'MongoDB Request connection error:'));

requestDb.once('open', () => {
  console.log('Connected to MongoDB for Requests');
});

const requestSchema = new mongoose.Schema({
  username: String,
  ObjectID: String,
  status: String
});

const RequestModel = requestDb.model('Request', requestSchema);

mongoose.createConnection('mongodb://localhost/Pending', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const pendingDb = mongoose.connection;
pendingDb.on('error', console.error.bind(console, 'MongoDB Request connection error:'));

pendingDb.once('open', () => {
  console.log('Connected to MongoDB for Pending');
});

const PendingSchema = new mongoose.Schema({
  username: String,
  ObjectID: String,
  status: String
});

const PendingModel = requestDb.model('Pending', PendingSchema);

app.get('/submitRequest', async (req, res) => {
  const username = req.query.name;
  const id = req.query.id;

  console.log(username + " " + id);

  const requestData = new RequestModel({ username, id, status: "false" });
  await requestData.save().then(savedAccept => {
  })
    .catch(err => {
      if (err.code === 11000) {
        console.error('Duplicate key error:');
      } else {
        console.error('Error while saving:', err);
      }
    });

  const pendingData = new PendingModel({ username, id, status: "false" });
  await pendingData.save().then(savedAccept => {
  })
    .catch(err => {
      if (err.code === 11000) {
        console.error('Duplicate key error:');
      } else {
        console.error('Error while saving:', err);
      }
    });

  res.status(200).send("");
})

app.get('/getDetailsForPendingRequest', async (req, res) => {
  const username = req.query.name;
  data = await PendingModel.find({ 'username': username });

  if (data.length === 0) {
    res.send("No new Requests");
  } else {
    const results = [];

    for (const user of data) {
      if (user._id) {
        const fetchId = user._id;

        const newData = await TravelModel.findById(fetchId);
        if (newData) {
          results.push(newData);
        }
      }
    }

    if (results.length === 0) {
      res.send("No matching data found");
    } else {
      res.json(results);
    }
  }

});

app.get('/getStatus',async(req,res)=>{
  let id = req.query.id;
  id =await PendingModel.findById(id);

  res.json(id);
})

app.get('/getDetailsForApprovalOrDenail', async (req, res) => {
  const username = req.query.name;
  const users = await PendingModel.find({});
  const promises = [];

  users.forEach(async (user) => {
    const id = user._id;
    const user2Promise = TravelModel.findById(id);
    promises.push(user2Promise);
  });

  const user2Results = await Promise.all(promises);

  // Now you can process the results
  user2Results.forEach(async (user2) => {
    if (user2 && user2.username === username) {
      async function getUsername() {
        const newusername = await PendingModel.findById(user2._id);
        return newusername.username;
      }

      const updateUsername = await getUsername();

      // console.log(updateUsername);

      user2.username = updateUsername;

      // console.log(user2);

      user2 = JSON.stringify(user2);

      const filePath = 'data.json';

      // Write the JSON data to the file, overwriting any previous content
      fs.writeFileSync(filePath, user2, 'utf-8');
    }
  });

  const filePath = 'data.json';

  // Read the JSON data from the file
  const jsonData = fs.readFileSync(filePath, 'utf-8');

  // Parse the JSON string into a JavaScript object
  const data = JSON.parse(jsonData);

  res.send(jsonData);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
