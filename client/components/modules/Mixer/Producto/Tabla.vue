<template>
  <div class="contenido blue-grey">
    <v-data-table
      :headers="headers"
      :items="productos"
      hide-actions
      no-data-text="No hay datos registrados en el sistema"
      no-results-text="No hay datos registrados en el sistema"
      rows-per-page-text="Por pagina"
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td class="text-xs-left">
            <strong class="blue-grey--text ml-3">{{ props.item.codigo }}</strong>
          </td>
          <td class="text-xs-left">{{ props.item.descripcion }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  props: {
    productos: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      headers: [
        { text: 'Codigo', value: 'codigo', align: 'left' },
        { text: 'Descripcion', value: 'descripcion', align: 'left' }
      ]
    }
  },

  computed: {
    ...mapGetters([
      'mixer',
      'mixers',
      'payloadMixers',
      'modalEditarMixer',
      'modalEliminarMixer'
    ])
  },

  methods: {
    ...mapMutations([
      'SET_MIXER',
      'SET_PAYLOAD_MIXERS',
      'SET_MODAL_EDITAR_MIXER',
      'SET_MODAL_ELIMINAR_MIXER',
      'SET_MODAL_AGREGAR_PRODUCTO',
      'SET_MODAL_AGREGAR_PRODUCTO'
    ]),
    ...mapActions(['getAllMixers']),
    expandTabla(props) {
      props.expanded = !props.expanded
    }
  }
}
</script>

<style scoped>
.contenido {
  padding: 2px;
}
</style>
