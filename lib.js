const mongoose = require("mongoose");
function connectMongodb() {
    return new Promise((resolve, reject) => {
        mongoose.connect('mongodb+srv://user:cruduser@cluster0.u9l50pz.mongodb.net/?retryWrites=true&w=majority', (error, db) => {
            global.dbCon = db;
            if (error) {
                reject(error.message);
            } else {
                resolve(`Error in connecting to mongodb`);
            }
        });
    });
}

module.exports = {
    connectMongodb

};
