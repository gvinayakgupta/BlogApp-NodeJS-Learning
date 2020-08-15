const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();

router.get('/', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname});
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'Home', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
})

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

router.get('/:id', (req,res) => {
    const id = req.params.id;
    Blog.findById(id).then((result) => {
        res.render('details', { title: 'Blog Details', blog: result})
    }).catch((err) => {
        res.status(404).render('404', { title: '404' });
    });
})

router.post('/', (req, res) => {
    const blog = new Blog(req.body);
    blog.save().then((result) => {
        res.redirect('/blogs');
    }).catch((err) => {
        console.log(err);
    })
})

router.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id).then((result) => {
        res.json({redirect: '/blogs'})
    })
    .catch((err) => {
        console.log(err)
    })
})

module.exports = router;
