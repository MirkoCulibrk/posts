const express = require('express');
const User = require('../model/user');
const router = express.Router();

router.post('/auth/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findUser(email, password);
  console.log(user)
  if (user) {
    req.session.user=user._id;
    console.log(req.session)
    res.json({
      message: 'You are successfully signin',
      auth: true,
    });
  } else {
    res.json({
      message: 'Unable to signin',
      auth: false,
    });
  }
});

router.post('/auth/signup', (req, res) => {
  const user = new User(req.body);
  req.session.user=user._id;
  user
    .save()
    .then(() => {
      res.json({
        message: 'account is created',
        auth: true,
      });
    })
    .catch(() => {
      res.json({
        message: 'unable to create account',
        auth: false,
      });
    });
});
router.get('/auth/hassignned',(req,res)=>{
  console.log(req.session.user)
  if(req.session.user){
    console.log('ss')
    return res.json({
      auth:true,
      message:'You rae signned'
    })
  };
  return res.json({
    auth:false,
    message:"You are not signed"
  })
})
module.exports = router;