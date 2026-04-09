import service from '@/api'

// 获取预约列表
export function getOrderList(params) {
  return service.get('/orders', { params })
}

// 获取预约详情
export function getOrderDetail(id) {
  return service.get(`/orders/${id}`)
}

// 创建预约
export function createOrder(data) {
  return service.post('/orders', data)
}

// 更新预约状态
export function updateOrder(id, data) {
  return service.put(`/orders/${id}`, data)
}

// 取消预约
export function cancelOrder(id) {
  return service.delete(`/orders/${id}`)
}

// 评价预约
export function evaluateOrder(id, data) {
  return service.post(`/orders/${id}/evaluate`, data)
}
