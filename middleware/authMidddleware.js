const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Corrected import with uppercase 'User'

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    // check if JWT token exists
    if (token) {
        jwt.verify(token, 'kartikeya secret', (err, decodedToken) => {
            if (err) {
                
                res.redirect('/login');
            } else {
                
                next();
            }
        });
    } else {
        res.redirect('/login');
    }
};

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'kartikeya secret', async (err, decodedToken) => {
            if (err) {
                
                res.locals.user = null;
                next();
            } else {
                
                let user = await User.findById(decodedToken.id); // Now 'User' is defined
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = { requireAuth, checkUser };
