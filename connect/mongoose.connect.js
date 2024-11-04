const mongoose = require('mongoose');

exports.connect = () => {
    return mongoose.connect('mongodb+srv://admin:XHHU9hPLA5Sw7K6J@cluster0.jynhvzr.mongodb.net/exam', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};
