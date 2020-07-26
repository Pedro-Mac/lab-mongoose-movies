const express = require('express');
const Movie = require('./../models/movie');

const movieRouter = new express.Router();

movieRouter.get('/', (req, res, next) => {
  Movie.find()
    .then(data => {
      res.render('movies/index', { data: data });
    })
    .catch(err => {
      next(err);
    });
});

movieRouter.get('/create', (req, res, next) => {
  res.render('movies/create');
});

movieRouter.post('/create', (req, res, netx) => {
  const data = req.body;

  Movie.create({
    title: data.title,
    genre: data.genre,
    plot: data.plot
  })
    .then(res.redirect('/movies'))
    .catch(err => {
      next(err);
    });
});

movieRouter.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Movie.findByIdAndDelete(id)
    .then(res.redirect('/movies'))
    .catch(err => {
      next(err);
    });
});

movieRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Movie.findById(id)
    .then(movie => {
      res.render('movies/show', { movie: movie });
    })
    .catch(err => {
      next(err);
    });
});

movieRouter.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;

  Movie.findById(id)
    .then(movie => {
      res.render('movies/edit', { movie: movie });
    })
    .catch(err => {
      next(err);
    });
});

movieRouter.post('/:id', (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  Movie.findByIdAndUpdate(id, {
    title: data.title,
    genre: data.genre,
    plot: data.plot
  })
    .then(res.redirect('/movies'))
    .catch(err => next(err));
});

///////////////////////////////////////////////////////////////
module.exports = movieRouter;
