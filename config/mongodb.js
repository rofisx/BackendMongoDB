const { MongoClient } = require('mongodb');

// const url = 'mongodb://admin:admin@localhost:27017?authSource=admin';
const url = 'mongodb+srv://admin:admin@cluster0.atpnk.mongodb.net/eduwork-mongo?retryWrites=true&w=majority';
const client = new MongoClient(url);

(async ()=> {
    try{
        await  client.connect();
        console.log('Koneksi MongoDB Berhasil');
    }catch(e){
        console.log(e);
    }
})();

const db = client.db('eduwork-mongo');
// const db = client.db('eduwork-rofi');
module.exports = db;