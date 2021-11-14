// imports
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');

// get users
const getUsers = async (req, res, next) => {
    let users;

    try{
        users = await User.find({}, '-password');
    } catch (e){
        const error = new HttpError('Cannot find user', 422);
        return next(error);
    }

    // send response by mapping users and generate new id
    res.json({users : users.map( user => user.toObject({getters: true }) )});
};

// get me / my profile
const getMe = async (req, res, next) => {
    const body = req.body;
    console.log(req.body);

    let _id = body._id;
    let user;

    try{
        user = await User.findOne({_id}, '-password');
    } catch (e){
        const error = new HttpError('Utilizatorul nu exista', 422);
        return next(error);
    }
    // send user response
    res.status(200).json({user});
};

// create user
const signUp = async (req, res, next) => {
    const {email, password, firstName, lastName} = req.body;

    // check if user already exists
    let existingUser;
    try{
        existingUser = await User.findOne({ email });
    } catch (e){
        const error = new HttpError('Signup up failed, please try again later', 422);
        return next(error);
    }

    if (existingUser){
        const error = new HttpError('Deja exista un cont cu aceasta adresa de email, va rog sa va autentificti.', 422);
        return next(error);
    }

    // hash password
    let hashedPassword;
    try{
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (e){
        const error = new HttpError('Could not crate user, please try again', 422);
        return next(error);
    }

    // create new user
    const createdUser = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
    })

    // save new user
    try {
        await createdUser.save();
    } catch (e){
        const error = new HttpError('Signing up failed, please try again.', 422);
        return next(error);
    }

    // generate token
    let token;
    try {
        token = jwt.sign({
            userID: createdUser.id,
            email: createdUser.email
        }, 'supersecret_dont_share', {expiresIn: '1h'});
    } catch (e) {
        const error = new HttpError('Signing up failed, please try again.', 422);
        return next(error);
    }

    // send response
    res.status(200).json({user: createdUser.id, email: createdUser.email, token });
}

// login
const login = async (req, res, next) => {
    const {email, password} = req.body;

    // check if user exist
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    } catch (e){
        const error = new HttpError('Signup in failed, please try again later', 422);
        return next(error);
    }

    // if there's no user
    if(!existingUser){
        const error = new HttpError('Contul nu exista.', 403);
        return next(error);
    }

    // check password
    let isValidPassword = false;
    try{
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (e){
        const error = new HttpError('Could not log you in, please check your credentials and try again', 403);
        return next(error);
    }

    // password doesnt match
    if(!isValidPassword){
        const error = new HttpError('Ai introdus greșit parola sau adresa de email. Te rugăm sa incerci din nou.', 403);

        return next(error);
    }

    // token
    let token;
    try{
        token = jwt.sign({
            userId: existingUser.id,
            email: existingUser.email
        }, 'supersecret_dont_share', {expiresIn: '1h'});
    } catch (e){
        const error = new HttpError('Loggin in failed, please try again.', 422);
        return next(error);
    }

    // send response
    res.status(200).json({
        userId: existingUser.id,
        email: existingUser.email,
        token,
        lastName: existingUser.lastName,
        firstName: existingUser.firstName,
    });
};

// export
exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;
exports.getMe = getMe;