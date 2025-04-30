const { MockVerify } = require('../models');
const { to, ReE } = require('../services/util.service');

let checkUser = async function (req, res, next) {
    let user, err;
    [err, user] = await to(MockVerify.findOne({ 
            where: { id: req.body.accessId, roles:'user' },
            attributes: [
                'id','in','roles'
            ],
     }));
     if(!user)return ReE(res, { static_key: 'UNAUTHORIZED_USER', message: "Unauthorized user." }, 401);
    if (err) return ReE(res, { static_key: 'UNAUTHORIZED_USER', message: "Unauthorized user." }, 401);

    user = req.user;
    next();
}
let adminUser = async function (req, res, next) {

    let user, err;
    [err, user] = await to(MockVerify.findOne({ 
            where: { id: req.body.accessId, roles:'admin' },
            attributes: [
                'id','in','roles'
            ],
     }));
     if(!user)return ReE(res, { static_key: 'UNAUTHORIZED_USER', message: "Unauthorized user." }, 401);
    if (err) return ReE(res, { static_key: 'UNAUTHORIZED_USER', message: "Unauthorized user." }, 401);

    user = req.user;
    next();
}
module.exports.checkUser = checkUser;
module.exports.adminUser = adminUser;