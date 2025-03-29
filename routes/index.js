const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send(req.session.user !== undefined
        ? `Logged in as ${req.session.user.displayName}`
        : 'Logged Out'
    );
});

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.get('/github/callback', passport.authenticate('github', {
        failureRedirect: '/api-docs', session: false
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

router.use(require('./movies'));
router.use(require('./books'));

module.exports = router;
