const Router = require('koa-router')
const mongoose=require('mongoose')
let router =new Router()
router.get('/',async(ctx) => {
  ctx.body='这是用户操作首页'
})
router.post('/login',async(ctx) => {
  console.log(ctx.request)
  let loginUser= ctx.request.body
  let userName = loginUser.userName
  let password=loginUser.password
  //引入 user的 model
  const user = mongoose.model('User')  
  //查找用户名是否存在 ，如果存在开始比对密码
  await user.findOne({userName:userName}).exic().then(async(result) => {
    console.log(result)
    if (result){
      //当用户名存在时，开始比对密码
      let newUser = new user()
      await newUser.comparePassword(password,result.password)
      .then((isMatch) => {
        ctx.body={
          code:200,
          message:isMatch
        }
      }).catch( err => {
        ctx.body={
          code:500,
          message:err
        }
      })
    }else{
      ctx.body={ code:200, message:'用户名不存在'}
    }
  })
})
router.post('/register',async(ctx) => {
  //取得Model
 const User= mongoose.model('User')
  //把从前端接收的POST数据封装成一个新的user对象
 let newUser= new User(ctx.request.body)
 //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
 await newUser.save().then(() => {
   ctx.body={
     code:200,
     message:'注册成功' 
   }
 }).catch(err => {
   ctx.body={
    code:500,
    message:err
   }
 })
})

module.exports = router