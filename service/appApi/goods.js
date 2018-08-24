// 关于商品的 数据操作
const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/insertAllGoodsInfo', async (ctx) => {
  fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    console.log(data)
    let saveCount = 0
    const Goods = mongoose.model('Goods')
    data.map((value, index) => {
      let newGoods = new Goods(value)
      newGoods.save().then(() => {
        saveCount++
        console.log('成功yes' + saveCount)
      }).catch(error => {
        console.log('失败No：' + error)
      })
    })
  })
  ctx.body = "开始导入数据"
})

router.get('/insertAllCategorySub', async (ctx) => {
  fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const CategorySub = mongoose.model('categorySub')
    data.RECORDS.map((value, index) => {
      console.log(value)
      let newCategorySub = new CategorySub(value)
      newCategorySub.save().then(() => {
        saveCount++
        console.log('成功插入' + saveCount)
      }).catch(error => {
        console.log('插入失败:' + error)
      })
    })
  })
  ctx.body = "开始导入数据"
})
// 获取大类信息（均测试，是否正常读取数据库信息和返回结果是够正确‘’）
router.get('/getCategoryList',async(ctx)=>{
  try{
      const Category = mongoose.model('Category')
      let result = await Category.find().exec()
      console.log(result ,'读取大类别')
      ctx.body={code:200,message:result}
  }catch(err){
      ctx.body={code:500,message:err}
  }
 
})
// 之前 漏掉的
router.get('/insertAllCategory',async(ctx)=>{
  fs.readFile('./data_json/category.json','utf8',(err,data)=>{
      data=JSON.parse(data)
      let saveCount=0
      const Category = mongoose.model('Category')
      data.RECORDS.map((value,index)=>{
          console.log(value)
          let newCategory = new Category(value)
          newCategory.save().then(()=>{
              saveCount++
              console.log('成功'+saveCount)
          }).catch(error=>{
               console.log('失败：'+error)
          })
      })
     
      
  })
  ctx.body="开始导入数据"

})
// 分类下的子类信息
router.post('/getCategorySubList',async(ctx)=>{
  try{
      let categoryId = ctx.request.body.categoryId
      // let categoryId = 1
      const CategorySub = mongoose.model('categorySub')
      let result = await CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec()
      ctx.body={code:200,message:result}
  }catch(err){
      ctx.body={code:500,message:err}
  }

})
// 根据商品类别获取商品列表
router.post('/getGoodsListByCategorySubID',async(ctx)=>{
  try{
      let categorySubId = ctx.request.body.categoryId
      let pageNum = ctx.request.body.page //页数
      let num = 10 //每页展示的条数
      let start = (pageNum-1)*num
      // let categorySubId = '2c9f6c946016ea9b016016f79c8e0000'
      const Goods = mongoose.model('Goods')
      let result = await Goods.find({SUB_ID:categorySubId})
      .skip(start).limit(num).exec()
      ctx.body={code:200,message:result}
  }catch(err){
      ctx.body={code:500,message:err}
  }

})
//此段代码 async awit以及peomise、then进行了混合使用，其实不是很规范，看起来也不是很优雅
router.post('/getDetailGoodsInfo', async (ctx) => { 
  console.log(ctx.request.body)
  // let goodsId = cts.request.body.goodsId
  // const Goods = mongoose.model('Goods')
  // await Goods.findOne({ ID: goodsId }).exec()
  //   .then(async (result) => {
  //     ctx.body = {
  //       code: 200,
  //       message: result
  //     }
  //   }).catch(error => {
  //     console.log(error)
  //     ctx.body = {
  //       code: 500,
  //       message: error
  //     }
  //   })

  // 优雅改造前后对比
  try{
    let goodsId = cts.request.body.goodsId
    const Goods = mongoose.model('Goods')
    let result = await Goods .findOne({ID:goodsId}).exec()
    ctx.body={
      code:200,
      message:result
    }
  }catch(err){
    ctx.body={
      code:500,
      message:error
    }
  }
})
module.exports = router