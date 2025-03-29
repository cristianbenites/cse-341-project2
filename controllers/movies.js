const { ObjectId } = require('mongodb');

const mongodb = require('../data/database');

const getAll = async (_, res) => {
    //#swagger.tags=['Movies']

    try {
        const result = await mongodb.getDatabase()
            .db()
            .collection('movies')
            .find();

        result
            .toArray()
            .then((movies) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(movies);
            })
            .catch((err) => {
                res.status(400).json({ message: err });
            });
    } catch (err) {
        res.status(500)
            .json(err || 'Some error occurred. Please try again.');
    }
};

const getById = async (req, res) => {
    //#swagger.tags=['Movies']

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid movie id to find a movie.');
    }
    const movieId = new ObjectId(req.params['id']);

    try {
        const result = await mongodb.getDatabase()
            .db()
            .collection('movies')
            .find({ _id: movieId });

        result
            .toArray()
            .then((movies) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(movies[0]);
            })
            .catch((err) => {
                res.status(400).json({ message: err });
            });
    } catch (err) {
        res.status(500)
            .json(err || 'Some error occurred. Please try again.');
    }
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

    try {
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
    } catch (err) {
        res.status(500)
            .json(err || 'Some error occurred. Please try again.');
    }
};

const update = async (req, res) => {
    //#swagger.tags=['Movies']

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid movie id to update a movie.');
    }
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

    try {
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
    } catch (err) {
        res.status(500)
            .json(err || 'Some error occurred. Please try again.');
    }
};

const deleteMovie = async (req, res) => {
    //#swagger.tags=['Movies']

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid movie id to delete a movie.');
    }
    const userId = new ObjectId(req.params.id);

    try {
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
    } catch (err) {
        res.status(500)
            .json(err || 'Some error occurred. Please try again.');
    }
};

module.exports = {
    getAll,
    getById,
    store,
    update,
    deleteMovie
};
