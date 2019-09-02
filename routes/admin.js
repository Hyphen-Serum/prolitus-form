const fs = require('fs');
var mysql = require('mysql');
const session = require('express-session');

module.exports = {
    adminLogin: (req, res) => {

        res.render('controllers/admin.ejs', {
            title: 'Admin Login',
            message: 'Admin Login here',
            username: req.username

        })
    },

    adminPage: (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        let query = "SELECT * FROM users ORDER BY id ASC";
        

        if (username === 'admin' && password === 'admin123') {
            db.query(query, (err, result) => {
                if (err) {
                    res.redirect('');
                }
                res.render('middleware/admin-panel.ejs', {
                    title: 'Admin Page',
                    username: req.username,
                    users: result,
                    message: 'Admin Dahboard'
                });
            });
           
        } else {
            res.redirect('/');
        }
    },

    adminDeleteUser: (req, res) => {
        let userID = req.params.id;
        let getImageQuery = "SELECT avtar FROM `users` WHERE id = '" + userID + "'";
        let deletUser = "DELETE FROM `users` WHERE id = '" + userID + "'";

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].avtar;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deletUser, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.render('middleware/admin-panel.ejs', {
                        title: '',
                        message: '',
                        username: req.username,
                        users: result
                    });
                });
            });
        });
    }

}