<template>
  <v-layout row justify-center>
    <v-dialog v-model="modalAgregarMixer" width="400" persistent>
      <v-card class="modal elevation-0">
        <v-card-title class="elevation-0 py-0 px-2">
          <v-icon medium>playlist_add</v-icon>
          <v-spacer></v-spacer>
          <span class="title blue-grey--text">NUEVA MIXER</span>
          <v-spacer></v-spacer>
          <v-btn icon flat color="grey" @click="SET_MODAL_AGREGAR_MIXER(false)">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <v-layout justify-center>
              <v-flex xs12>
                <v-text-field
                  ref="Nombre"
                  v-model="mixerAgregar.nombre"
                  :rules="rules.nombre"
                  label="Nombre"
                  placeholder="Mixer 1"
                  prepend-icon="airplay"
                  required
                ></v-text-field>
                <v-textarea
                  ref="Descripcion"
                  v-model="mixerAgregar.descripcion"
                  label="Descripcion"
                  placeholder="Mixer para preparacion de ...."
                  prepend-icon="subject"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn block dark flat color="green" @click="agregarMixer()">Guardar</v-btn>
          <v-btn block dark flat color="blue" @click="SET_MODAL_AGREGAR_MIXER(false)">cancelar</v-btn>
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
      mixerAgregar: {
        nombre: null,
        descripcion: null
      },
      rules: {
        nombre: [v => !!v || 'El campo nombre es requerido']
      },
      width: 0
    }
  },

  mixins: [notify],

  computed: {
    ...mapGetters(['mixer', 'modalAgregarMixer'])
  },

  methods: {
    ...mapMutations(['SET_MODAL_AGREGAR_MIXER', 'SET_ACTUALIZAR_MIXERS']),
    ...mapActions(['createMixer']),
    agregarMixer() {
      if (this.valid) {
        this.createMixer(this.mixerAgregar)
          .then(response => {
            this.alertSuccess()
            this.mixerAgregar = {
              nombre: null,
              descripcion: null
            }
            this.SET_MODAL_AGREGAR_MIXER(false)
          })
          .catch(error => {
            this.alertError(
              error.response.data.message || error.response.data.length > 0
                ? error.response.data[0].message
                : ''
            )
          })
      }
    }
  }
}
</script>
