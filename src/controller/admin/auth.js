const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email})
        .exec(async (error, user) => {
            if(user) return res.status(400).json({
                message: 'Admin  already registered'
            });
            const { firstName, lastName, email, password, address, phone} = req.body;
            const hash_password = await bcrypt.hash(password, 10)
            const _user = new User(
                {
                    firstName,
                    lastName,
                    email,
                    hash_password,
                    address,
                    phone,
                    role: 'admin'
                });
            
            _user.save((error, data) => {
                if(error) return res.status(400).json({
                    message: 'Something went wrong'
                });
                
                if(data) return res.status(201).json({
                    user: data,
                    message: 'Admin created success!'
                })
            });
        });
}

exports.signin = (req, res) => {
    User.findOne({email: req.body.email})
        .exec((error, user) => {
            if(error) return res.status(400).json({error});

            if(user){
                if(user.authenticate(req.body.password) && user.role === 'admin'){
                    const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1d'});
                    const { _id, firstName, lastName, fullName, email, role, address, phone} = user;
                    res.cookie('token', token, {expiresIn: '1d'})
                    res.status(200).json({
                        token,
                        user:{
                            _id, firstName, lastName, fullName, email, role, address, phone
                        }
                    })
                }
                else{
                    return res.status(400).json({
                        message: 'Invalid Password'
                    })
                }
            }else{
                return res.status(400).json({message: 'Something went wrong'})
            }
        });
}

exports.signout = (req, res) =>{
    res.clearCookie('token');
    res.status(200).json({
        message: 'Signout successfully...!'
    })
}