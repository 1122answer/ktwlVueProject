import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import api from '@/api'
import './assets/css/font-awesome.min.css' 
import './assets/css/global.css'
Vue.config.productionTip = false

//滚动条组件
import { HappyScroll } from 'vue-happy-scroll'
Vue.component('happy-scroll', HappyScroll)
import 'vue-happy-scroll/docs/happy-scroll.css'

//import css
import 'vue-beauty/package/style/vue-beauty.min.css'

//import components
import vueBeauty from 'vue-beauty'
Vue.use(vueBeauty);

// import VueQuillEditor require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import VueQuillEditor, { Quill } from 'vue-quill-editor'
window.Quill = Quill;

const ImageResize = require( 'quill-image-resize-module' )
Quill.register('modules/ImageResize', ImageResize);
import { ImageDrop } from 'quill-image-drop-module';
Quill.register('modules/imageDrop', ImageDrop)

const toolbar = [
    [{ 'size': ['small', false, 'large'] }],
    ['bold', 'italic'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image']
]
const modules = { toolbar, imageResize: true };
Vue.use(VueQuillEditor,{modules});

//import 引入右键菜单组件
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
Vue.use(contentmenu);

//import ueditor
/*import './static/Ueditor/ueditor.config.js'
import './static/Ueditor/ueditor.all.js'
import './static/Ueditor/lang/zh-cn/zh-cn.js'
import './static/Ueditor/ueditor.parse.js'*/
import './static/Ueditor/themes/default/css/ueditor.min.css'

// Import Helpers for filters
import { convertCurrency, normalDate, chinaDate } from './filter'

// Import Install and register helper items
//Vue.filter('currency', currency);
Vue.filter('convertCurrency', convertCurrency)
Vue.filter('normalDate', normalDate)
Vue.filter('chinaDate', chinaDate)
//匹配要渲染的视图后，再获取数据：
Vue.mixin({
   beforeMount () {
     const { asyncData, initData } = this.$options
     if (asyncData) {
       // 将获取数据操作分配给 promise
       // 以便在组件中，我们可以在数据准备就绪后
       // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
       store.commit('UPDATE_LOADING_STATUS', true)

       this.dataPromise = asyncData({
         store: this.$store,
         route: this.$route
       }).then(() => {
            store.commit('UPDATE_LOADING_STATUS', false)
       })
     }
     if(initData) {
       initData({
         store: this.$store,
         route: this.$route
       })
     }
   }
})

let vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


api.interceptors(store, vm);
//配置全局消息提醒
vm.$message.config({
  top: 300,
  duration: 2,
});