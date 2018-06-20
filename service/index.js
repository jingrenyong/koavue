//引入 connect
const koa = require('koa')
const app =new koa()
const Router =  require('koa-router')
const cors= require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const { connect, initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')

let user = require("./appApi/User.js")

app.use(bodyParser())
app.use(cors()) 

// 装载所有路由
let router = new Router()
router.use('/user',user.routes())
// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

  //立即执行函数
  ;(async () => {
    await connect()
    initSchemas()
    const User = mongoose.model('User')
    // let oneUser = new User({ userName: 'jspang', password: '123456' })
    // oneUser.save().then(() => {
    //   console.log('插入成功')
    // })

    let users = await User.find({}).exec()
    console.log('------------------')
    console.log(users)
    console.log('------------------')
  })()
app.use(async (ctx) => {
  ctx.body='<p>hello koa2</p>'
})
app.listen(3000,() => {
  console.log('Service start 3000')
})
