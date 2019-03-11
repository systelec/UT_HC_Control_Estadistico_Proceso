<template>
  <v-card class="elevation-2"></v-card>
</template>

<script>
import axios from '@/plugins/axios'
export default {
  props: {
    tendencia: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  created() {
    // this.verificarExisteLimite()
  },
  methods: {
    verificarExisteLimite() {
      if (this.tendencia.limites.length > 0) {
        let limite = this.tendencia.limites[0]
        this.limite.LH_1Sigma = limite.LH_1Sigma
        this.limite.LL_1Sigma = limite.LL_1Sigma
        this.limite.LH_2Sigma = limite.LH_2Sigma
        this.limite.LL_2Sigma = limite.LL_2Sigma
        this.limite.LH_3Sigma = limite.LH_3Sigma
        this.limite.LL_3Sigma = limite.LL_3Sigma
        this.limite.USL = limite.USL
        this.limite.LSL = limite.LSL
        this.limite.MediaHistorica = limite.MediaHistorica
        this.limite.MediaRangoHistorica = limite.MediaRangoHistorica
        this.limite.VARINT1 = limite.VARINT1
        this.limite.VARINT1_ENUM = limite.VARINT1_ENUM
        this.limite.CodigoProducto = limite.CodigoProducto
      }
    },
    crearLimite() {
      this.limite.Fecha_Ini = new Date()
      axios.post(`tendencias/${this.tendencia.Bloque_ID}/limites`, this.limite)
    }
  }
}
</script>