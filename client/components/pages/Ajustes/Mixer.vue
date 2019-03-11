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
            @click="SET_MODAL_AGREGAR_MIXER(true)"
          >
            <v-icon>note_add</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
      <v-flex xs3 offset-xs6>
        <buscador
          :state="'Mixers'"
          :campos="[{text: 'Nombre', value: 'nombre'} , {text: 'Descripcion', value: 'descripcion'} ]"
        />
      </v-flex>
      <v-flex xs12>
        <mixer-tabla class="mt-2"/>
      </v-flex>
    </v-layout>
    <mixer-agregar v-if="modalAgregarMixer"/>
  </div>
</template>

<script>
import notify from '@/mixins/notify'
import { mapGetters, mapMutations } from 'vuex'
import MixerTabla from '@/components/modules/Mixer/Tabla'
import MixerAgregar from '@/components/modules/Mixer/Agregar'
import Buscador from '@/components/common/Buscador'
export default {
  components: {
    MixerTabla,
    MixerAgregar,
    Buscador
  },

  data() {
    return {}
  },

  mixins: [notify],

  computed: {
    ...mapGetters(['modalAgregarMixer'])
  },

  methods: {
    ...mapMutations(['SET_MODAL_AGREGAR_MIXER'])
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
