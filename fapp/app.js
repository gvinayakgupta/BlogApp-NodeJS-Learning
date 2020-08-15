const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blog');
const { render } = require('ejs');
// const morgan = require('morgan');
const app = express();

// Middleware & Static Files
// app.use(morgan('dev'));
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
    // res.sendFile('./views/about.html', { root: __dirname });
})

app.use('/blogs',blogRoutes);

// Always work.. but only if request reaches till here..
// Keep at end
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
    // res.status(404).sendFile('./views/404.html', { root: __dirname });
})

// const http =  require('http');
// const fs = require('fs');
// const server = http.createServer((req,res) => {
//     console.log(req.url, req.method);
//     //sets header
//     res.setHeader('Content-Type', 'text/html');
//     let path = './views/';
//     res.statusCode = 200;
//     switch(req.url) {
//         case '/':
//             path += 'index.html';
//             break;
//         case '/about':
//             path += 'about.html';
//             break;
//         case '/about-me':
//             res.statusCode = 301;
//             res.setHeader('Location', '/about');
//             res.end();
//             break;
//         default: 
//             path += '/404.html';
//             res.statusCode = 404;
//     }
//     fs.readFile(path, (err, data) => {
//         if(err) {
//             console.log(err);
//         } else {
//             res.write(data);
//             res.end();
//         }
//     })
// });
// server.listen(3000, 'localhost', () => {
//     console.log('Listening on 3000');
// });