const mongoose = require('mongoose')
const db = 'mongodb://localhost/simle-db'

mongoose.Promise = global.Promise

exports.connect = () => {
  //连接数据库
  mongoose.connect(db)
  //增加数据库连接的事件监听
  mongoose.connection.on('disconnented',() => {
    mongoose.connect(db) //进行重新连接
  })
  //数据库 连接错误的时候
  mongoose.connection.on('error',err => {
    console.log(err)
    mongoose.connect(db)
  })
  // 链接打开的时候
  mongoose.connection.once('open',() => {
    console.log('Mongoose connected success')
  })
}