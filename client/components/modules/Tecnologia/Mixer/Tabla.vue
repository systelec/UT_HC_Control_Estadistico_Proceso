<template>
  <div class="contenido blue-grey">
    <v-data-table
      :headers="headers"
      :items="mixers"
      hide-actions
      no-data-text="No hay datos registrados en el sistema"
      no-results-text="No hay datos registrados en el sistema"
      rows-per-page-text="Por pagina"
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td class="text-xs-left">
            <strong class="blue-grey--text ml-3">{{ props.item.nombre }}</strong>
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
    mixers: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      headers: [
        { text: 'Nombre', value: 'nombre', align: 'left' },
        { text: 'Descripcion', value: 'descripcion', align: 'left' },
        { text: '', value: '', sortable: false }
      ]
    }
  },

  computed: {
    ...mapGetters([
      'tecnologia',
      'tecnologias',
      'payloadTecnologias',
      'modalEditarTecnologia',
      'modalEliminarTecnologia'
    ])
  },

  methods: {
    ...mapMutations([
      'SET_TECNOLOGIA',
      'SET_PAYLOAD_TECNOLOGIAS',
      'SET_MODAL_EDITAR_TECNOLOGIA',
      'SET_MODAL_ELIMINAR_TECNOLOGIA',
      'SET_MODAL_AGREGAR_MIXER',
      'SET_MODAL_AGREGAR_PRODUCTO'
    ]),
    ...mapActions(['getAllTecnologias']),
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
