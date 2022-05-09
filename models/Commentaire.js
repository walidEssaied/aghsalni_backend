const mongoose = require( 'mongoose');
const  autoIncrement =('mongoose-auto-increment');


const avischema = mongoose.Schema({
   
    avis :{ type:String },
    note:{type:Number},
  
});



 module.exports = mongoose.model('Commentaire', avischema);
