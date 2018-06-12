//引入 connect
const {connect} = require('./database/init.js')

//立即执行函数
;(async () => {
  await connect()
})()