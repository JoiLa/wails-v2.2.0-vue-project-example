import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/Index/index.vue'
import CommonsIndex from '../views/Commons/index.vue'
import CommonsIframeTemplate from '../views/Commons/IframeTemplate/index.vue'

// createRouter 创建路由实例
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/commons',
      component: CommonsIndex,
      children:[
        {
          path: 'iframe-template',
          name: 'IframeTemplate',
          component: CommonsIframeTemplate,
          meta: {
            title: 'IframeTemplate',
            breadcrumb: false
          }
        }
      ],
      hidden: true
    }
  ]
})

// 抛出路由实例, 在 main.js 中引用
export default router