<script setup>
import { computed } from 'vue'

const props = defineProps({
  team: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['click'])

const memberCount = computed(() => {
  const current = props.team.currentMembers || 0
  const max = props.team.maxMembers || 0
  return `${current}/${max}`
})

const statusClass = computed(() => {
  const status = props.team.status || 'open'
  return `status-${status}`
})

function handleClick() {
  emit('click', props.team)
}
</script>

<template>
  <div class="team-card card" @click="handleClick">
    <div class="card-header">
      <h3 class="card-title">{{ team.title || '组队标题' }}</h3>
      <span class="status-badge" :class="statusClass">
        {{ team.status === 'open' ? '招募中' : '已截止' }}
      </span>
    </div>

    <div class="card-body">
      <div class="info-item">
        <el-icon><Location /></el-icon>
        <span>{{ team.eventName || '漫展名称' }}</span>
      </div>
      <div class="info-item">
        <el-icon><Calendar /></el-icon>
        <span>{{ team.eventDate || '活动日期' }}</span>
      </div>
      <div class="info-item">
        <el-icon><User /></el-icon>
        <span>{{ team.location || '活动地点' }}</span>
      </div>
    </div>

    <div class="card-footer">
      <div class="creator">
        <el-avatar :size="24" :src="team.creator?.avatar">
          {{ team.creator?.nickname?.[0] || 'U' }}
        </el-avatar>
        <span>{{ team.creator?.nickname || '发起人' }}</span>
      </div>
      <div class="member-count">
        <el-icon><UserFilled /></el-icon>
        <span>{{ memberCount }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.team-card {
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-md);
}

.card-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  flex: 1;
  margin-right: var(--spacing-md);
}

.status-badge {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-xs);
  border-radius: var(--radius-sm);

  &.status-open {
    background: var(--color-success);
    color: white;
  }

  &.status-closed {
    background: var(--color-text-placeholder);
    color: white;
  }
}

.card-body {
  margin-bottom: var(--spacing-md);
}

.info-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);

  .el-icon {
    color: var(--color-primary);
  }
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border);
}

.creator {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.member-count {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);

  .el-icon {
    color: var(--color-primary);
  }
}
</style>
