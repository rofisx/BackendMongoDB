const { ObjectID } = require('bson');
const { ObjectId } = require('mongodb');
const db = require('../../config/mongodb');
const path = require('path');
const fs = require('fs');

const index = (req,res) => {
    const {id} = req.params;
    db.collection('products').findOne({_id:ObjectID(id)})
    .then(result => res.send(result))
    .catch(error => res.send(error));
}

const view = (req,res) => {
    const {search} = req.query;
    const useRegex = new RegExp(search,'i');
    if(search){
        db.collection('products').find({name:useRegex}).toArray()
        .then(result => res.send(result))
        .catch(error => res.send(error));
    } else{
        db.collection('products').find().toArray()
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
        db.collection('products').insertOne({name, price, stock, status, image_url:`http://localhost:3006/public/${image.originalname}`})
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }else{
        db.collection('products').insertOne({name, price, stock, status})
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }
}

const update = (req,res) => {
    const {name, price, stock, status} = req.body;
    const image = req.file;
    const id = req.params.id;
    if(image){
        const target = path.join(__dirname, '../uploads', image.originalname);
        fs.renameSync(image.path, target);
        db.collection('products').updateOne({_id:ObjectId(id)},
            {$set:{name, price, stock, status, image_url:`http://localhost:3006/public/${image.originalname}`}
        })
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }else{
        db.collection('products').updateOne({_id:ObjectId(id)},
            {$set:{name, price, stock, status}
        })
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }
}

const destroy = (req,res) => {
    const {id} = req.params;
    db.collection('products').deleteOne({_id:ObjectId(id)})
    .then(result => res.send(result))
    .catch(error => res.send(error));
}



module.exports={
    index,
    view,
    store,
    update,
    destroy
}