<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12></v-flex>
      <v-flex xs6 d-flex>
        <v-card class="chart-tv grey lighten-2">
          <grafico-tv-1/>
        </v-card>
      </v-flex>
      <v-flex xs6 d-flex>
        <v-card class="chart-tv grey lighten-2">
          <grafico-tv-2/>
        </v-card>
      </v-flex>
      <v-flex xs6 d-flex>
        <v-card class="chart-tv grey lighten-2">
          <grafico-tv-3/>
        </v-card>
      </v-flex>
      <v-flex xs6 d-flex>
        <v-card class="chart-tv grey lighten-2">
          <grafico-tv-4/>
        </v-card>
      </v-flex>
      <v-flex xs6 d-flex>
        <v-card class="chart-tv grey lighten-2">
          <grafico-tv-5/>
        </v-card>
      </v-flex>
      <v-flex xs6 d-flex>
        <v-card class="chart-tv grey lighten-2">
          <grafico-tv-6/>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<style scoped>
img {
  opacity: 0.5;
}
.chart-tv {
  height: 27vh;
  width: 100%;
}
</style>

<script>
import GraficoTv1 from '@/components/public/tv/GraficoTv1'
import GraficoTv2 from '@/components/public/tv/GraficoTv2'
import GraficoTv3 from '@/components/public/tv/GraficoTv3'
import GraficoTv4 from '@/components/public/tv/GraficoTv4'
import GraficoTv5 from '@/components/public/tv/GraficoTv5'
import GraficoTv6 from '@/components/public/tv/GraficoTv6'
import axios from '@/plugins/axios'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  layout: 'default',
  components: {
    GraficoTv1,
    GraficoTv2,
    GraficoTv3,
    GraficoTv4,
    GraficoTv5,
    GraficoTv6
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'variablesTv1TiempoReal',
      'variablesTv1Historicas',
      'actualizarTv1Grafico'
    ])
  }
}
</script>
