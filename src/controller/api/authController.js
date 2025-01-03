const User = require('../../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: 'User already exist'}); 

        const user = new User({ name, email, password, role});
        await user.save();
        res.status(200).json({message: 'User registered Successfully'});
    } catch (error) {
        res.status(500).json({error: 'Server Error'});
    }
};

exports.login = async (req, res) => {
    try {
        const {email, password } = req.body;
        const user = await User.findOne({email});
        if (!user) return res.status(404).json({message: 'User not found'});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(401).json({message: 'Invalud Credentials'});

        const token = jwt.sign({userId: user._id, role: user.role }, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({message: 'Login Successful', token,
            user: {userId: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({error: 'Server Error '});
    }
}