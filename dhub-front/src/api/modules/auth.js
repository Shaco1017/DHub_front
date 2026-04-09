import service from '@/api'

// 用户注册
export function register(data) {
  return service.post('/auth/register', data)
}

// 用户登录
export function login(data) {
  return service.post('/auth/login', data)
}

// 退出登录
export function logout() {
  return service.post('/auth/logout')
}

// 获取当前用户信息
export function getUserInfo() {
  return service.get('/auth/userinfo')
}

// 更新用户资料
export function updateProfile(data) {
  return service.put('/users/profile', data)
}

// 上传头像
export function uploadAvatar(file) {
  const formData = new FormData()
  formData.append('avatar', file)
  return service.post('/users/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
