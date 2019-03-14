<template>
  <div>
    <v-toolbar fixed app dark dense color="blue">
      <v-toolbar-title>
        <img src="../../static/logo_white.png" alt="Unilever" width="26">
      </v-toolbar-title>
      <v-toolbar-items style="margin-left: 1%;">
        <template v-for="(item, i) in items">
          <v-btn :key="i" flat small :to="item.to">
            <v-icon>{{ item.icon }}</v-icon>
            <span style="margin-left: 5%">{{ item.title }}</span>
          </v-btn>
        </template>
      </v-toolbar-items>
      <v-spacer/>
      <v-btn icon small @click="handleFullScreen()">
        <v-icon>settings_overscan</v-icon>
      </v-btn>
      <v-btn icon small to="/tv">
        <v-icon>tv</v-icon>
      </v-btn>
      <v-badge v-model="notificacionAlarmas" overlap color="red">
        <span slot="badge" style="font-size: 10px;">{{ alarmasSinReconocerSocket }}</span>
        <v-btn icon small to="/alarmas" style="margin-top: -10px; margin-bottom: -10px;">
          <v-icon>notifications_active</v-icon>
        </v-btn>
      </v-badge>
      <v-menu :nudge-bottom="10" offset-y origin="center center" transition="scale-transition">
        <v-btn slot="activator" icon small flat>
          <v-icon>settings</v-icon>
        </v-btn>
        <v-list pa-0>
          <template v-for="(item, i) in itemsSettings">
            <v-list-tile :key="i" :to="item.to">
              <v-list-tile-action>
                <v-icon color="blue-grey darken-1">{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-list-tile @click="exitToApp()">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Salir</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-chip label color="blue lighten-1" text-color="white">
        <v-icon class="mr-2">alarm</v-icon>
        <clock/>
      </v-chip>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Clock from '@/components/common/widgets/Clock'
export default {
  components: {
    Clock
  },

  data() {
    return {
      notificacionAlarmas: false,
      items: [{ title: 'Tendencias', to: '/', icon: 'timeline' }],
      itemsSettings: [
        {
          title: 'Carga y ajustes de datos',
          icon: 'settings',
          to: '/ajustes'
        },
        {
          title: 'Cambio de contraseña',
          icon: 'lock_open',
          to: '/ajustes/password'
        }
      ]
    }
  },

  watch: {
    alarmasSinReconocerSocket() {
      if (parseInt(this.alarmasSinReconocerSocket) > 0) {
        this.notificacionAlarmas = true
      } else {
        this.notificacionAlarmas = false
      }
    }
  },

  computed: {
    ...mapGetters(['alarmasSinReconocerSocket'])
  },

  methods: {
    handleFullScreen() {
      let doc = window.document
      let docEl = doc.documentElement
      let requestFullScreen =
        docEl.requestFullscreen ||
        docEl.mozRequestFullScreen ||
        docEl.webkitRequestFullScreen ||
        docEl.msRequestFullscreen
      let cancelFullScreen =
        doc.exitFullscreen ||
        doc.mozCancelFullScreen ||
        doc.webkitExitFullscreen ||
        doc.msExitFullscreen
      if (
        !doc.fullscreenElement &&
        !doc.mozFullScreenElement &&
        !doc.webkitFullscreenElement &&
        !doc.msFullscreenElement
      ) {
        requestFullScreen.call(docEl)
      } else {
        cancelFullScreen.call(doc)
      }
    },
    goPageTv() {
      this.$router.push({ path: '/tv' })
    },
    exitToApp() {
      this.logoutAccount()
    }
  }
}
</script>
