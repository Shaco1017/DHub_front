<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getOrderList } from '@/api/modules/order'
import OrderCard from '@/components/business/OrderCard.vue'

const router = useRouter()

const loading = ref(false)
const orders = ref([])
const activeTab = ref('all')

const statusOptions = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待确认' },
  { key: 'confirmed', label: '已确认' },
  { key: 'completed', label: '已完成' },
  { key: 'cancelled', label: '已取消' }
]

async function fetchOrders() {
  loading.value = true
  try {
    const params = activeTab.value === 'all' ? {} : { status: activeTab.value }
    const res = await getOrderList(params)
    orders.value = res.data?.list || []
  } catch (error) {
    console.error('获取订单列表失败:', error)
  } finally {
    loading.value = false
  }
}

function handleTabChange(tab) {
  activeTab.value = tab
  fetchOrders()
}

function goToDetail(id) {
  router.push(`/order/${id}`)
}

onMounted(() => {
  fetchOrders()
})
</script>

<template>
  <div class="order-page">
    <div class="container">
      <div class="page-header">
        <h1>我的预约</h1>
        <p>查看和管理您的预约订单</p>
      </div>

      <div class="status-tabs">
        <button
          v-for="opt in statusOptions"
          :key="opt.key"
          class="tab-btn"
          :class="{ 'is-active': activeTab === opt.key }"
          @click="handleTabChange(opt.key)"
        >
          {{ opt.label }}
        </button>
      </div>

      <div class="order-list">
        <div v-if="loading" class="loading-container">
          <el-icon class="is-loading" :size="32"><Loading /></el-icon>
        </div>
        <template v-else>
          <OrderCard
            v-for="order in orders"
            :key="order.id"
            :order="order"
            @click="goToDetail(order.id)"
          />
          <div v-if="orders.length === 0" class="empty-state">
            <el-icon :size="48"><Document /></el-icon>
            <p>暂无预约记录</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-page {
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

.status-tabs {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  overflow-x: auto;
}

.tab-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  background: none;
  border: none;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--transition-fast);

  &:hover {
    color: var(--color-primary);
  }

  &.is-active {
    color: var(--color-primary);
    font-weight: 600;
    border-bottom: 2px solid var(--color-primary);
  }
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}
</style>
