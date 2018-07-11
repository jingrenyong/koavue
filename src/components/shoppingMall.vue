<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="3"><img :src="locationIcon" width="80%" class="location-icon"></van-col>
          <van-col span="16">
          <input type="text" class="search-input">
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
    </van-row>
    </div>
    <!-- swipe Area -->
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner ,index) of bannerPicArray" :key="index">
          <img v-lazy="banner.image" width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- tab bar -->
    <div class="type-bar">
      <div v-for="(cate , index) of category" :key="index">
        <img v-lazy="cate.image" width="90%" >
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
     <!--adbanner area 广告图-->
        <div>
            <img v-lazy="advertesPicture" width="100%" />
        </div>
    <!-- 商品推荐 recommend goods 滑块-->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options='swiperOption'>
          <swiper-Slide v-for="(item , index) of recommendGoods" :key="index">
            <div class="recommend-item" >
              <img :src="item.image" width="80%">
              <p>{{item.goodsName}}</p>
              <p>￥{{item.price}} (￥{{item.mallPrice}})</p>
            </div>
          </swiper-Slide>
        </swiper>
      </div>
    </div>
    <!-- 楼层 floor area-->
    <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
    <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
    <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
    <!-- Hot buy area -->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!-- list -->
        <van-list>
         <van-row gutter='20'>
            <van-col span="12" v-for="(item,index) of hotGoods" :key="index">
              <goods-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
          </van-col>
         </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floorComponent from "./component/floorComponent";
import goodsInfo from './component/goodsInfoComponent'
import { toMoney } from "@/filter/moneyFilter.js";
import url from '@/serviceAPI.config.js'
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      category: [],
      hotGoods: [], //热卖
      locationIcon: "../../assets/images/location.png",
      bannerPicArray: [],
      advertesPicture: "", //广告图片
      recommendGoods: [] //推荐商品
    };
  },
  components: {
    swiper,
    swiperSlide,
    // swiperDefault,
    floorComponent,
    goodsInfo,
  },
  methods: {
    increase() {}
  },
  filters: {
    moneyFilters(money) {
      return toMoney(money);
    }
  },
  created() {
    // 使用easy-mock模拟数据
    axios({
      url:url.getShoppingMallInfo,
      method: "get"
    })
      .then(res => {
        console.log(res.data);
        if (res.status == 200) {
          //你就 长点心吧
          let data = res.data.data;
          this.category = data.category;
          this.advertesPicture = data.advertesPicture.PICTURE_ADDRESS;
          this.bannerPicArray = data.slides;
          this.recommendGoods = data.recommend;
          this.floor1 = data.floor1;
          this.floor2 = data.floor2;
          this.floor3 = data.floor3;
          this.floorName = data.floorName;
          this.hotGoods = data.hotGoods;
        }
      })
      .catch(err => console.log(err));
  }
};
</script>
<style scoped>
.search-bar {
  height: 2.2rem;
  background: #e5017d;
  line-break: 2.2rem;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid 1px !important ;
  background-color: #e5017d;
  color: #fff;
}
.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.swiper-area {
  width: 20rem;
  clear: both;
}
.type-bar {
  background: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
}

.recommend-area {
  background: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eeeeee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-item p {
  margin: 0;
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
</style>

