const { ObjectId } = require('mongodb');

const mongodb = require('../data/database');

const getAll = async (_, res) => {
    //#swagger.tags=['Books']
    const result = await mongodb.getDatabase()
        .db()
        .collection('books')
        .find();

    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    });
};

const getById = async (req, res) => {
    //#swagger.tags=['Books']
    const bookId = new ObjectId(req.params['id']);
    const result = await mongodb.getDatabase()
        .db()
        .collection('books')
        .find({ _id: bookId });

    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books[0]);
    });
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

};

const update = async (req, res) => {
    //#swagger.tags=['Books']
    const userId = new ObjectId(req.params.id);
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        yearPublished: req.body.yearPublished,
        pages: req.body.pages,
        language: req.body.language
    }

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
};

const deleteBook = async (req, res) => {
    //#swagger.tags=['Books']
    const userId = new ObjectId(req.params.id);
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
};

module.exports = {
    getAll,
    getById,
    store,
    update,
    deleteBook
};
