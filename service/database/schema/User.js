const mongoose= require('mongoose')
const Schema = mongoose.Schema //数据库的一种模型骨架  我们常说的建模

let ObjectId = Schema.Types.ObjectId

//创建我们的 用户Schema
const UserSchema = new Schema({
  UserId:ObjectId,
  userName:{uniquire:true,type:String},
  password:String,
  creatAt:{type:Date,default:Date.now()},
  lastLogAt:{type:Date,default:Date.now()}
})
// 比对我们加盐加密后的密码
UserSchema.methods={
  comparePassword:(_password,password) => {
    return new Promise(resolve,reject, (err,isMatch) => {
      if (!err){
        resolve(isMatch)
      }else{
        reject(isMatch)
      }
    })
  }
}

//发布模型
mongoose.model('User',UserSchema)