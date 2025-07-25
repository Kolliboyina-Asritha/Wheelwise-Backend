const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    console.log(`🟡 Credentials Middleware → Origin: ${origin}`);
    if (allowedOrigins.includes(origin)) {
        console.log(`🟢 Origin Allowed: ${origin}`);
        res.header('Access-Control-Allow-Credentials', true);
    } else {
        console.log(`🔴 Origin Blocked: ${origin}`);
    }
    next();
};

module.exports = credentials;
