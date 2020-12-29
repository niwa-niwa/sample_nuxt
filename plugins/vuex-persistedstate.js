import VuePersistedstate from 'vuex-persistedstate'

export default ({ store })=>{
  window.onNuxtReady(() => {
    VuePersistedstate({})(store)
  })
}