<template></template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },

  mounted() {
    this.DATOS_SOCKET(this.$ws)
  },

  methods: {
    ...mapMutations(['DATOS_SOCKET'])
  }
}
</script>