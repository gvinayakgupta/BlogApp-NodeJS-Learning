const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blog.routes');
const { render } = require('ejs');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

//Mongodb setup
const dburl = "mongodb+srv://vinayak:test@123@trycluster.y2xml.mongodb.net/blog-site?retryWrites=true&w=majority";

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(3000);
    }).catch((err) => {
        console.log(err);
    });

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/blogs');
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
})

app.use('/blogs',blogRoutes);

// Always work.. but only if request reaches till here..
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})