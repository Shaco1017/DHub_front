import { createRouter, createWebHistory } from 'vue-router'

// 路由配置
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/login.vue'),
    meta: { title: '登录', guest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/register.vue'),
    meta: { title: '注册', guest: true }
  },
  {
    path: '/service',
    name: 'Service',
    component: () => import('@/views/service/index.vue'),
    meta: { title: '服务大厅' }
  },
  {
    path: '/service/wigs',
    name: 'Wigs',
    component: () => import('@/views/service/wigs.vue'),
    meta: { title: '假发预约' }
  },
  {
    path: '/service/cosplay',
    name: 'Cosplay',
    component: () => import('@/views/service/cosplay.vue'),
    meta: { title: '服装预约' }
  },
  {
    path: '/service/makeup',
    name: 'Makeup',
    component: () => import('@/views/service/makeup.vue'),
    meta: { title: '妆面预约' }
  },
  {
    path: '/service/detail/:id',
    name: 'ServiceDetail',
    component: () => import('@/views/service/detail.vue'),
    meta: { title: '服务详情' }
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import('@/views/team/index.vue'),
    meta: { title: '组队大厅' }
  },
  {
    path: '/team/create',
    name: 'TeamCreate',
    component: () => import('@/views/team/create.vue'),
    meta: { title: '创建组队', requiresAuth: true }
  },
  {
    path: '/team/detail/:id',
    name: 'TeamDetail',
    component: () => import('@/views/team/detail.vue'),
    meta: { title: '组队详情' }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/order/index.vue'),
    meta: { title: '我的预约', requiresAuth: true }
  },
  {
    path: '/order/:id',
    name: 'OrderDetail',
    component: () => import('@/views/order/detail.vue'),
    meta: { title: '订单详情', requiresAuth: true }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/user/index.vue'),
    meta: { title: '个人中心', requiresAuth: true }
  },
  {
    path: '/user/profile',
    name: 'UserProfile',
    component: () => import('@/views/user/profile.vue'),
    meta: { title: '资料编辑', requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = `${to.meta.title || 'DHub'} - 漫展社区`

  // 获取 token
  const token = localStorage.getItem('token')

  // 需要登录的页面
  if (to.meta.requiresAuth && !token) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
    return
  }

  // 已登录访问游客页面（如登录页）
  if (to.meta.guest && token) {
    next({ name: 'Home' })
    return
  }

  next()
})

export default router
