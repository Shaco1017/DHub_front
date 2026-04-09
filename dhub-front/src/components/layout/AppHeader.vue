<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navItems = [
  { path: '/', name: '首页' },
  { path: '/service', name: '服务大厅' },
  { path: '/team', name: '组队大厅' },
  { path: '/order', name: '我的预约', requiresAuth: true }
]

const filteredNavItems = computed(() => {
  return navItems.filter(item => !item.requiresAuth || userStore.isLoggedIn)
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

function handleLogout() {
  userStore.logout()
  ElMessage.success('已退出登录')
  router.push('/')
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function isActive(path) {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>

<template>
  <header class="app-header" :class="{ 'is-scrolled': isScrolled }">
    <div class="container header-content">
      <!-- Logo -->
      <router-link to="/" class="header-logo">
        <span class="logo-icon">D</span>
        <span class="logo-text">Hub</span>
      </router-link>

      <!-- PC 端导航 -->
      <nav class="header-nav">
        <router-link
          v-for="item in filteredNavItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          :class="{ 'is-active': isActive(item.path) }"
        >
          {{ item.name }}
        </router-link>
      </nav>

      <!-- 用户区域 -->
      <div class="header-user">
        <template v-if="userStore.isLoggedIn">
          <el-dropdown trigger="click">
            <div class="user-info">
              <el-avatar :size="32" :src="userStore.avatar">
                {{ userStore.nickname?.[0] || 'U' }}
              </el-avatar>
              <span class="user-name">{{ userStore.nickname }}</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <router-link to="/user">个人中心</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link to="/user/profile">编辑资料</router-link>
                </el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
        <template v-else>
          <router-link to="/login" class="btn btn-text">登录</router-link>
          <router-link to="/register" class="btn btn-primary">注册</router-link>
        </template>
      </div>

      <!-- 移动端菜单按钮 -->
      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <span :class="{ 'is-open': isMobileMenuOpen }"></span>
      </button>
    </div>

    <!-- 移动端导航菜单 -->
    <transition name="slide">
      <nav v-if="isMobileMenuOpen" class="mobile-nav">
        <router-link
          v-for="item in filteredNavItems"
          :key="item.path"
          :to="item.path"
          class="mobile-nav-link"
          @click="isMobileMenuOpen = false"
        >
          {{ item.name }}
        </router-link>
        <template v-if="!userStore.isLoggedIn">
          <router-link to="/login" class="mobile-nav-link" @click="isMobileMenuOpen = false">
            登录
          </router-link>
          <router-link to="/register" class="mobile-nav-link" @click="isMobileMenuOpen = false">
            注册
          </router-link>
        </template>
        <template v-else>
          <button class="mobile-nav-link" @click="handleLogout">退出登录</button>
        </template>
      </nav>
    </transition>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: all var(--transition-normal);

  &.is-scrolled {
    box-shadow: var(--shadow-sm);
  }
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.header-logo {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  color: var(--color-primary);

  .logo-icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-primary);
    color: white;
    border-radius: var(--radius-md);
    font-size: 20px;
  }
}

.header-nav {
  display: flex;
  gap: var(--spacing-lg);

  @media (max-width: 768px) {
    display: none;
  }
}

.nav-link {
  position: relative;
  padding: var(--spacing-sm) 0;
  color: var(--color-text-primary);
  font-weight: 500;
  transition: color var(--transition-fast);

  &:hover,
  &.is-active {
    color: var(--color-primary);
  }

  &.is-active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--color-primary);
    border-radius: 1px;
  }
}

.header-user {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);

  @media (max-width: 768px) {
    display: none;
  }
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
}

.user-name {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  transition: all var(--transition-fast);

  &.btn-primary {
    background: var(--color-primary);
    color: white;

    &:hover {
      background: var(--color-primary-dark);
    }
  }

  &.btn-text {
    color: var(--color-text-primary);

    &:hover {
      color: var(--color-primary);
    }
  }
}

.mobile-menu-btn {
  display: none;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    position: relative;
    width: 24px;
    height: 2px;
    background: var(--color-text-primary);
    transition: all var(--transition-fast);

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      width: 24px;
      height: 2px;
      background: var(--color-text-primary);
      transition: all var(--transition-fast);
    }

    &::before {
      top: -8px;
    }

    &::after {
      top: 8px;
    }

    &.is-open {
      background: transparent;

      &::before {
        top: 0;
        transform: rotate(45deg);
      }

      &::after {
        top: 0;
        transform: rotate(-45deg);
      }
    }
  }
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md);
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
}

.mobile-nav-link {
  padding: var(--spacing-md);
  color: var(--color-text-primary);
  font-size: var(--font-size-md);
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  border-radius: var(--radius-md);

  &:hover {
    background: var(--color-bg-hover);
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all var(--transition-normal);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
