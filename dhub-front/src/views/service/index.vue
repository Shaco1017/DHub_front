<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getServiceList } from '@/api/modules/service'
import ServiceCard from '@/components/business/ServiceCard.vue'

const router = useRouter()

const loading = ref(false)
const serviceList = ref([])
const activeCategory = ref('all')

const categories = [
  { key: 'all', label: '全部服务' },
  { key: 'wigs', label: '假发预约' },
  { key: 'cosplay', label: '服装预约' },
  { key: 'makeup', label: '妆面预约' }
]

async function fetchServiceList() {
  loading.value = true
  try {
    const params = activeCategory.value === 'all' ? {} : { type: activeCategory.value }
    const res = await getServiceList(params)
    serviceList.value = res.data?.list || []
  } catch (error) {
    console.error('获取服务列表失败:', error)
  } finally {
    loading.value = false
  }
}

function handleCategoryChange(key) {
  activeCategory.value = key
  fetchServiceList()
}

function goToServiceDetail(id) {
  router.push(`/service/detail/${id}`)
}

function goToCategoryPage(type) {
  router.push(`/service/${type}`)
}

onMounted(() => {
  fetchServiceList()
})
</script>

<template>
  <div class="service-page">
    <div class="container">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1>服务大厅</h1>
        <p>找到专业的假发、服装、妆面服务</p>
      </div>

      <!-- 分类导航 -->
      <div class="category-nav">
        <button
          v-for="cat in categories"
          :key="cat.key"
          class="category-btn"
          :class="{ 'is-active': activeCategory === cat.key }"
          @click="handleCategoryChange(cat.key)"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- 快捷入口 -->
      <div class="quick-access">
        <div class="access-item" @click="goToCategoryPage('wigs')">
          <div class="access-icon">
            <el-icon><Scissor /></el-icon>
          </div>
          <div class="access-info">
            <h3>假发预约</h3>
            <p>专业 COS 假发定制</p>
          </div>
        </div>
        <div class="access-item" @click="goToCategoryPage('cosplay')">
          <div class="access-icon">
            <el-icon><Goods /></el-icon>
          </div>
          <div class="access-info">
            <h3>服装预约</h3>
            <p>精品 COS 服装定制</p>
          </div>
        </div>
        <div class="access-item" @click="goToCategoryPage('makeup')">
          <div class="access-icon">
            <el-icon><Brush /></el-icon>
          </div>
          <div class="access-info">
            <h3>妆面预约</h3>
            <p>专业 cos 妆面服务</p>
          </div>
        </div>
      </div>

      <!-- 服务列表 -->
      <div class="service-list">
        <div v-if="loading" class="loading-container">
          <el-icon class="is-loading" :size="32"><Loading /></el-icon>
        </div>
        <template v-else>
          <ServiceCard
            v-for="item in serviceList"
            :key="item.id"
            :service="item"
            @click="goToServiceDetail(item.id)"
          />
          <div v-if="serviceList.length === 0" class="empty-state">
            <el-icon :size="48"><FolderOpened /></el-icon>
            <p>暂无服务</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.service-page {
  padding: var(--spacing-xl) 0;
}

.page-header {
  margin-bottom: var(--spacing-xl);

  h1 {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    margin-bottom: var(--spacing-sm);
  }

  p {
    color: var(--color-text-secondary);
  }
}

.category-nav {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

.category-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  background: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  &.is-active {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: white;
  }
}

.quick-access {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.access-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-bg);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
}

.access-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-bg);
  border-radius: var(--radius-md);
  color: var(--color-primary);
  font-size: 24px;
}

.access-info {
  h3 {
    font-size: var(--font-size-md);
    font-weight: 600;
    margin-bottom: var(--spacing-xs);
  }

  p {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }
}

.service-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}
</style>
