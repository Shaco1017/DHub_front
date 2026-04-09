<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getTeamList } from '@/api/modules/team'
import TeamCard from '@/components/business/TeamCard.vue'

const router = useRouter()

const loading = ref(false)
const teams = ref([])

async function fetchTeams() {
  loading.value = true
  try {
    const res = await getTeamList()
    teams.value = res.data?.list || []
  } catch (error) {
    console.error('获取组队列表失败:', error)
  } finally {
    loading.value = false
  }
}

function goToDetail(id) {
  router.push(`/team/detail/${id}`)
}

function goToCreate() {
  router.push('/team/create')
}

onMounted(() => {
  fetchTeams()
})
</script>

<template>
  <div class="team-page">
    <div class="container">
      <div class="page-header">
        <div>
          <h1>组队大厅</h1>
          <p>找到你的漫展搭子，一起嗨翻全场</p>
        </div>
        <el-button type="primary" @click="goToCreate">
          <el-icon><Plus /></el-icon>
          创建组队
        </el-button>
      </div>

      <div class="team-list">
        <div v-if="loading" class="loading-container">
          <el-icon class="is-loading" :size="32"><Loading /></el-icon>
        </div>
        <template v-else>
          <TeamCard
            v-for="team in teams"
            :key="team.id"
            :team="team"
            @click="goToDetail(team.id)"
          />
          <div v-if="teams.length === 0" class="empty-state">
            <el-icon :size="48"><User /></el-icon>
            <p>暂无组队，快来发起第一个吧</p>
            <el-button type="primary" @click="goToCreate">创建组队</el-button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.team-page {
  padding: var(--spacing-xl) 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.team-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
