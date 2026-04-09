import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderStore = defineStore('order', () => {
  const orders = ref([])
  const currentOrder = ref(null)
  const loading = ref(false)

  function setOrders(list) {
    orders.value = list
  }

  function setCurrentOrder(order) {
    currentOrder.value = order
  }

  function setLoading(value) {
    loading.value = value
  }

  function addOrder(order) {
    orders.value.unshift(order)
  }

  function updateOrder(order) {
    const index = orders.value.findIndex(o => o.id === order.id)
    if (index !== -1) {
      orders.value[index] = order
    }
  }

  function removeOrder(id) {
    orders.value = orders.value.filter(o => o.id !== id)
  }

  return {
    orders,
    currentOrder,
    loading,
    setOrders,
    setCurrentOrder,
    setLoading,
    addOrder,
    updateOrder,
    removeOrder
  }
})
