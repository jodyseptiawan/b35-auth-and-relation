// import model here
const { user } = require('../../models')

// import package here
const joi = require('joi')

exports.register = async (req, res) => {
  // name, email, password

  const schema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).required()
  })

  const { error } = schema.validate(req.body);

  if(error){
    return res.send({
      error: error.details[0].message
    })
  }

  try {
  const data = await user.create(req.body)

  res.send({
    message: 'Register success',
    data
  })
  } catch (error) {
    console.log(error);
    res.send({
      status: 'Failed',
      message: 'Server Error'
    })
  }

};

exports.login = async (req, res) => {

  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).required()
  })

  const { error } = schema.validate(req.body);

  if(error){
    return res.send({
      error: error.details[0].message
    })
  }

  try {

  const {email, password} = req.body

  const data = await user.findOne({
    where: {
      email
    }
  })

  if(!data){
    return res.send({
      message: `Email: ${email} not found!`
    })
  }

  if(password != data.password){
    return res.send({
      message: `Password not match!`
    })
  }

  res.send({
    message: 'Login success',
  })
  } catch (error) {
    console.log(error);
    res.send({
      status: 'Failed',
      message: 'Server Error'
    })
  }
};
