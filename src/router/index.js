import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import HomeIndex from '@/views/home'
import LayoutIndex from '@/views/layout'
import Article from '@/views/article'
import Publish from '@/views/publish'

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
    }, {
        path: '/article',
        name: 'article',
        component: Article,
    }, {
        path: '/publish',
        name: 'publish',
        component: Publish,
    }]

}, ]





const router = new VueRouter({
    routes
});
//添加守卫
router.beforeEach((to, from, next) => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (to.path !== '/login') {
        if (user) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
})

export default router