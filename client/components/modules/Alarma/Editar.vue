<template>
  <v-layout row justify-center>
    <v-dialog v-model="modalEditarAlarma" width="400" persistent>
      <v-card class="modal elevation-0">
        <v-card-title class="elevation-0 py-0 px-2">
          <v-icon medium>playlist_add</v-icon>
          <v-spacer></v-spacer>
          <span class="title blue-grey--text">NUEVA ALARMA</span>
          <v-spacer></v-spacer>
          <v-btn icon flat color="grey" @click="SET_MODAL_EDITAR_ALARMA(false)">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <v-layout justify-center>
              <v-flex xs12>
                <v-text-field
                  ref="Codigo"
                  v-model="alarmaEditar.codigo"
                  :rules="rules.codigo"
                  label="Codigo"
                  placeholder="67261247"
                  prepend-icon="airplay"
                  required
                ></v-text-field>
                <v-textarea
                  ref="Descripcion"
                  v-model="alarmaEditar.descripcion"
                  label="Descripcion"
                  placeholder="Alarma para preparacion de ...."
                  prepend-icon="subject"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn block dark flat color="green" @click="editarAlarma()">Guardar</v-btn>
          <v-btn block dark flat color="blue" @click="SET_MODAL_EDITAR_ALARMA(false)">cancelar</v-btn>
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
      alarmaEditar: {
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
    ...mapGetters(['alarma', , 'modalEditarAlarma'])
  },

  mounted() {
    this.alarmaEditar = this.alarma
  },

  methods: {
    ...mapMutations(['SET_MODAL_EDITAR_ALARMA', 'SET_ACTUALIZAR_ALARMAS']),
    ...mapActions(['updateAlarma']),
    editarAlarma() {
      if (this.valid) {
        this.updateAlarma(this.alarmaEditar)
          .then(response => {
            this.alertSuccess()
            this.alarmaEditar = {
              nombre: null,
              descripcion: null
            }
            this.SET_MODAL_EDITAR_ALARMA(false)
          })
          .catch(error => {
            this.alertError(error.response.data[0].message)
          })
      }
    }
  }
}
</script>
