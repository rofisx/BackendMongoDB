const mongoose = require('mongoose');

// mongoose.connect('mongodb://admin:admin@localhost:27017/eduwork-mongoose?authSource=admin');
mongoose.connect('mongodb+srv://admin:admin@cluster0.atpnk.mongodb.net/eduwork-mongoose?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('Koneksi Mongoose Berhasil'));