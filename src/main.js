import Vue from 'vue'
import App from './App'
import router from './router'
import { Button ,Row ,Col,Search , Swipe ,PullRefresh,SwipeItem , Lazyload , List ,Field, NavBar,Tab,Tabs} from 'vant'
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).
use(List).use(Field).use(NavBar).use(Tab).use(Tabs).use(List).use(PullRefresh)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
