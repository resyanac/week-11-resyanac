const jwt = require('jsonwebtoken')
const { JWT_SIGN } = require('../config/jwt.js')

const authorizationMiddlewareAll = (req, res, next) => {
  const authHeader = req.headers.authorization
  
  if (!authHeader) {
    res.status(401).json({ error: 'Authorization Unauthorized' })
  } else {
    const token = authHeader.split(' ')[1]
    
    try {
      const decodedToken = jwt.verify(token, JWT_SIGN)
      if (decodedToken.role === 'reviewer' || decodedToken.role === "approver") {
        next()
      } else {
        res.status(401).json({ error: 'Authorization Unauthorized' })
      }
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}

const authorizationMiddlewareUser = (req, res, next) => {
  const authHeader = req.headers.authorization
  
  if (!authHeader) {
    res.status(401).json({ error: 'Authorization Unauthorized' })
  } else {
    const token = authHeader.split(' ')[1]
    
    try {
      const decodedToken = jwt.verify(token, JWT_SIGN)
      if (decodedToken.role === 'reviewer') {
        next()
      } else {
        res.status(401).json({ error: 'Authorization Unauthorized' })
      }
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}

const authorizationMiddlewareApprover = (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log(authHeader);
    
    if (!authHeader) {
      res.status(401).json({ error: 'Authorization Unauthorized' })
    } else {
      const token = authHeader.split(' ')[1]
      console.log(token);
      
      try {
        const decodedToken = jwt.verify(token, JWT_SIGN)
        if (decodedToken.role === 'approver') {
          next()
        } else {
          res.status(401).json({ error: 'Authorization Unauthorized' })
        }
      } catch (error) {
        res.status(400).json({ error: error.message })
      }
    }
  }

  module.exports = {
    authorizationMiddlewareAll,
    authorizationMiddlewareUser,
    authorizationMiddlewareApprover,
  };