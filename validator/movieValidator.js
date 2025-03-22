const { body, validationResult } = require('express-validator');

const movieValidationRules = () => {
    return [
        body('title', 'Title is required').not().isEmpty(),
        body('genre', 'Genre is required').not().isEmpty(),
        body('director', 'Director is required').not().isEmpty(),
        body('year', 'Year must be between 1800 and 3000').isInt({ min: 1800, max: 3000 }),
        body('durationMinutes', 'Duration minutes must be a positive number').optional().isInt({ min: 1 }),
        body('language', 'Language is required').not().isEmpty(),
        body('rating')
            .isFloat({ min: 0, max: 10})
            .matches(/^\d+(\.\d{1,2})?$/)
            .withMessage('Rating must be between 0.00 and 10.00')
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
    movieValidationRules,
    validate
}
