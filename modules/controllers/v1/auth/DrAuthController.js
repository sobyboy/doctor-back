const Controller = require ("../../Controller");
const bcrypt = require('bcrypt');

module.exports = new class DrAuthController extends Controller {
    register(req , res) {
        req.checkBody('firstName' , 'The First Name field cannot be left blank ').notEmpty();
        req.checkBody('lastName' , 'The Last Name field cannot be left blank').notEmpty();
        req.checkBody('Email' , 'The Email field cannot be left blank ').notEmpty();
        req.checkBody('Email' , 'The entered term must be Email').isEmail();
        req.checkBody('Password' , 'The Password field cannot be left blank').notEmpty();
        req.checkBody('Password' , 'The Password must have at least 8 characters').isLength({ min : 8 });

        if(this.showValidationErrors(req , res))
            return;

        this.model.DrUser({
            firstName : req.body.firstName, 
            lastName : req.body.lastName, 
            Email : req.body.Email ,
            Password : req.body.Password,
        }).save((err, user) => {
            if(err) {
                if(err.code == 11000) {
                    return res.json({
                        data : 'email is not unique',
                        success : false
                    });
                } 
                return res.json({
                    data : err,
                    success : false
                });
            }
            return res.json({
                data : 'Dr is Registred',
                success : true
            });
        });
    }
    
    login(req , res) {

        req.checkBody('Email' , 'The Email field cannot be left blank ').notEmpty();
        req.checkBody('Password' , 'The Password field cannot be left blank').notEmpty();

        if(this.showValidationErrors(req , res))
            return;

        this.model.DrUser.findOne({ Email : req.body.Email } , (err , user) => {
            if(err) throw err;
            if(user == null)
                return res.status(422).json({
                    data : 'this is not correct',
                    success : false
                });
            bcrypt.compare(req.body.Password , user.Password , (err , status ) => {
                if(! status) {
                    return res.status(422).json({
                        data : 'this is not correct',
                        success : false,
                    })
                }
                return res.json({
                    data : console.log(req.body),
                    success : true
                });
            })
        })  
    }
}