<template>
  <v-app>
    <tool-bar/>
    <v-content class="grey lighten-2">
      <v-container fluid grid-list-md text-xs-center>
        <nuxt/>
      </v-container>
    </v-content>
    <vue-snotify/>
    <cnn-socket/>
  </v-app>
</template>

<script>
import ToolBar from '@/components/layouts/ToolBar'
import CnnSocket from '@/components/common/CnnSocket'
export default {
  components: {
    ToolBar,
    CnnSocket
  },
  data() {
    return {}
  }
}
</script>
