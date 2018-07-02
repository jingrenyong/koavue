//用 nodejs fs模块读入数据
 const fs=require('fs')

 fs.readFile('./goods.json','utf8',function(err,data){
   let newData = JSON.parse(data)
   let i =0
   let pushData = []
   newData.RECORDS.map(function(value,index){
     if (value.IMAGE1 != null){
       i++
       console.log(value.NAME)
       pushData.push(value)
     }
   })
   console.log(pushData, i )
   fs.writeFile('./newGoods.json',JSON.stringify(pushData),function (err) {
     if (err) console.log('写文件操作失败')
     else console.log('写文件操作成功')
   })
 })