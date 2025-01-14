const jwt = require('jsonwebtoken');
const User = require('../../model/User');

exports.authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer', '').trim();
    console.log(token);

    if (req.originalUrl.includes("/api-docs")) {
        return next();
    }
    
    if(!token) {
        return res.status(401).json({ message: 'Access denied. Token not available'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if(!user) {
            return res.status(401).json({ message: 'User not found'});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Invalid token', error});
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({message: 'Access Denied'});
        }
        next();
    }
}