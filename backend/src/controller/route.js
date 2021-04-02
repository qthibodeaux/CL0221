require('dotenv').config()

const expressJwt = require('express-jwt');
const jwtMiddleWare = expressJwt({ secret: process.env.ACCESS_TOKEN_SECRET, algorithms: ['HS256'] } )

module.exports = function(app) {
    const db = require('./controller');

    app.post('/register', db.register);
    app.post('/bookmarks', db.postmarks);
    app.post('/publish', db.publish)
    app.get('/stories', db.stories);
    app.get('/getall', db.getall);
    app.get('/bookmarks', db.getmarks);
}