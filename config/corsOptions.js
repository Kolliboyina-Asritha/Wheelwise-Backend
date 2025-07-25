const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
        console.log(`🌐 CORS Origin Check: ${origin}`);
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            console.log(`✅ Origin Passed CORS: ${origin}`);
            callback(null, true);
        } else {
            console.log(`❌ Origin Blocked by CORS: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

module.exports = corsOptions;
