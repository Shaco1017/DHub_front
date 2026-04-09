<script setup>
import { computed } from 'vue'

const props = defineProps({
  order: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['click'])

const statusMap = {
  pending: { label: '待确认', class: 'status-pending' },
  confirmed: { label: '已确认', class: 'status-confirmed' },
  completed: { label: '已完成', class: 'status-completed' },
  cancelled: { label: '已取消', class: 'status-cancelled' }
}

const orderStatus = computed(() => statusMap[props.order.status] || statusMap.pending)

const serviceTypeMap = {
  wigs: '假发预约',
  cosplay: '服装预约',
  makeup: '妆面预约'
}

const serviceType = computed(() => serviceTypeMap[props.order.serviceType] || '服务')

function handleClick() {
  emit('click', props.order)
}
</script>

<template>
  <div class="order-card card" @click="handleClick">
    <div class="card-header">
      <div class="service-info">
        <span class="type-tag">{{ serviceType }}</span>
        <span class="order-no">订单号: {{ order.orderNo || order.id }}</span>
      </div>
      <span class="status-tag" :class="orderStatus.class">
        {{ orderStatus.label }}
      </span>
    </div>

    <div class="card-body">
      <div class="service-title">{{ order.serviceTitle || order.service?.title || '服务名称' }}</div>
      <div class="service-detail">
        <span class="date">
          <el-icon><Calendar /></el-icon>
          {{ order.appointmentTime || order.appointment_date || '预约时间' }}
        </span>
      </div>
    </div>

    <div class="card-footer">
      <div class="price">
        <span class="currency">¥</span>
        <span class="amount">{{ order.totalPrice || order.total_price || 0 }}</span>
      </div>
      <span class="create-time">{{ order.createdAt || order.created_at || '' }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-card {
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--color-primary);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-md);
}

.service-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.type-tag {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-primary-bg);
  color: var(--color-primary);
  font-size: var(--font-size-xs);
  border-radius: var(--radius-sm);
}

.order-no {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.status-tag {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-xs);
  border-radius: var(--radius-sm);

  &.status-pending {
    background: var(--color-warning);
    color: white;
  }

  &.status-confirmed {
    background: var(--color-info);
    color: white;
  }

  &.status-completed {
    background: var(--color-success);
    color: white;
  }

  &.status-cancelled {
    background: var(--color-text-placeholder);
    color: white;
  }
}

.card-body {
  margin-bottom: var(--spacing-md);
}

.service-title {
  font-size: var(--font-size-md);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

.service-detail {
  display: flex;
  gap: var(--spacing-lg);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.date {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border);
}

.price {
  color: var(--color-danger);

  .currency {
    font-size: var(--font-size-sm);
  }

  .amount {
    font-size: var(--font-size-lg);
    font-weight: 700;
  }
}

.create-time {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
</style>
