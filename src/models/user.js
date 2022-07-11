const mongooes = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongooes.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    email:{
        type: String,
        require: true,
        trim: true,
        unique:true,
        lowercase:true
    },
    has_password:{
        type: String,
        require: true,
    },
    phone:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true     
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    image:{
        type: String
    }
}, {timestamps: true});

userSchema.virtual('password')
          .set(function(password){
            this.has_password = bcrypt.hashSync(password, 10);
          });

userSchema.virtual('fullName')
          .get(function(){
            return `${this.firstName} ${this.lastName}`;
          });

userSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.has_password);
    }
};

module.exports = mongooes.model('User', userSchema);