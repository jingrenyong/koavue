<template>
  <swiper :options="swiperOption">
    <swiper-slide class="swiper-slide" v-for="(item , index) of slide" :key="index">
      Slide {{item}}
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      slide: [1, 2, 3, 4],
      swiperOption:{
        paginaton:{
          el:'.swiper-pagination',
          clickable:true,
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>
<style scope>
.swiper-slide {
  text-align: center;
  border-bottom: 1px solid #ccc;
}
</style>


