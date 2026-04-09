<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  service: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['click'])

const typeLabels = {
  wigs: '假发',
  cosplay: '服装',
  makeup: '妆面'
}

const serviceType = computed(() => typeLabels[props.service.type] || '服务')

function handleClick() {
  emit('click', props.service)
}
</script>

<template>
  <div class="service-card card" @click="handleClick">
    <div class="card-image">
      <el-image :src="service.cover || '/default-service.png'" fit="cover">
        <template #error>
          <div class="image-placeholder">
            <el-icon><Picture /></el-icon>
          </div>
        </template>
      </el-image>
      <span class="type-badge">{{ serviceType }}</span>
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ service.title || '服务标题' }}</h3>
      <p class="card-desc">{{ service.description || '服务描述' }}</p>
      <div class="card-footer">
        <div class="price">
          <span class="currency">¥</span>
          <span class="amount">{{ service.price || 0 }}</span>
        </div>
        <div class="rating">
          <el-icon><Star /></el-icon>
          <span>{{ service.rating || 5.0 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.service-card {
  cursor: pointer;
  overflow: hidden;
  padding: 0;

  &:hover {
    .card-image img {
      transform: scale(1.05);
    }
  }
}

.card-image {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-normal);
  }
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-hover);
  color: var(--color-text-placeholder);
  font-size: 32px;
}

.type-badge {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: var(--font-size-xs);
  border-radius: var(--radius-sm);
}

.card-content {
  padding: var(--spacing-md);
}

.card-title {
  font-size: var(--font-size-md);
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
  height: 2.8em;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.rating {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--color-warning);
  font-size: var(--font-size-sm);

  .el-icon {
    font-size: 14px;
  }
}
</style>
