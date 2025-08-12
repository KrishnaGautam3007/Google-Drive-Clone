const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
function connectToDB(){ 
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('Connected to MongoDB');
    })
}
module.exports = connectToDB;