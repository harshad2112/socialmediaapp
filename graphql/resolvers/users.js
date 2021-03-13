const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const { UserInputError }=require("apollo-server")
const { SECRET_KEY } = require("../../config.js")
const { validateRegisterInput, validateLoginInput }=require("../../util/validators.js")
const User=require("../../models/user.js")

function generateToken(user)
{
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        },
        SECRET_KEY,
        {expiresIn:"1h"}
    );
}

module.exports={
    Mutation: {
        async login(_, { username, password } )
        {
            const { errors,valid } = validateLoginInput(username, password)
            const user=await User.findOne({username});
            if(!valid){
                throw new UserInputError("Errors",{ errors });
            }
            if(!user)
            {
                errors.general="User not found"
                throw new UserInputError("Wrong credentials",{ errors })
            }
            const match=await bcrypt.compare(password,user.password);
            if(!match)
            {
                errors.general="Password does not match"
                throw new UserInputError("Wrong credentials",{ errors })
            }
            const token=generateToken(user);
            return{
                ...user._doc,
                id: user._id,
                token
            };
        },
        async register(
            _,
            {
                registerInput: { email, username, password, confirmPassword } 
            },
        )
        {
            const { errors,valid } = validateRegisterInput(email, username, password, confirmPassword)
            if(!valid){
                throw new UserInputError("Errors",{ errors });
            }
            const user=await User.findOne({username});
            if(user)
            {
                throw new UserInputError("username is taken",{
                    errors:{
                        username: "This username is taken"
                    }
                })
            }
            password = await bcrypt.hash(password,12);
            const newUser = new User({
                username,
                email,
                password,
                createdAt: new Date().toISOString()
            })
            console.log(newUser)
            const res=await newUser.save();
            
            const token=generateToken(res);
            return{
                ...res._doc,
                id: res._id,
                token
            };
        }
    }
}