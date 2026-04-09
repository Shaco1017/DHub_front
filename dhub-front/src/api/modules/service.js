import service from '@/api'

// 获取服务列表
export function getServiceList(params) {
  return service.get('/services', { params })
}

// 获取服务详情
export function getServiceDetail(id) {
  return service.get(`/services/${id}`)
}

// 获取服务分类列表
export function getServiceCategories() {
  return service.get('/services/categories')
}

// 创建服务（商家）
export function createService(data) {
  return service.post('/services', data)
}

// 更新服务
export function updateService(id, data) {
  return service.put(`/services/${id}`, data)
}

// 删除服务
export function deleteService(id) {
  return service.delete(`/services/${id}`)
}
