// 3rd party module
const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

// core module
const ejs = require('ejs');

const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageController');

const app = express();

// connect db
// mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db', {
mongoose
  .connect(
    'mongodb+srv://hodo:F8FCdWu84Lam_ve@cluster0.niina.mongodb.net/pcat-db?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Database Connected!');
  })
  .catch((err) => {
    console.log(err);
  });

// template engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// routes
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} nolu portta çalıştı...`);
});
