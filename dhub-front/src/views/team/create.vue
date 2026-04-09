<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { createTeam } from '@/api/modules/team'
import { ElMessage } from 'element-plus'

const router = useRouter()

const formRef = ref(null)
const loading = ref(false)

const formData = reactive({
  title: '',
  description: '',
  eventName: '',
  eventDate: '',
  location: '',
  maxMembers: 4
})

const rules = {
  title: [
    { required: true, message: '请输入组队标题', trigger: 'blur' }
  ],
  eventName: [
    { required: true, message: '请输入漫展名称', trigger: 'blur' }
  ],
  eventDate: [
    { required: true, message: '请选择活动日期', trigger: 'change' }
  ],
  location: [
    { required: true, message: '请输入活动地点', trigger: 'blur' }
  ]
}

async function handleSubmit() {
  try {
    await formRef.value.validate()
    loading.value = true

    await createTeam(formData)

    ElMessage.success('创建成功')
    router.push('/team')
  } catch (error) {
    console.error('创建组队失败:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="create-team-page">
    <div class="container">
      <div class="page-header">
        <h1>创建组队</h1>
        <p>发起一个新的漫展组队活动</p>
      </div>

      <div class="form-card">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="组队标题" prop="title">
            <el-input v-model="formData.title" placeholder="例如：上海 CP30 逛展搭子" />
          </el-form-item>

          <el-form-item label="活动描述" prop="description">
            <el-input
              v-model="formData.description"
              type="textarea"
              :rows="4"
              placeholder="描述一下你的组队计划和要求..."
            />
          </el-form-item>

          <el-form-item label="漫展名称" prop="eventName">
            <el-input v-model="formData.eventName" placeholder="例如：CP30、同人展等" />
          </el-form-item>

          <el-form-item label="活动日期" prop="eventDate">
            <el-date-picker
              v-model="formData.eventDate"
              type="date"
              placeholder="选择活动日期"
              style="width: 100%"
            />
          </el-form-item>

          <el-form-item label="活动地点" prop="location">
            <el-input v-model="formData.location" placeholder="例如：上海新国际博览中心" />
          </el-form-item>

          <el-form-item label="人数上限" prop="maxMembers">
            <el-input-number v-model="formData.maxMembers" :min="2" :max="20" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" :loading="loading" @click="handleSubmit">
              创建组队
            </el-button>
            <el-button @click="router.back()">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.create-team-page {
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

.form-card {
  max-width: 600px;
  padding: var(--spacing-xl);
  background: var(--color-bg);
  border-radius: var(--radius-lg);
}
</style>
