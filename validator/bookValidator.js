const { body, validationResult } = require('express-validator');

const bookValidationRules = () => {
    return [
        body('title', 'Title is required').not().isEmpty(),
        body('author', 'Author is required').not().isEmpty(),
        body('genre', 'Genre is required').not().isEmpty(),
        body('yearPublished', 'Year published must be an integer number').isInt(),
        body('pages', 'Pages published must be an integer number').isInt(),
        body('language', 'Language is required').not().isEmpty()
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
}

module.exports = {
    bookValidationRules,
    validate
}
