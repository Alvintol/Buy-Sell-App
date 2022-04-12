const express = require('express');
const router = express.Router();
const database = require('./database');
const messages = 'http://localhost:8080/api/messages';


router.get('/inbox', (req, res) => {
  database.getInboxNames(messages)
    .then(messages => res.json(messages))
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});


router.get('/messages', (req, res) => {
  database.getChat(messages)
    .then(messages => res.json(messages))
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});


router.get('/:id', (req, res) => {
  res.cookie('user_id', req.params.id);
  database.getUsers(req.params.id)
    .then(user => {
      console.log(user[0]);
      res.render("index", user[0]);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});


router.get('', (req, res) => {
  res.cookie('user_id', req.params.id);
  database.getAllListings(10)
    .then(listings => res.send(listings))
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});


router.post('', (req, res) => {
  res.cookie('user_id', req.params.id);
  const form = req.body;
  if (!form.imageURL || !form.model || !form.make || !form.year || !form.price || !form.color) {
    return;
  }
  database.createListing(req.body)
    .then(listing => {
      console.log(req.body, "\nListing Added to Databse");
      res.status(201);
      console.log('New Listing Created!');
      res.redirect('/');
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});


router.get('/make', (req, res) => {
  database.getAllMakes()
    .then(makes => res.send(makes))
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});


router.get('/model', (req, res) => {
  database.getAllModels()
    .then(models => res.send(models))
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});


module.exports = router;
