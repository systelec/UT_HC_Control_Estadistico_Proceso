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
            @click="SET_MODAL_AGREGAR_USER(true)"
          >
            <v-icon>note_add</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
      <v-flex xs3 offset-xs6>
        <buscador
          :state="'Users'"
          :campos="[{text: 'Email', value: 'email'} , {text: 'Username', value: 'usename'} ]"
        />
      </v-flex>
      <v-flex xs12>
        <user-tabla class="mt-2"/>
      </v-flex>
    </v-layout>
    <user-agregar v-if="modalAgregarUser"/>
  </div>
</template>

<script>
import notify from '@/mixins/notify'
import { mapGetters, mapMutations } from 'vuex'
import UserTabla from '@/components/modules/User/Tabla'
import UserAgregar from '@/components/modules/User/Agregar'
import Buscador from '@/components/common/Buscador'
export default {
  components: {
    UserTabla,
    UserAgregar,
    Buscador
  },

  data() {
    return {}
  },

  mixins: [notify],

  computed: {
    ...mapGetters(['modalAgregarUser'])
  },

  methods: {
    ...mapMutations(['SET_MODAL_AGREGAR_USER'])
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
