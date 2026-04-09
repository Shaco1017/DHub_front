import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(null)
  const loading = ref(false)

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)
  const nickname = computed(() => userInfo.value?.nickname || userInfo.value?.username || '')
  const avatar = computed(() => userInfo.value?.avatar || '/default-avatar.png')

  // Actions
  function setToken(newToken) {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  function setUserInfo(info) {
    userInfo.value = info
  }

  function setLoading(value) {
    loading.value = value
  }

  async function login(credentials) {
    const { login } = await import('@/api/modules/auth')
    loading.value = true
    try {
      const res = await login(credentials)
      setToken(res.data.token)
      setUserInfo(res.data.user)
      return res
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    const { logout } = await import('@/api/modules/auth')
    try {
      await logout()
    } finally {
      setToken('')
      setUserInfo(null)
    }
  }

  async function fetchUserInfo() {
    const { getUserInfo } = await import('@/api/modules/auth')
    try {
      const res = await getUserInfo()
      setUserInfo(res.data)
      return res.data
    } catch (error) {
      setToken('')
      throw error
    }
  }

  return {
    token,
    userInfo,
    loading,
    isLoggedIn,
    nickname,
    avatar,
    setToken,
    setUserInfo,
    setLoading,
    login,
    logout,
    fetchUserInfo
  }
})
