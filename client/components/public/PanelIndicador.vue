<template>
  <v-card dark class="blue-grey elevation-3">
    <v-layout row wrap>
      <v-flex xs1>
        <filtro-tendencia/>
      </v-flex>
      <v-flex xs11>
        <v-layout row wrap px-2>
          <v-flex xs1>
            <v-chip class="chip" light label outline color="blue-grey lighten-5">
              <strong>Media:</strong>
              <span class="indicador">{{ media }}</span>
            </v-chip>
          </v-flex>
          <v-flex xs1>
            <v-chip class="chip" light label outline color="blue-grey lighten-5">
              <strong>USL:</strong>
              <span class="indicador">{{ limite.usl }}</span>
            </v-chip>
          </v-flex>
          <v-flex xs1>
            <v-chip class="chip" light label outline color="blue-grey lighten-5">
              <strong>LSL:</strong>
              <span class="indicador">{{ limite.lsl }}</span>
            </v-chip>
          </v-flex>
          <v-flex xs1>
            <v-chip class="chip" light label outline color="blue-grey lighten-5">
              <strong>UCLR:</strong>
              <span class="indicador">{{ limite.uclr }}</span>
            </v-chip>
          </v-flex>
          <v-flex xs1>
            <v-chip class="chip" light label outline color="blue-grey lighten-5">
              <strong>LCLR:</strong>
              <span class="indicador">{{ limite.lclr }}</span>
            </v-chip>
          </v-flex>
          <v-flex xs1>
            <v-chip class="chip" light label outline color="blue-grey lighten-5">
              <strong>USL:</strong>
              <span class="indicador">{{ limite.usl }}</span>
            </v-chip>
          </v-flex>
          <v-flex xs1>
            <v-chip class="chip" light label outline color="blue-grey lighten-5">
              <strong>Media R:</strong>
              <span class="indicador">{{ limite.mediar }}</span>
            </v-chip>
          </v-flex>
          <v-flex xs1>
            <v-chip class="chip" light label outline color="blue-grey lighten-5">
              <strong>CP:</strong>
              <span class="indicador">{{ cp }}</span>
            </v-chip>
          </v-flex>
          <v-flex xs1>
            <v-chip class="chip" light label outline color="blue-grey lighten-5">
              <strong>CPU:</strong>
              <span class="indicador">{{ cpu }}</span>
            </v-chip>
          </v-flex>
          <v-flex xs1>
            <v-chip class="chip" light label outline color="blue-grey lighten-5">
              <strong>CPL:</strong>
              <span class="indicador">{{ cpl }}</span>
            </v-chip>
          </v-flex>
          <v-flex xs1>
            <v-chip class="chip" light label outline color="blue-grey lighten-5">
              <strong>CPK:</strong>
              <span class="indicador">{{ cpk }}</span>
            </v-chip>
          </v-flex>
          <v-flex xs1>
            <v-chip class="chip" light label outline color="blue-grey lighten-5">
              <strong>STD:</strong>
              <span class="indicador">{{ std }}</span>
            </v-chip>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<style scoped>
.chip {
  width: 100%;
}
.indicador {
  margin-left: 5%;
}
</style>


<script>
import FiltroTendencia from '@/components/public/FiltroTendencia'
import { mapGetters } from 'vuex'
import mathjs from 'mathjs'

export default {
  components: {
    FiltroTendencia
  },
  data() {
    return {
      std: 0,
      media: 0,
      cp: 0,
      cp: 0,
      cpu: 0,
      cpu: 0,
      cpl: 0,
      cpl: 0,
      cpk: 0,
      limite: {
        lh_1sigma: 0,
        ll_1sigma: 0,
        lh_2sigma: 0,
        ll_2sigma: 0,
        lh_3sigma: 0,
        ll_3sigma: 0,
        usl: 0,
        lsl: 0,
        usl_rango: 0,
        lsl_rango: 0,
        media_historica: 0,
        media_rango_historica: 0,
        codigo_producto: null
      }
    }
  },

  computed: {
    ...mapGetters([
      'historicosFiltradosPorProducto',
      'limiteFiltradoPorProducto'
    ])
  },

  watch: {
    historicosFiltradosPorProducto() {
      this.completarPanel()
    }
  },

  methods: {
    completarPanel() {
      const limite = this.limiteFiltradoPorProducto

      this.limite.media_historica = mathjs.round(limite.media_historica, 2)
      this.limite.media_rango_historica = mathjs.round(
        limite.media_rango_historica,
        2
      )
      this.limite.lsl = mathjs.round(limite.lsl | 0, 2)
      this.limite.usl = mathjs.round(limite.usl | 0, 2)
      this.limite.lsl_r = mathjs.round(limite.lsl_rango | 0, 2)
      this.limite.usl_l = mathjs.round(limite.usl_rango | 0, 2)
      this.limite.lh_1sigma = mathjs.round(limite.lh_1sigma | 0, 2)
      this.limite.ll_1sigma = mathjs.round(limite.ll_1sigma | 0, 2)
      this.limite.lh_2sigma = mathjs.round(limite.lh_2sigma | 0, 2)
      this.limite.ll_2sigma = mathjs.round(limite.ll_2sigma | 0, 2)
      this.limite.lh_3sigma = mathjs.round(limite.lh_3sigma | 0, 2)
      this.limite.ll_3sigma = mathjs.round(limite.ll_3sigma | 0, 2)
      let historicos = this.historicosFiltradosPorProducto

      if (historicos.length > 3) {
        let pv = historicos.map(item => {
          return item.pv
        })
        let std = mathjs.std(pv)
        this.std = mathjs.round(std, 2)
        let mediacalc = mathjs.mean(pv)
        this.media = mathjs.round(mediacalc, 2)
        this.cp = mathjs.round(
          (this.limite.usl - this.limite.lsl) / (6 * this.std),
          2
        )
        this.cp = mathjs.round(this.cp, 2)
        this.cpu = mathjs.round(
          (this.limite.usl - mediacalc) / (3 * this.std),
          2
        )
        this.cpu = mathjs.round(this.cpu, 2)
        this.cpl = mathjs.round(
          (mediacalc - this.limite.lsl) / (3 * this.std),
          2
        )
        this.cpl = mathjs.round(this.cpl, 2)
        this.cpk = mathjs.round(Math.min(this.cpu, this.cpl), 2)
      }
    }
  }
}
</script>
