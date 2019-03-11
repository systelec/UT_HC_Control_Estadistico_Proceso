<template>
  <v-layout row justify-center>
    <v-dialog v-model="modalAgregarLimite" width="600" persistent>
      <v-card class="modal elevation-0">
        <v-card-title class="elevation-0 py-0 px-2">
          <v-icon medium>timeline</v-icon>
          <v-spacer></v-spacer>
          <span class="title blue-grey--text">NUEVO LIMITE</span>
          <v-spacer></v-spacer>
          <v-btn icon flat color="grey" @click="SET_MODAL_AGREGAR_LIMITE(false)">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <v-layout row wrap>
              <v-flex xs3 pt-4>
                <span>1 Sigma</span>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  ref="+ 1σ"
                  v-model="limiteAgregar.lh_1sigma"
                  :rules="rules.lh_1sigma"
                  label="+ 1σ"
                  placeholder="60"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  ref="- 1σ"
                  v-model="limiteAgregar.ll_1sigma"
                  :rules="rules.lh_1sigma"
                  label="- 1σ"
                  placeholder="40"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs3 pt-4>
                <span>2 Sigma</span>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  ref="+ 2σ"
                  v-model="limiteAgregar.lh_2sigma"
                  :rules="rules.lh_2sigma"
                  label="+ 2σ"
                  placeholder="70"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  ref="- 2σ"
                  v-model="limiteAgregar.ll_2sigma"
                  :rules="rules.lh_2sigma"
                  label="- 2σ"
                  placeholder="30"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs3 pt-4>
                <span>3 Sigma</span>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  ref="+ 3σ"
                  v-model="limiteAgregar.lh_3sigma"
                  :rules="rules.lh_3sigma"
                  label="+ 3σ"
                  placeholder="80"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  ref="- 3σ"
                  v-model="limiteAgregar.ll_3sigma"
                  :rules="rules.lh_3sigma"
                  label="- 3σ"
                  placeholder="20"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs3 pt-4>
                <span>USL - LSL</span>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  ref="usl"
                  v-model="limiteAgregar.usl"
                  :rules="rules.usl"
                  label="usl"
                  placeholder="90"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  ref="lsl"
                  v-model="limiteAgregar.lsl"
                  :rules="rules.lsl"
                  label="lsl"
                  placeholder="10"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs3 pt-4>
                <span>USL - LSL (rango)</span>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  ref="usl"
                  v-model="limiteAgregar.usl_rango"
                  :rules="rules.usl_rango"
                  label="usl"
                  placeholder="2"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  ref="lsl"
                  v-model="limiteAgregar.lsl_rango"
                  :rules="rules.lsl_rango"
                  label="lsl"
                  placeholder="1"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs3 pt-4>
                <span>Media</span>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  ref="Historica"
                  v-model="limiteAgregar.media_historica"
                  :rules="rules.media_historica"
                  label="Historica"
                  placeholder="51.2"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  ref="Rango"
                  v-model="limiteAgregar.media_rango_historica"
                  :rules="rules.media_rango_historica"
                  label="Rango"
                  placeholder="1.6"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs3 pt-4>
                <span>Codigo producto</span>
              </v-flex>
              <v-flex xs8>
                <v-text-field
                  ref="Codigo producto"
                  v-model="limiteAgregar.codigo_producto"
                  label="Codigo producto"
                  placeholder="67123495"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn block dark flat color="green" @click="agregarLimite()">Guardar</v-btn>
          <v-btn block dark flat color="blue" @click="SET_MODAL_AGREGAR_LIMITE(false)">cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<style scoped>
.modal {
  border-radius: 6px;
}
</style>


<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import notify from '@/mixins/notify'
export default {
  data() {
    return {
      valid: false,
      limiteAgregar: {
        lh_1sigma: null,
        ll_1sigma: null,
        lh_2sigma: null,
        ll_2sigma: null,
        lh_3sigma: null,
        ll_3sigma: null,
        usl: null,
        lsl: null,
        usl_rango: null,
        lsl_rango: null,
        media_historica: null,
        media_rango_historica: null,
        codigo_producto: null
      },
      rules: {
        lh_1sigma: [v => !!v || 'El campo es requerido'],
        ll_1sigma: [v => !!v || 'El campo es requerido'],
        lh_2sigma: [v => !!v || 'El campo es requerido'],
        ll_2sigma: [v => !!v || 'El campo es requerido'],
        lh_3sigma: [v => !!v || 'El campo es requerido'],
        ll_3sigma: [v => !!v || 'El campo es requerido'],
        usl: [v => !!v || 'El campo es requerido'],
        lsl: [v => !!v || 'El campo es requerido'],
        usl_rango: [v => !!v || 'El campo es requerido'],
        lsl_rango: [v => !!v || 'El campo es requerido'],
        media_historica: [v => !!v || 'El campo es requerido'],
        media_rango_historica: [v => !!v || 'El campo es requerido']
      },
      width: 0
    }
  },

  mixins: [notify],

  computed: {
    ...mapGetters(['tendencia', 'limite', 'modalAgregarLimite'])
  },

  methods: {
    ...mapMutations(['SET_MODAL_AGREGAR_LIMITE', 'SET_ACTUALIZAR_LIMITES']),
    ...mapActions(['createLimite']),
    agregarLimite() {
      if (this.valid) {
        this.limiteAgregar.tendencia_id = this.tendencia.id
        this.createLimite(this.limiteAgregar)
          .then(response => {
            this.alertSuccess()
            this.limiteAgregar = {
              lh_1sigma: null,
              ll_1sigma: null,
              lh_2sigma: null,
              ll_2sigma: null,
              lh_3sigma: null,
              ll_3sigma: null,
              usl: null,
              lsl: null,
              usl_rango: null,
              lsl_rango: null,
              media_historica: null,
              media_rango_historica: null,
              codigo_producto: null
            }
            this.SET_MODAL_AGREGAR_LIMITE(false)
          })
          .catch(error => {
            this.alertError(error.response.data[0].message)
          })
      }
    }
  }
}
</script>
