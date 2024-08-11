const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMidddleware');
dotenv.config();
const app = express();

console.log("started");
app.use(express.static('public'));
app.use(express.json());//middleware take any json data to work with request handlers
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');

const dbURI = process.env.MONGODB_URL;
const PORT = process.env.PORT;
console.log(`MONGODB_URL: ${process.env.MONGODB_URL}`);
console.log(`PORT: ${process.env.PORT}`);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(PORT, () => {
    console.log('server is started..');
    console.log('database too');
  }))
  .catch((err) => console.log("error is ",err));

// routes
app.get('*',checkUser);
app.get('/' ,(req, res) => res.render('home'));

app.get('/smoothies',requireAuth,(req, res) => res.render('smoothies'));

app.use(authRoutes);


