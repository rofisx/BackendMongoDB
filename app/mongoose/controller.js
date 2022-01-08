const Product = require('./model')
const path = require('path');
const fs = require('fs');
const { ObjectId } = require('mongodb');

const index = (req,res) => {
    const id = req.params.id;
    Product.findOne({_id:ObjectId(id)})
    .then(result => res.send(result))
    .catch(error => res.send(error));
}

const view = (req,res) => {
    const {search} = req.query;
    const useRegex = new RegExp(search,'i');
    if(search){
        Product.find({name : useRegex})
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }else{
        Product.find()
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }
}



const store = (req,res) => {
    const {name, price, stock, status} = req.body;
    const image = req.file;
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        Product.create({name, price, stock, status, image_url:`http://localhost:3006/public/${image.originalname}`})
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }else{
        Product.create({name, price, stock, status})
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }

}

const update = (req,res) => {
    const {name, price, stock, status} = req.body;
    const image = req.file;
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        Product.updateOne({_id:ObjectId(req.params.id)},
            {$set:
                {name, price, stock, status, image_url:`http://localhost:3006/public/${image.originalname}`}
            })
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }else{
        Product.updateOne({_id:ObjectId(req.params.id)},
            {$set:
                {name, price, stock, status}
            })
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }
}

const destroy = (req,res) => {
    Product.deleteOne({_id:ObjectId(req.params.id)})
    .then(result => res.send({
        status:'Sucesss',
        message: 'Delete Berhasil',
        response: result})
        )
    .catch(error => res.send(error));
}


module.exports = {
    index,
    view,
    store,
    update,
    destroy
}