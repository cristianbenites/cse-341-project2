const { ObjectId } = require('mongodb');

const mongodb = require('../data/database');

const getAll = async (_, res) => {
    //#swagger.tags=['Movies']
    const result = await mongodb.getDatabase()
        .db()
        .collection('movies')
        .find();

    result.toArray().then((movies) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(movies);
    });
};

const getById = async (req, res) => {
    //#swagger.tags=['Movies']
    const movieId = new ObjectId(req.params['id']);
    const result = await mongodb.getDatabase()
        .db()
        .collection('movies')
        .find({ _id: movieId });

    result.toArray().then((movies) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(movies[0]);
    });
};

const store = async (req, res) => {
    //#swagger.tags=['Movies']
    const movie = {
        title: req.body.title,
        genre: req.body.genre,
        director: req.body.director,
        year: req.body.year,
        durationMinutes: req.body.durationMinutes,
        language: req.body.language,
        rating: req.body.rating,
    }

    const response = await mongodb.getDatabase()
        .db()
        .collection('movies')
        .insertOne(movie);

    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500)
            .json(response.error || 'Some error occurred while creating the movie.');
    }

};

const update = async (req, res) => {
    //#swagger.tags=['Movies']
    const userId = new ObjectId(req.params.id);
    const movie = {
        title: req.body.title,
        genre: req.body.genre,
        director: req.body.director,
        year: req.body.year,
        durationMinutes: req.body.durationMinutes,
        language: req.body.language,
        rating: req.body.rating,
    }

    const response = await mongodb.getDatabase()
        .db()
        .collection('movies')
        .replaceOne({ _id: userId}, movie);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500)
            .json(response.error || 'Some error occurred while updating the movie.');
    }
};

const deleteMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase()
        .db()
        .collection('movies')
        .deleteOne({ _id: userId}, true);

    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500)
            .json(response.error || 'Some error occurred while deleting the movie.');
    }
};

module.exports = {
    getAll,
    getById,
    store,
    update,
    deleteMovie
};
