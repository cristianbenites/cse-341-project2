const { ObjectId } = require('mongodb');

const mongodb = require('../data/database');

const getAll = async (_, res) => {
    //#swagger.tags=['Books']
    try {
        const result = await mongodb.getDatabase()
            .db()
            .collection('books')
            .find();

        result
            .toArray()
            .then((books) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(books);
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
    //#swagger.tags=['Books']

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid book id to find a book.');
    }
    const bookId = new ObjectId(req.params['id']);

    try {
        const result = await mongodb.getDatabase()
            .db()
            .collection('books')
            .find({ _id: bookId });

        result
            .toArray()
            .then((books) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(books[0]);
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
    //#swagger.tags=['Books']
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        yearPublished: req.body.yearPublished,
        pages: req.body.pages,
        language: req.body.language
    }

    try {
        const response = await mongodb.getDatabase()
            .db()
            .collection('books')
            .insertOne(book);

        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500)
                .json(response.error || 'Some error occurred while creating the book.');
        }
    } catch (error) {
        res.status(500)
            .json(error || 'Some error occurred. Please try again.')
    }
};

const update = async (req, res) => {
    //#swagger.tags=['Books']

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid book id to update a book.');
    }
    const userId = new ObjectId(req.params.id);
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        yearPublished: req.body.yearPublished,
        pages: req.body.pages,
        language: req.body.language
    }

    try {
        const response = await mongodb.getDatabase()
            .db()
            .collection('books')
            .replaceOne({ _id: userId}, book);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500)
                .json(response.error || 'Some error occurred while updating the book.');
        }
    } catch (err) {
        res.status(500)
            .json(err || 'Some error occurred. Please try again.')
    }
};

const deleteBook = async (req, res) => {
    //#swagger.tags=['Books']

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid book id to delete a book.');
    }
    const userId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDatabase()
            .db()
            .collection('books')
            .deleteOne({ _id: userId}, true);

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500)
                .json(response.error || 'Some error occurred while deleting the book.');
        }
    } catch (err) {
        res.status(500)
            .json(err || 'Some error occurred. Please try again.')
    }
};

module.exports = {
    getAll,
    getById,
    store,
    update,
    deleteBook
};
