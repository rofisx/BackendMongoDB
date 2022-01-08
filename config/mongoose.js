const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin@localhost:27017/eduwork-mongoose?authSource=admin');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('Koneksi Mongoose Berhasil'));