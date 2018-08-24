
<template>
   <div>
        <div class="navbar-div">
             <van-nav-bar   title="类别列表" /> 
        </div> 
        <van-row>
          
        <van-col span="6">
            <div id="leftNav">
                <ul>
                  <li @click="clickCategory(index,index)"  :class="{categoryActive : categoryIndex==index}" v-for="(item,index) of category" :key='index'>
                    {{item.MALL_CATEGORY_NAME}}
                  </li>
                </ul>
            </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs @click="onClickCategorySub" v-model="active">
              <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
                <div id="list-div">
                <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                 <van-list v-model="loading" :finished='finished' @load="onLoad">
                    <div class="list-item" v-for="(item,index) of goodList" :key="index">
                      <div class="list-item-img"><img :src="item.IMAGE1" width="100%" :onerror='errImg'/></div>
                       <div class="list-item-text">
                            <div>{{item.NAME}}</div>
                            <div class="">￥{{item.ORI_PRICE}}</div>
                       </div>
                    </div>
                  </van-list>
                </van-pull-refresh>
                </div>
              </van-tab>
            </van-tabs>
          </div>
        </van-col>
    </van-row>
    </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";

export default {
  data() {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [],
      active: 0,
      loading: false, //上拉加载
      finished: false, //下拉刷新是否还有数据
      isRefresh: false, //下拉刷新
      page: 1, //商品列表页数
      goodList: [],//赏析信息
      categorySubId: "", //商品 子分类ID
      errorImg:'this.src="' + require('@/assets/images/errorimg.png') + '"',//错误图片的显示处理
    };
  },
  methods: {
    getGoodList() {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: "post",
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.page++;
            this.goodList = [...this.goodList, ...res.data.message];
          } else {
            this.finished = true;
          }
          this.loading = false;
          console.log(this.finished + "key");
        })
        .catch(err => {
          console.log(err);
        });
    },
    onClickCategorySub(index, title) {
      //点击子类获取 商品信息
      this.categorySubId = this.categorySub[index].ID;
      //  初始化数据
      this.goodList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
    },
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then((res, req) => {
          console.log(res);
          if (res.data.code == 200) {
            console.log("读取数据成功");
            this.category = res.data.message;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.page = 1;
      this.finished = false;
      this.goodList = [];
      this.getCategorySubByCategoryId(categoryId);
    },
    //根据大类ID读取小类类别列表
    getCategorySubByCategoryId(categoryId) {
      axios({
        url: url.getCategorySubList,
        method: "post",
        data: {
          categoryId: categoryId
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.categorySub = res.data.message;
            this.active = 0;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodList();
      }, 600);
    },
    onRefresh() {
      setTimeout(() => {
         this.isRefresh = false;
        this.finished = false;
        this.goodList=[];
        this.page=1
        this.onLoad()
      }, 500);
    }
  },
  mounted() {
    let winHeigh = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeigh - 46 + "px";
    // document.getElementById("list-div").style.height = winHeigh - 90 + "px"
  },
  created() {
    this.getCategory();
  }
};
//
</script>

<style scoprd>
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #e0dbdb;
}

 .list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>

