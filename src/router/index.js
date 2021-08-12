import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import HomeIndex from '@/views/home'
import LayoutIndex from '@/views/layout'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'login',
    component: Login,
}, {
    path: '/',
    // name: 'layout',  //如果父路由设置了默认的子路由,那就不要设置名字
    component: LayoutIndex,
    children: [{
        path: '', //path 为空是设置为默认子路由
        name: 'home',
        component: HomeIndex,
    }]

}, ]

const router = new VueRouter({
    routes
})

export default router