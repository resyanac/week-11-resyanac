const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SIGN } = require('../config/jwt.js')



// get all users
const getAllUsers = async (req, res) => {
  try {
   const user = await req.db.collection('users').find().toArray()
   res.status(200).json({
    message: 'Users successfully retrieved',
    data: user,
   })
   console.log(user);
   return user
  } catch (error) {
    const standardError = new StandardError({
      message: error.message || 'Error while registering user',
      status: 500
    })
    next(standardError) 
  }
}

// register

const register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const validRoles = ['reviewer', 'approver'];
    const usernameValue = username.trim(' ');
    if (password.length < 8) {
    return res.status(400).json({
      message: 'Password minimum length 8'
    });
  }
    const alphanumericRegex = /[0-9a-zA-Z]/;
    if (!alphanumericRegex.test(password)) {
    return res.status(400).json({
      message: 'Password has to be alphanumeric'
    });
    }
    if (usernameValue === '' || usernameValue == null) {
    return res.status(400).json({
      message: 'Username cant be blank'
    });
  } 
    if (!validRoles.includes(role)) {
    return res.status(400).json({
      message: 'Invalid Role'
    });
    }
    const user = await req.db.collection('users').findOne({ username });
    if (user) {
    return res.status(400).json({
      message: 'Username already exists'
    });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await req.db.collection('users').insertOne({
      username,
      password: hashedPassword,
      role,
    });
    console.log(newUser);
    res.status(200).json({
      message: 'User successfully registered',
      data: newUser
    }); 
    return newUser
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
}

// login
const login = async (req, res) => {
    const { username, password } = req.body
    
    const user = await req.db.collection('users').findOne({ username })
    console.log(user);
    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(user) {
        if (isPasswordCorrect) {
            const token = jwt.sign({ username: user.username, id: user._id, role: user.role}, JWT_SIGN)
            res.status(200).json({
                message: 'User successfully logged in',
                data: token
            })
        } else {
            res.status(401).json({ error: 'Password is incorrect' })
        }
    } else {
        res.status(401).json({ error: 'User not found'})
    }
}
module.exports = {
  getAllUsers,
  register,
  login
}