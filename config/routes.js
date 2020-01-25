const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');
const cardsController = require('../controllers/cards.controller');
const columsController = require('../controllers/colums.controller');

router.get('/', controller.base);

//Cards
router.get('/cards', cardsController.list);
router.post('/cards', cardsController.create);
router.get('/cards/:id', cardsController.get);
router.patch('/cards/:id', cardsController.update);
router.delete('/cards/:id', cardsController.delete)

//Colums

router.get('/column', columsController.list);
router.post('/column', columsController.create);
router.get('/column/:id', columsController.get);
router.patch('/column/:id', columsController.update);
router.delete('/column/:id', columsController.delete);

module.exports = router;