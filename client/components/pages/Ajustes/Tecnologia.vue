<template>
  <div class="pa-1 pagina">
    <v-layout row wrap>
      <v-flex xs3>
        <v-layout row wrap>
          <v-btn
            dark
            flat
            icon
            class="mt-3 ml-2"
            color="blue-grey"
            @click="SET_MODAL_AGREGAR_TECNOLOGIA(true)"
          >
            <v-icon>note_add</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
      <v-flex xs3 offset-xs6>
        <buscador
          :state="'Tecnologias'"
          :campos="[{text: 'Nombre', value: 'nombre'} , {text: 'Descripcion', value: 'descripcion'} ]"
        />
      </v-flex>
      <v-flex xs12>
        <tecnologia-tabla class="mt-2"/>
      </v-flex>
    </v-layout>
    <tecnologia-agregar v-if="modalAgregarTecnologia"/>
  </div>
</template>

<script>
import notify from '@/mixins/notify'
import { mapGetters, mapMutations } from 'vuex'
import TecnologiaTabla from '@/components/modules/Tecnologia/Tabla'
import TecnologiaAgregar from '@/components/modules/Tecnologia/Agregar'
import Buscador from '@/components/common/Buscador'
export default {
  components: {
    TecnologiaTabla,
    TecnologiaAgregar,
    Buscador
  },

  data() {
    return {}
  },

  mixins: [notify],

  computed: {
    ...mapGetters(['modalAgregarTecnologia'])
  },

  methods: {
    ...mapMutations(['SET_MODAL_AGREGAR_TECNOLOGIA'])
  }
}
</script>

<style scoped>
.pagina {
  background-color: #ffffff;
}
.grupo-expand {
  border-radius: 4px;
  border: 1px solid #b0bec5;
  margin-top: 0.5rem;
  width: 100%;
  height: 60px;
}
.boton-agregar {
  border: 1px solid #b0bec5;
  border-radius: 4px;
  margin-top: 0.5rem;
  padding-left: 2.5rem;
  height: 60px;
  width: 100%;
}
</style>
