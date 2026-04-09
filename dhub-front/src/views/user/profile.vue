<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { updateProfile, uploadAvatar } from '@/api/modules/auth'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()

const formRef = ref(null)
const loading = ref(false)
const avatarLoading = ref(false)

const formData = reactive({
  nickname: userStore.userInfo?.nickname || '',
  email: userStore.userInfo?.email || '',
  phone: userStore.userInfo?.phone || '',
  bio: userStore.userInfo?.bio || ''
})

const rules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '昵称长度为 2-20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
}

async function handleAvatarChange(event) {
  const file = event.target.files?.[0]
  if (!file) return

  avatarLoading.value = true
  try {
    const res = await uploadAvatar(file)
    userStore.setUserInfo({ ...userStore.userInfo, avatar: res.data.url })
    ElMessage.success('头像上传成功')
  } catch (error) {
    console.error('上传头像失败:', error)
  } finally {
    avatarLoading.value = false
  }
}

async function handleSubmit() {
  try {
    await formRef.value.validate()
    loading.value = true

    await updateProfile(formData)
    userStore.setUserInfo({ ...userStore.userInfo, ...formData })

    ElMessage.success('资料更新成功')
  } catch (error) {
    console.error('更新资料失败:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="profile-page">
    <div class="page-header">
      <h2>编辑资料</h2>
    </div>

    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
      class="profile-form"
    >
      <!-- 头像 -->
      <el-form-item label="头像">
        <div class="avatar-upload">
          <el-avatar :size="80" :src="userStore.avatar">
            {{ userStore.nickname?.[0] || 'U' }}
          </el-avatar>
          <div class="avatar-action">
            <el-button size="small" :loading="avatarLoading" @click="$refs.avatarInput.click()">
              更换头像
            </el-button>
            <input
              ref="avatarInput"
              type="file"
              accept="image/*"
              style="display: none"
              @change="handleAvatarChange"
            />
            <p class="avatar-tip">支持 JPG、PNG 格式，文件小于 2MB</p>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="formData.nickname" placeholder="请输入昵称" />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" placeholder="请输入邮箱" />
      </el-form-item>

      <el-form-item label="手机号">
        <el-input v-model="formData.phone" placeholder="请输入手机号" />
      </el-form-item>

      <el-form-item label="个人简介">
        <el-input
          v-model="formData.bio"
          type="textarea"
          :rows="3"
          placeholder="介绍一下自己吧..."
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :loading="loading" @click="handleSubmit">
          保存修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.profile-page {
  padding: var(--spacing-xl);
}

.page-header {
  margin-bottom: var(--spacing-xl);

  h2 {
    font-size: var(--font-size-xl);
    font-weight: 600;
  }
}

.profile-form {
  max-width: 500px;
}

.avatar-upload {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.avatar-action {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.avatar-tip {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}
</style>
