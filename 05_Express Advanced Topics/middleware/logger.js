
function log (req, res, next){
    console.log('Logging ...');
    next();
};

function authentication (req, res, next){
    console.log('Authenticating ...');
    next();
};

module.exports.log = log;
module.exports.authentication = authentication;
