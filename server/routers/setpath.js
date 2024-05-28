const express = require('express');
const router = express.Router();
const PathSet = require('../control/contro')

router.get('/',PathSet.home);
router.get('/add', PathSet.addSet);
router.post('/add',PathSet.postSet);
router.get('/view/:id', PathSet.view);
router.get('/edit/:id', PathSet.editSet);
router.put('/edit/:id', PathSet.editPost);
router.delete('/edit/:id', PathSet.deleteSet);

module.exports = router;