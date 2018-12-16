const mongoose = require('mongoose');
const URI = 'mongodb://localhost/logoG';

mongoose.connect(URI,{ useNewUrlParser: true })
    .then(db => console.log('Conectado a MongoDB!'))
    .catch(err => console.log(err));

    module.exports = mongoose;