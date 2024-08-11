const User = require('../models/User');
const jwt = require('jsonwebtoken');
// Handle errors
const handleErrors = (err) => {
    
    let errors = { email: "", password: "" };

    // Validation errors
    if (err.message.toLowerCase().includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    //incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'the email is not regiesterd'
    }
    //incorrect password
    if(err.message === 'incorrect password'){
        errors.password = 'the password is incorrect'
    }

    // Duplicate email error
    if (err.code && err.code === 11000) {
        errors.email = 'Email is already registered';
    }

    return errors;
};
const MaxAge = 3*24*60*60;
const createToken = (id)=>{
    return jwt.sign({id},'kartikeya secret',{
        expiresIn:MaxAge
    });
}


module.exports.signup_get = (req, res) => {
    res.render('signup');
};

module.exports.login_get = (req, res) => {
    res.render('login');
};

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password }); // It's async

        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,MaxAge:MaxAge*1000});
        res.status(201).json({ user: user._id });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password); 
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,MaxAge:MaxAge*1000});
        res.status(200).json({ user: user._id });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};

module.exports.logout_get = (req,res)=>{
    res.cookie('jwt','',{MaxAge:1});
    res.redirect('/');
}