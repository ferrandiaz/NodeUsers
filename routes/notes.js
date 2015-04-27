/**
 * Created by ferran on 21/04/15.
 */
module.exports = function(app){

    var User = require('../models/user.js');

    getUsers = function(req,res){

        User.find(function(err, users){
            console.log(err);
            if(err) res.send(500, err.message);
            else res.send(200, users);
        });
    };

    findUser = function(req, res){

        User.findOne({"name": req.params.name}, function(err, user){

            if(user == null) res.send(500, 'Error: ' + err);
           else  res.send(200, user);
        });
    };
    postUser = function(req,res){
       // console.log(req.body);
        var user = new User({
            name:       req.body.name,
            surname:    req.body.surname,
            age:        req.body.age
        });
        user.save(function(err){
            if(!err) console.log("Created!");
            else console.log("Error: " + err);
        });
        res.send(200, user);
    };
    updateUser = function(req, res){

        User.findOne({"name": req.params.name}, function(err, user){
            if(req.body.surname != null) user.surname = req.body.surname;
            if(req.body.age != null) user.age = req.body.age;

            user.save(function(err){
                if(err) res.send(500, "Error: "+ err);
                else  res.send(user);
            });
        });
    };

    deleteUser = function(req, res){

        User.findOne({"name": req.params.name}, function(err, user) {
            user.remove(function(err){
                if(err) res.send(500, "Error: "+ err);
                else res.send(200);
            })
        });

    };

    createMessage = function(req, res) {
        User.findOne({"name": req.params.name}, function(err, user) {
            console.log(req.body);
            if(req.body.message != null) user.messages.push(req.body);
            console.log(user.messages);
            user.save(function(err){
                if(err) res.send(500, "Error: "+ err);
                else  res.send(user);
            });
        });
    };
    app.get('/user', getUsers);
    app.post('/user', postUser);
    app.get('/user/:name', findUser);
    app.put('/user/:name', updateUser);
    app.delete('/user/:name', deleteUser);
    app.put('/user/:name/message', createMessage);
};