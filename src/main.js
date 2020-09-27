import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import getApi from '@/api/index'
import utils from '@/utils/utils'

import infiniteScroll from 'vue-infinite-scroll'

import niceLoading from '@/components/common/loading/Index.vue'
import niceEmpty from '@/components/common/empty/Index.vue'

import '@/assets/styles/reset.styl'
import '@/assets/styles/common.css'
import '@/assets/styles/iconfont.css'
import '@/assets/styles/iconfont.js'
import {
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Form,
  FormItem,
  Input,
  Button,
  Image,
  Icon,
  InfiniteScroll,
  Pagination,
  MessageBox,
  Message,
  Notification,
  Table,
  TableColumn,
  Popover,
  Tooltip,
  Slider,
  Loading,
  Carousel,
  CarouselItem
} from 'element-ui'
Vue.use(Avatar)
  .use(Image)
  .use(Icon)
  .use(Pagination)
  .use(InfiniteScroll)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Button)
  .use(Table)
  .use(TableColumn)
  .use(Popover)
  .use(Tooltip)
  .use(Slider)
  .use(Loading)
  .use(Carousel)
  .use(CarouselItem)

Vue.use(infiniteScroll)
Vue.prototype.$api = getApi
Vue.prototype.utils = utils

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.component('niceLoading', niceLoading)
Vue.component('niceEmpty', niceEmpty)

Vue.config.productionTip = false

// button阻止重复点击
Vue.directive('preventReClick', {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 3000)
      }
    })
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
