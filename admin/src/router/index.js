import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

Vue.use(VueRouter);
// 解决跳转到路由本身而出现的红色报错
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {path: '/categories/create', component: CategoryEdit},
      {path: '/categories/edit/:id', component: CategoryEdit, props: true},
      {path: '/categories/list', component: CategoryList}
    ]
  },
  
  
]

const router = new VueRouter({
  routes
})

export default router
