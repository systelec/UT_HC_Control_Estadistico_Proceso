<template>
  <div class="contenido blue-grey">
    <v-data-table
      :headers="headers"
      :items="limites"
      hide-actions
      no-data-text="No hay datos registrados en el sistema"
      no-results-text="No hay datos registrados en el sistema"
      rows-per-page-text="Por pagina"
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td class="text-xs-left">
            <strong class="blue-grey--text ml-3">{{ props.item.created_at }}</strong>
          </td>
          <td class="text-xs-left">{{ props.item.lh_1sigma }}</td>
          <td class="text-xs-left">{{ props.item.ll_1sigma }}</td>
          <td class="text-xs-left">{{ props.item.lh_2sigma }}</td>
          <td class="text-xs-left">{{ props.item.ll_2sigma }}</td>
          <td class="text-xs-left">{{ props.item.lh_3sigma }}</td>
          <td class="text-xs-left">{{ props.item.ll_3sigma }}</td>
          <td class="text-xs-left">{{ props.item.usl }}</td>
          <td class="text-xs-left">{{ props.item.lsl }}</td>
          <td class="text-xs-left">{{ props.item.usl_rango }}</td>
          <td class="text-xs-left">{{ props.item.lsl_rango }}</td>
          <td class="text-xs-left">{{ props.item.media_historica }}</td>
          <td class="text-xs-left">{{ props.item.media_rango_historica }}</td>
          <td class="text-xs-left">{{ props.item.codigo_producto }}</td>
          <td class="text-xs-right">
            <div>
              <v-icon color="blue" @click="editarLimite(props.item)">edit</v-icon>
              <v-icon color="pink" @click="eliminarLimite(props.item)">delete</v-icon>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>
    <limite-editar v-if="modalEditarLimite"/>
    <limite-eliminar v-if="modalEliminarLimite"/>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import LimiteEditar from '@/components/modules/Tendencia/Limite/Editar'
import LimiteEliminar from '@/components/modules/Tendencia/Limite/Eliminar'
export default {
  props: {
    limites: {
      type: Array,
      required: true
    }
  },

  components: {
    LimiteEditar,
    LimiteEliminar
  },

  data() {
    return {
      headers: [
        { text: 'Fecha', value: 'fecha', align: 'left', width: '200' },
        { text: '+ 1σ', value: 'lh_1sigma', align: 'left', width: '100' },
        { text: '- 1σ', value: 'll_1sigma', align: 'left', width: '100' },
        { text: '+ 2σ', value: 'lh_2sigma', align: 'left', width: '100' },
        { text: '- 2σ', value: 'll_2sigma', align: 'left', width: '100' },
        { text: '+ 3σ', value: 'lh_3sigma', align: 'left', width: '100' },
        { text: '- 3σ', value: 'll_3sigma', align: 'left', width: '100' },
        { text: 'USL', value: 'usl', align: 'left', width: '100' },
        { text: 'LSL', value: 'lsl', align: 'left', width: '100' },
        { text: 'USL rango', value: 'usl_rango', align: 'left', width: '100' },
        { text: 'LSL rango', value: 'lsl_rango', align: 'left', width: '100' },
        {
          text: 'Media',
          value: 'media_historica',
          align: 'left',
          width: '100'
        },
        {
          text: 'Media rango',
          value: 'media_rango_historica',
          align: 'left',
          width: '10'
        },
        {
          text: 'Codigo producto',
          value: 'codigo_producto',
          align: 'left',
          width: '10'
        },
        { text: '', value: '', sortable: false }
      ]
    }
  },

  computed: {
    ...mapGetters([
      'limite',
      'payloadLimites',
      'modalEditarLimite',
      'modalEliminarLimite'
    ])
  },

  methods: {
    ...mapMutations([
      'SET_LIMITE',
      'SET_PAYLOAD_TENDENCIAS',
      'SET_MODAL_EDITAR_LIMITE',
      'SET_MODAL_ELIMINAR_LIMITE'
    ]),
    ...mapActions(['getAllLimites']),
    expandTabla(props) {
      props.expanded = !props.expanded
    },
    editarLimite(item) {
      this.SET_LIMITE(item)
      this.SET_MODAL_EDITAR_LIMITE(true)
    },
    eliminarLimite(item) {
      this.SET_LIMITE(item)
      this.SET_MODAL_ELIMINAR_LIMITE(true)
    }
  }
}
</script>

<style scoped>
.contenido {
  padding: 2px;
}
</style>
