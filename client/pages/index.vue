<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12>
        <panel-indicador/>
      </v-flex>
      <v-flex xs12 class="mt-2">
        <v-card class="elevation-0" style="height: 100%;">
          <grafico-tendecia/>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import GraficoTendecia from '@/components/public/GraficoTendecia'
import PanelIndicador from '@/components/public/PanelIndicador'

export default {
  layout: 'default',
  components: {
    GraficoTendecia,
    PanelIndicador
  },

  data: () => ({}),

  computed: {
    ...mapGetters(['modoTiempoReal'])
  }
}
</script>
