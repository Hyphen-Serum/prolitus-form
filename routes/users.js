// const express = require('express');
// const router = express.Router();
const fs = require('fs');
var mysql = require('mysql');
const session = require('express-session');


module.exports = {
    registerPage: (req, res) => {
        res.render('layouts/registration.ejs', {
            message: 'Register here',
            title: 'Register Page',
            username: req.session.username
        });
    },

    addRegister: (req, res) => {

        if (!req.files) {
            return res.status(400).send('No files were uploaded.');
        }


        let message = '';
        let name = req.body.name;
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        let hobbies = req.body.hobbies;
        let gender = req.body.gender;
        let dob = req.body.dob;
        let address1 = req.body.address1;
        let address2 = req.body.address2;
        let city = req.body.city;
        let country = req.body.country;
        let zip = req.body.zip;
        let textareawrite = req.body.textareawrite;
        let uploadedFile = req.files.avtar;
        // let status;

        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = username + '.' + fileExtension;
        

        hobbies = hobbies.join(' ');
        console.log('Hobbies: ' + hobbies);

        let usernameQuery = "SELECT * FROM users WHERE username = '" + username + "' ";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Username and email already exists';
                res.render('layouts/registration.ejs', {
                    title: 'Register here',
                    message
                });
            } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /puplic/assets/img dirctory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err) => {
                        if (err) {
                            return res.status(500).send(err);
                        }

                        // send the player's details to the databse
                        let insertQuery = "INSERT INTO `users` (name, username, email, password, hobbies, gender, dob, address1, address2, city, country, zip, textareawrite, avtar) VALUES ('" + name + "', '" + username + "', '" + email + "', '" + password + "', '" + hobbies + "', '" + gender + "', '" + dob + "', '" + address1 + "', '" + address2 + "', '" + city + "', '" + country + "', '" + zip + "', '" + textareawrite + "', '" + image_name + "')";

                        db.query(insertQuery, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/users/login');
                        });
                    });
                } else {
                    message = `Invalid File format. Only 'gif', 'jpeg', 'png' images are allowed.`;
                    res.render('layouts/registration.ejs', {
                        title: 'Register here',
                        message,
                        username: req.username
                    });
                }
            }
        });
    },

    loginPage: (req, res) => {
        res.render('layouts/login.ejs', {
            title: 'Login',
            username: req.session.username
        });
    },

    userLogin: (req, res) => {
        let password = req.body.password;
        let username = req.body.username;
        let sess = req.session;

        db.query("SELECT a.*, DATE_FORMAT(dob, '%Y%m%d') as dob FROM users a WHERE username = ?", [username], (err, result, fields) => {

            if (err) {
                return res.status(400).send(err);
            } else {
                if (result.length > 0) {
                    
                    if(result[0].password == password) {
                        var fname=req.session.username;
                        res.render('layouts/welcome.ejs', {
                            title: 'Welcome',
                            message: 'You can login',
                            username: username,
                            fname:(fname)?fname:'',
                        })
                    } else {
                        res.status(204).send({ message: 'Email and password not match' });
                    }
                } else {
                    res.status(204).send({ message: 'Email does not exists'});
                } 
            }
        });
    },

    userProfile: (req, res) => {
        let username = req.body.username;
        let query = "SELECT username FROM users WHERE"
    },

    userLogout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.redirect('/');
            }
        });
    }

  
}



/*
router.get('/register', (req, res) => {
    res.render('layouts/registration');
});

router.get('/login', (req, res) => {
    res.render('layouts/login');
});



module.exports = router; */








