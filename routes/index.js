const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (_, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World')
});

router.use(require('./movies'));
router.use(require('./books'));

module.exports = router;
