const mongoose = require ('mongoose') ;
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const bcrypt = require ('bcrypt')

const drUserSchema = new Schema({
    firstName : { type : String , required : true },
    lastName : { type : String , required : true },
    Email : { type : String , required : true , unique : true },
    Password : { type : String , required : true },
});

drUserSchema.plugin(timestamps);
drUserSchema.pre('save' , function(next) {
    bcrypt.hash(this.Password , 10 , (err, hash) => {
        this.Password = hash;
        next();
    });
})

module.exports = mongoose.model('drUser' , drUserSchema);