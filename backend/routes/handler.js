const express = require('express');
const router = express.Router();
const Schemas = require('../models/Schemas.js');

router.get('/tableKeys', async (req, res) => {
    const tableKeys = Schemas.TableKeys;
    let searchOptions = { RECNAME: /^STDNT_CAR_TERM/ }

    if (req.query.RECNAME != null && req.query.RECNAME !== '') {
        searchOptions.RECNAME = new RegExp(req.query.RECNAME, 'i')
    }
    //const tableKeysData = await tableKeys.find({ FIELDNAME: 'EMPLID', FIELDNUM: 1 }, (err, tableKeysData) => {
    const tableKeysData = await tableKeys.find(searchOptions, (err, tableKeysData) => {
        if (err) throw err;
        if (tableKeysData) {
            res.end(JSON.stringify(tableKeysData));
        } else {
            res.end();
        }
    }).limit(10);
});
/*
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const authors = await Author.find(searchOptions)
    res.render('authors/index', {
      authors: authors,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})
*/


router.get('/tweets', async (req, res) => {
    const tweets = Schemas.Tweets;

    const userTweets = await tweets.find({}).populate("user").exec((err, tweetData) => {
        if (err) throw err;
        if (tweetData) {
            res.end(JSON.stringify(tweetData));
        } else {
            res.end();
        }
    });
});

router.post('/addTweet', async (req, res) => {
    const userTweet = req.body.tweetInput;
    const user = Schemas.Users;
    const userId = await user.findOne({ username: 'sville' }).exec();

    const newTweet = new Schemas.Tweets({
        tweet: userTweet,
        user: userId._id
    });

    try {
        await newTweet.save((err, newTweetResults) => {
            if (err) res.end('Error Saving.');
            res.redirect('/tweets');
            res.end();
        });
    } catch (err) {
        console.log(err);
        res.redirect('/tweets');
        res.end();
    }
});

/*
 
// Uncomment to add a new user document to our users table
// To use this, run the backend server, then go to URL: localhost:4000/addUser
 
router.get('/addUser', async (req, res) => {
    const user = {username: 'eaglefang', fullname: 'Sensei Johnny'};
    const newUser = new Schemas.Users(user);
 
    try {
        await newUser.save( async(err, newUserResult) => {
            console.log('New user created!');
            res.end('New user created!');
        });
    } catch(err) {
        console.log(err);
        res.end('User not added!');
    }
});
*/

module.exports = router;