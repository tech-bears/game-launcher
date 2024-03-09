import VueRouter from "vue-router";
import { PASS_ROUTER } from "./contain.js";

import noLoginHome from '../pages/noLoginHome/index.vue'
import Register from '../pages/register/index.vue'
import Phone from '../pages/phone/index.vue'
import Home from '../pages/home/index.vue'
import resetNamePage from '../pages/resetUserNamePage/index.vue'
import resetPasswordPage from '../pages/resetPasswordPage/index.vue'
import resetAvatar from '../pages/resetAvatarPage/index.vue'
const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/no-login',
            name: 'noLoginHome',
            component: noLoginHome,
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/phone',
            name: 'phone',
            component: Phone
        },
        {
            path: "/",
            name: 'home',
            component: Home
        },
        {
            path: "/reset-name",
            name: 'resetName',
            component: resetNamePage
        },
        {
            path: "/reset-pwd",
            name: 'resetPassword',
            component: resetPasswordPage
        },
        {
            path: "/reset-avatar",
            name: 'resetAvatar',
            component: resetAvatar
        }
        
    ]
})

// TODO: 路由守卫需要移动到单独js中
router.beforeEach((to, from, next) => {
    if (PASS_ROUTER.includes(to.path)) return next()
    const session = localStorage.getItem('SUMMON_WAR_SESSION')
    if (!session) return next('/no-login')
    console.log(session, 'session');
    next()
})

export default router;