/**
 * Created by ferran on 21/04/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var message = new Schema({message: {type: String}});
var UserSchema = new Schema({

    name: {type: String},
    surname: {type: String},
    age: {type: Number},
    messages: [message]
}, {versionKey: false});


module.exports = mongoose.model('User', UserSchema);