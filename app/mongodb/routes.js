const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const product = require('./controller')

router.get('/product/:id', product.index);
router.get('/product', product.view);
router.post('/product/store', upload.single('image'), product.store);
router.put('/product/update/:id', upload.single('image'), product.update);
router.delete('/product/delete/:id', upload.single('image'), product.destroy);

module.exports = router;


