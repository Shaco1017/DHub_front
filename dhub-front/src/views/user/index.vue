<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

const menuItems = [
  { icon: 'User', title: '我的资料', path: '/user/profile' },
  { icon: 'Document', title: '我的预约', path: '/order' },
  { icon: 'UserFilled', title: '我的组队', path: '/team' },
  { icon: 'Star', title: '我的收藏', path: '/user/favorites' },
  { icon: 'Setting', title: '设置', path: '/user/settings' }
]

function goTo(path) {
  router.push(path)
}

async function handleLogout() {
  await userStore.logout()
  ElMessage.success('已退出登录')
  router.push('/')
}
</script>

<template>
  <div class="user-page">
    <div class="container">
      <div class="user-layout">
        <!-- 侧边栏 -->
        <aside class="user-sidebar">
          <div class="user-info-card">
            <el-avatar :size="80" :src="userStore.avatar">
              {{ userStore.nickname?.[0] || 'U' }}
            </el-avatar>
            <h3>{{ userStore.nickname || '用户名' }}</h3>
            <p>{{ userStore.userInfo?.email || 'user@example.com' }}</p>
          </div>

          <nav class="user-menu">
            <button
              v-for="item in menuItems"
              :key="item.path"
              class="menu-item"
              :class="{ 'is-active': $route.path === item.path }"
              @click="goTo(item.path)"
            >
              <el-icon><component :is="item.icon" /></el-icon>
              <span>{{ item.title }}</span>
            </button>
          </nav>
        </aside>

        <!-- 主内容 -->
        <main class="user-content">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-page {
  padding: var(--spacing-xl) 0;
}

.user-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--spacing-xl);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.user-sidebar {
  @media (max-width: 768px) {
    display: none;
  }
}

.user-info-card {
  text-align: center;
  padding: var(--spacing-xl);
  background: var(--color-bg);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-lg);

  h3 {
    font-size: var(--font-size-lg);
    font-weight: 600;
    margin: var(--spacing-md) 0 var(--spacing-xs);
  }

  p {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }
}

.user-menu {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  background: var(--color-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: none;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--color-bg-hover);
  }

  &.is-active {
    background: var(--color-primary-bg);
    color: var(--color-primary);
    font-weight: 500;
  }
}

.user-content {
  background: var(--color-bg);
  border-radius: var(--radius-lg);
  min-height: 400px;
}
</style>
