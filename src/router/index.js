import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Content from '~/content'
import Save from '~/saveArticle'
// const Savee = resolve => require(['~/saveArticle'], resolve)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Content',
      component: Content
    },
    {
      path: '/save',
      name: 'Save',
      component: Save
    }
  ]
})
