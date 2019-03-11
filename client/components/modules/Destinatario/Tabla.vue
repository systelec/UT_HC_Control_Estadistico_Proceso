<template>
  <v-card class="carta-tabla elevation-0">
    <v-data-table
      :headers="headers"
      :items="destinatarios.data"
      :loading="loading"
      :pagination.sync="pagination"
      :total-items="parseInt(destinatarios.total)"
      no-data-text="No hay datos registrados en el sistema"
      no-results-text="No hay datos registrados en el sistema"
      :rows-per-page-items="[10, 25, 50]"
      rows-per-page-text="Por pagina"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <tr>
          <td class="text-xs-left">
            <strong class="blue-grey--text ml-3">{{ props.item.email }}</strong>
          </td>
          <td class="text-xs-left">{{ props.item.nombre }}</td>
          <td class="text-xs-left">{{ props.item.apellido }}</td>
          <td class="text-xs-left">
            <v-edit-dialog
              :return-value.sync="props.item.envio"
              large
              lazy
              persistent
              @save="habilitarEnvio(props.item)"
              class="elevation-0"
            >
              <div>
                <v-icon :color="props.item.envio ? 'green' : 'grey'">email</v-icon>
              </div>
              <div slot="input" class="mt-3 title blue-grey--text">Envio de email</div>
              <v-switch
                color="green"
                slot="input"
                label="Habilitar envio"
                v-model="props.item.envio"
              ></v-switch>
            </v-edit-dialog>
          </td>
          <td class="text-xs-right">
            <div>
              <v-icon color="blue" @click="editarDestinatario(props.item)">edit</v-icon>
              <v-icon color="pink" @click="eliminarDestinatario(props.item)">delete</v-icon>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>
    <destinatario-eliminar v-if="modalEliminarDestinatario"/>
    <destinatario-editar v-if="modalEditarDestinatario"/>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import notify from '@/mixins/notify'
import DestinatarioEliminar from '@/components/modules/Destinatario/Eliminar'
import DestinatarioEditar from '@/components/modules/Destinatario/Editar'
export default {
  components: {
    DestinatarioEliminar,
    DestinatarioEditar
  },

  data() {
    return {
      headers: [
        { text: 'Email', value: 'email', align: 'left' },
        { text: 'Nombre', value: 'nombre', align: 'left' },
        { text: 'Apellido', value: 'apellido', align: 'left' },
        { text: 'Envio', value: 'envio', align: 'left' },
        { text: '', value: '', sortable: false }
      ],
      items: [],
      loading: false,
      search: '',
      pagination: {}
    }
  },

  mixins: [notify],

  watch: {
    pagination: {
      handler() {
        this.getDestinatarios()
      },
      deep: true
    }
  },

  computed: {
    ...mapGetters([
      'destinatarios',
      'payloadDestinatarios',
      'modalEditarDestinatario',
      'modalEliminarDestinatario'
    ])
  },

  methods: {
    ...mapMutations([
      'SET_DESTINATARIO',
      'SET_PAYLOAD_DESTINATARIOS',
      'SET_MODAL_EDITAR_DESTINATARIO',
      'SET_MODAL_ELIMINAR_DESTINATARIO'
    ]),
    ...mapActions(['getAllDestinatarios', 'updateDestinatario']),
    async getDestinatarios() {
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
        this.payloadDestinatarios.params,
        payloadFilter.params
      )
      const payload = Object.assign({ params }, this.payloadDestinatarios)
      await this.getAllDestinatarios()
      this.loading = false
    },
    expandTabla(props) {
      props.expanded = !props.expanded
    },
    buscar() {
      this.getDestinatarios()
    },
    limpiar() {
      this.search = ''
      this.getDestinatarios()
    },
    agregarDestinatario() {
      this.SET_MODAL_AGREGAR_DESTINATARIO(true)
    },
    editarDestinatario(item) {
      this.SET_DESTINATARIO(item)
      this.SET_MODAL_EDITAR_DESTINATARIO(true)
    },
    eliminarDestinatario(item) {
      this.SET_DESTINATARIO(item)
      this.SET_MODAL_ELIMINAR_DESTINATARIO(true)
    },
    habilitarEnvio(item) {
      this.SET_DESTINATARIO(item)
      this.updateDestinatario(item)
        .then(response => {
          this.alertSuccess()
        })
        .catch(error => {
          this.alertError(error.response.data[0].message)
        })
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
