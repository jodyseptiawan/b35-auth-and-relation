// import package here
const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
  const authHeader = req.header('Authorization')

  console.log("--------------------------")
  console.log("authHeader")
  console.log(authHeader)
  console.log(authHeader.split(' ')[1])
  console.log("--------------------------")
  
  const token = authHeader && authHeader.split(' ')[1]

  if(!token){
    return res.send({
      message: 'Access denied!'
    })
  }

  try {

    const verified = jwt.verify(token, 'IniPrivateKeyBatch35')

    req.user = verified

    // res.send('ini middlewares auth')

    next()
  } catch (error) {
    res.send({
      message: 'Invalid Token'
    })
  }

};
