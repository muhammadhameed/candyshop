const jwt = require('jsonwebtoken');

function auth(req, res, next){

    const token = req.header('auth-token');

    if(!token){
        res.status(401).json('Authorization denied');
    }

    try{
        const decoded = jwt.verify(token, process.env.jwtSecret);

        req.user = decoded;
        next();
    }
    catch(e){
        res.status(400).json('Token is not valid');
    }
}

module.exports = auth; 