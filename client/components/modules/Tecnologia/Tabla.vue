<template>
  <v-card class="carta-tabla elevation-0">
    <v-data-table
      :headers="headers"
      :items="tecnologias.data"
      :loading="loading"
      :pagination.sync="pagination"
      :total-items="parseInt(tecnologias.total)"
      no-data-text="No hay datos registrados en el sistema"
      no-results-text="No hay datos registrados en el sistema"
      :rows-per-page-items="[10, 25, 50]"
      rows-per-page-text="Por pagina"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <tr>
          <td class="text-xs-left">
            <v-icon @click="expandTabla(props)" small>{{!props.expanded ? 'add' : 'remove'}}</v-icon>
            <strong class="blue-grey--text ml-3">{{ props.item.nombre }}</strong>
          </td>
          <td class="text-xs-left">{{ props.item.descripcion }}</td>
          <td class="text-xs-right">
            <div>
              <v-icon color="green" @click="relacionarConMixer(props.item)">shuffle</v-icon>
              <v-icon color="blue" @click="editarTecnologia(props.item)">edit</v-icon>
              <v-icon color="pink" @click="eliminarTecnologia(props.item)">delete</v-icon>
            </div>
          </td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card>
          <mixer-tabla :mixers="props.item.mixers" :mixer="props.mixers"/>
        </v-card>
      </template>
    </v-data-table>
    <tecnologia-eliminar v-if="modalEliminarTecnologia"/>
    <tecnologia-editar v-if="modalEditarTecnologia"/>
    <mixer-relacionar v-if="modalRelacionarTecnologiaConMixer"/>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import TecnologiaEliminar from '@/components/modules/Tecnologia/Eliminar'
import TecnologiaEditar from '@/components/modules/Tecnologia/Editar'
import MixerTabla from '@/components/modules/Tecnologia/Mixer/Tabla'
import MixerRelacionar from '@/components/modules/Tecnologia/Mixer/Relacionar'
export default {
  components: {
    TecnologiaEliminar,
    TecnologiaEditar,
    MixerTabla,
    MixerRelacionar
  },

  data() {
    return {
      headers: [
        { text: 'Nombre', value: 'nombre', align: 'left' },
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
        this.getTecnologias()
      },
      deep: true
    }
  },

  computed: {
    ...mapGetters([
      'tecnologias',
      'payloadTecnologias',
      'modalEditarTecnologia',
      'modalEliminarTecnologia',
      'modalRelacionarTecnologiaConMixer'
    ])
  },

  methods: {
    ...mapMutations([
      'SET_TECNOLOGIA',
      'SET_PAYLOAD_TECNOLOGIAS',
      'SET_MODAL_EDITAR_TECNOLOGIA',
      'SET_MODAL_ELIMINAR_TECNOLOGIA',
      'SET_MODAL_RELACIONAR_TECNOLOGIA_CON_MIXER'
    ]),
    ...mapActions(['getAllTecnologias']),
    async getTecnologias() {
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
        this.payloadTecnologias.params,
        payloadFilter.params
      )
      const payload = Object.assign({ params }, this.payloadTecnologias)
      await this.getAllTecnologias()
      this.loading = false
    },
    expandTabla(props) {
      props.expanded = !props.expanded
    },
    buscar() {
      this.getTecnologias()
    },
    limpiar() {
      this.search = ''
      this.getTecnologias()
    },
    agregarTecnologia() {
      this.SET_MODAL_AGREGAR_TECNOLOGIA(true)
    },
    editarTecnologia(item) {
      this.SET_TECNOLOGIA(item)
      this.SET_MODAL_EDITAR_TECNOLOGIA(true)
    },
    eliminarTecnologia(item) {
      this.SET_TECNOLOGIA(item)
      this.SET_MODAL_ELIMINAR_TECNOLOGIA(true)
    },
    relacionarConMixer(item) {
      this.SET_TECNOLOGIA(item)
      this.SET_MODAL_RELACIONAR_TECNOLOGIA_CON_MIXER(true)
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
