import service from '@/api'

// 获取组队列表
export function getTeamList(params) {
  return service.get('/teams', { params })
}

// 获取组队详情
export function getTeamDetail(id) {
  return service.get(`/teams/${id}`)
}

// 创建组队
export function createTeam(data) {
  return service.post('/teams', data)
}

// 更新组队
export function updateTeam(id, data) {
  return service.put(`/teams/${id}`, data)
}

// 删除组队
export function deleteTeam(id) {
  return service.delete(`/teams/${id}`)
}

// 加入组队
export function joinTeam(id) {
  return service.post(`/teams/${id}/join`)
}

// 离开组队
export function leaveTeam(id) {
  return service.post(`/teams/${id}/leave`)
}

// 获取我的组队列表
export function getMyTeams() {
  return service.get('/teams/my')
}
