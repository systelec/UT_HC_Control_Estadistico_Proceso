<template>
  <v-card class="carta-tabla elevation-0">
    <v-data-table
      :headers="headers"
      :items="alarmas.data"
      :loading="loading"
      :pagination.sync="pagination"
      :total-items="parseInt(alarmas.total)"
      no-data-text="No hay datos registrados en el sistema"
      no-results-text="No hay datos registrados en el sistema"
      :rows-per-page-items="[10, 25, 50]"
      rows-per-page-text="Por pagina"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <tr>
          <td class="text-xs-left">
            <strong class="blue-grey--text ml-3">{{ props.item.descripcion }}</strong>
          </td>
          <td class="text-xs-left">{{ props.item.codigo_producto }}</td>
          <td class="text-xs-left">{{ props.item.prioridad }}</td>
          <td class="text-xs-right">
            <div>
              <v-icon color="blue" @click="editarAlarma(props.item)">edit</v-icon>
              <v-icon color="pink" @click="eliminarAlarma(props.item)">delete</v-icon>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>
    <alarma-eliminar v-if="modalEliminarAlarma"/>
    <alarma-editar v-if="modalEditarAlarma"/>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import AlarmaEliminar from '@/components/modules/Alarma/Eliminar'
import AlarmaEditar from '@/components/modules/Alarma/Editar'
export default {
  components: {
    AlarmaEliminar,
    AlarmaEditar
  },

  data() {
    return {
      headers: [
        { text: 'Codigo', value: 'codigo', align: 'left' },
        { text: 'Descripcion', value: 'descripcion', align: 'left' },
        { text: '', value: '', sortable: false }
      ],
      items: [],
      loading: false,
      search: '',
      pagination: {}
    }
  },

  watch: {
    pagination: {
      handler() {
        this.getAlarmas()
      },
      deep: true
    }
  },

  computed: {
    ...mapGetters([
      'alarmas',
      'payloadAlarmas',
      'modalEditarAlarma',
      'modalEliminarAlarma'
    ])
  },

  methods: {
    ...mapMutations([
      'SET_ALARMA',
      'SET_PAYLOAD_ALARMAS',
      'SET_MODAL_EDITAR_ALARMA',
      'SET_MODAL_ELIMINAR_ALARMA'
    ]),
    ...mapActions(['getAllAlarmas']),
    async getAlarmas() {
      this.loading = true
      const { sortBy, descending, page, rowsPerPage } = this.pagination
      const payloadFilter = {
        params: {
          sortBy: sortBy,
          descending: descending ? 'DESC' : 'ASC',
          page: page,
          perPage: rowsPerPage
        }
      }

      const params = Object.assign(
        this.payloadAlarmas.params,
        payloadFilter.params
      )
      const payload = Object.assign({ params }, this.payloadAlarmas)
      await this.getAllAlarmas()
      this.loading = false
    },
    expandTabla(props) {
      props.expanded = !props.expanded
    },
    buscar() {
      this.getAlarmas()
    },
    limpiar() {
      this.search = ''
      this.getAlarmas()
    },
    agregarAlarma() {
      this.SET_MODAL_AGREGAR_ALARMA(true)
    },
    editarAlarma(item) {
      this.SET_ALARMA(item)
      this.SET_MODAL_EDITAR_ALARMA(true)
    },
    eliminarAlarma(item) {
      this.SET_ALARMA(item)
      this.SET_MODAL_ELIMINAR_ALARMA(true)
    }
  }
}
</script>

<style scoped>
.carta-tabla {
  border: 1px solid #b0bec5;
  border-radius: 4px;
}
</style>
