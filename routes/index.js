module.exports = {
    homePage: (req, res) => {
        let query = "SELECT * FROM `users` ORDER BY id ASC";
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }

            res.render('layouts/welcome.ejs', {
                title: 'Home page',
                username: req.session.fname,
                message: ''
            });
        });
    },

    userHomePage: (req, res) => {
        let query = "SELECT * FROM users ORDER BY id ASC";

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('middleware/users-panel.ejs', {
                title: 'User Dashbord',
                username: req.username,
                users: result,
                message: ''
            });
        })
    }
}



// const express = require('express');
// const router = express.Router();


// module.exports = router;

// router.get('/', (req, res) => {
//     res.render('layouts/welcome.ejs');
// });