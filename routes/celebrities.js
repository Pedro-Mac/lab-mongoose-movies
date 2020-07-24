const express = require('express');
const Celebrity = require('./../models/celebrity');

const celebrityRouter = new express.Router();

celebrityRouter.get('/', (req, res, next) => {
  Celebrity.find()
    .then(data => {
      res.render('celebrities/index', { data: data });
    })
    .catch(err => {
      next(err);
    });
});

celebrityRouter.get('/create', (req, res) => {
  res.render('celebrities/create');
});

celebrityRouter.post('/create', (req, res, next) => {
  const data = req.body;
  Celebrity.create({
    name: data.name,
    occupation: data.occupation,
    catchPhrase: data.catchPhrase
  })
    .then(celebrity => {
      console.log(celebrity);
      res.redirect('/celebrities');
    })
    .catch(err => {
      res.redirect('/create');
    });
});

celebrityRouter.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Celebrity.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(err => {
      next(err);
    });
});

celebrityRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;

  Celebrity.findById(id)
    .then(celebrity => {
      console.log(celebrity);
      res.render('celebrities/show', { celebrity: celebrity });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = celebrityRouter;
