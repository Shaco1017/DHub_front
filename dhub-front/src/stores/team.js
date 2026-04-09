import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTeamStore = defineStore('team', () => {
  const teams = ref([])
  const currentTeam = ref(null)
  const loading = ref(false)

  function setTeams(list) {
    teams.value = list
  }

  function setCurrentTeam(team) {
    currentTeam.value = team
  }

  function setLoading(value) {
    loading.value = value
  }

  function addTeam(team) {
    teams.value.unshift(team)
  }

  function updateTeam(team) {
    const index = teams.value.findIndex(t => t.id === team.id)
    if (index !== -1) {
      teams.value[index] = team
    }
  }

  function removeTeam(id) {
    teams.value = teams.value.filter(t => t.id !== id)
  }

  return {
    teams,
    currentTeam,
    loading,
    setTeams,
    setCurrentTeam,
    setLoading,
    addTeam,
    updateTeam,
    removeTeam
  }
})
