const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const controller = require('./controller')


router.get('/product/:id', controller.index);
router.get('/product', controller.view);
router.post('/product/store', upload.single('image'), controller.store);
router.patch('/product/update/:id', upload.single('image'), controller.update);
router.delete('/product/delete/:id', controller.destroy);

module.exports = router;