<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/modules/auth'
import { ElMessage } from 'element-plus'

const router = useRouter()

const formRef = ref(null)
const loading = ref(false)

const formData = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  email: ''
})

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== formData.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度为 3-20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度为 6-20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
}

async function handleSubmit() {
  try {
    await formRef.value.validate()
    loading.value = true

    await register({
      username: formData.username,
      password: formData.password,
      email: formData.email
    })

    ElMessage.success('注册成功，请登录')
    router.push('/login')
  } catch (error) {
    console.error('注册失败:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <router-link to="/" class="logo">
            <span class="logo-icon">D</span>
            <span class="logo-text">Hub</span>
          </router-link>
          <h1>创建账号</h1>
          <p>加入 DHub 漫展社区</p>
        </div>

        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          class="auth-form"
          @submit.prevent="handleSubmit"
        >
          <el-form-item prop="username">
            <el-input
              v-model="formData.username"
              placeholder="用户名"
              size="large"
              :prefix-icon="User"
            />
          </el-form-item>

          <el-form-item prop="email">
            <el-input
              v-model="formData.email"
              placeholder="邮箱"
              size="large"
              :prefix-icon="Message"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="formData.password"
              type="password"
              placeholder="密码"
              size="large"
              :prefix-icon="Lock"
              show-password
            />
          </el-form-item>

          <el-form-item prop="confirmPassword">
            <el-input
              v-model="formData.confirmPassword"
              type="password"
              placeholder="确认密码"
              size="large"
              :prefix-icon="Lock"
              show-password
            />
          </el-form-item>

          <el-button
            type="primary"
            size="large"
            :loading="loading"
            class="submit-btn"
            @click="handleSubmit"
          >
            注册
          </el-button>
        </el-form>

        <div class="auth-footer">
          <span>已有账号？</span>
          <router-link to="/login">立即登录</router-link>
        </div>
      </div>

      <div class="auth-decoration">
        <div class="decoration-content">
          <h2>加入 DHub 社区</h2>
          <p>发现漫展服务、结识同好、开启你的 COS 之旅</p>
          <div class="feature-list">
            <div class="feature-item">
              <el-icon><Service /></el-icon>
              <span>专业预约服务</span>
            </div>
            <div class="feature-item">
              <el-icon><UserFilled /></el-icon>
              <span>便捷组队功能</span>
            </div>
            <div class="feature-item">
              <el-icon><ChatDotRound /></el-icon>
              <span>活跃社区交流</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: var(--spacing-lg);
}

.auth-container {
  display: flex;
  width: 100%;
  max-width: 1000px;
  background: var(--color-bg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 400px;
  }
}

.auth-card {
  flex: 1;
  padding: var(--spacing-2xl);

  @media (max-width: 768px) {
    padding: var(--spacing-lg);
  }
}

.auth-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);

  .logo {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 28px;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: var(--spacing-lg);

    .logo-icon {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-primary);
      color: white;
      border-radius: var(--radius-md);
      font-size: 22px;
    }
  }

  h1 {
    font-size: var(--font-size-2xl);
    font-weight: 600;
    margin-bottom: var(--spacing-sm);
  }

  p {
    color: var(--color-text-secondary);
  }
}

.auth-form {
  :deep(.el-form-item) {
    margin-bottom: var(--spacing-lg);
  }

  :deep(.el-input__wrapper) {
    padding: var(--spacing-sm) var(--spacing-md);
  }
}

.submit-btn {
  width: 100%;
  height: 48px;
  font-size: var(--font-size-md);
}

.auth-footer {
  text-align: center;
  margin-top: var(--spacing-xl);
  color: var(--color-text-secondary);

  a {
    color: var(--color-primary);
    font-weight: 500;
    margin-left: var(--spacing-xs);
  }
}

.auth-decoration {
  flex: 1;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  padding: var(--spacing-2xl);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
}

.decoration-content {
  color: white;
  text-align: center;

  h2 {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    margin-bottom: var(--spacing-md);
  }

  p {
    font-size: var(--font-size-md);
    opacity: 0.9;
    margin-bottom: var(--spacing-xl);
  }
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);

  .el-icon {
    font-size: 24px;
  }
}
</style>
