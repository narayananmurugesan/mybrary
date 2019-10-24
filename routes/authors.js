const express = require('express');
const router = express.Router();
const Author = require('../models/author');


router.get('/', async (req, res) => {
    try {
        let searchOption = {};
        if(req.query.name != null && req.query.name != ''){
            searchOption.name = new RegExp(req.query.name, 'i');
        }
        const authors = await Author.find(searchOption);
        res.render("authors/index", {authors: authors,
        searchOption: req.query});
    } catch (error) {
        res.redirect('/');
    }
    
});


router.get('/new', (req, res) => {
    res.render("authors/new", {author: new Author() });
});

router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save();
        res.redirect('authors');
    } catch (error) {
        res.render('authors/new',{
            author: author,
            errorMessage: 'Error Creating Message'
        })
    }
    res.send(req.body.name);
});

module.exports = router;