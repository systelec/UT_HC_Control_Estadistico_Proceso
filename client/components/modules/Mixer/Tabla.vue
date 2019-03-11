<template>
  <v-card class="carta-tabla elevation-0">
    <v-data-table
      :headers="headers"
      :items="mixers.data"
      :loading="loading"
      :pagination.sync="pagination"
      :total-items="parseInt(mixers.total)"
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
              <v-icon color="green" @click="relacionarConProducto(props.item)">shuffle</v-icon>
              <v-icon color="blue" @click="editarMixer(props.item)">edit</v-icon>
              <v-icon color="pink" @click="eliminarMixer(props.item)">delete</v-icon>
            </div>
          </td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card>
          <producto-tabla :productos="props.item.productos" :producto="props.productos"/>
        </v-card>
      </template>
    </v-data-table>
    <mixer-eliminar v-if="modalEliminarMixer"/>
    <mixer-editar v-if="modalEditarMixer"/>
    <producto-relacionar v-if="modalRelacionarMixerConProducto"/>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import MixerEliminar from '@/components/modules/Mixer/Eliminar'
import MixerEditar from '@/components/modules/Mixer/Editar'
import ProductoTabla from '@/components/modules/Mixer/Producto/Tabla'
import ProductoRelacionar from '@/components/modules/Mixer/Producto/Relacionar'
export default {
  components: {
    MixerEliminar,
    MixerEditar,
    ProductoTabla,
    ProductoRelacionar
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
        this.getMixers()
      },
      deep: true
    }
  },

  computed: {
    ...mapGetters([
      'mixers',
      'payloadMixers',
      'modalEditarMixer',
      'modalEliminarMixer',
      'modalRelacionarMixerConProducto'
    ])
  },

  methods: {
    ...mapMutations([
      'SET_MIXER',
      'SET_PAYLOAD_MIXERS',
      'SET_MODAL_EDITAR_MIXER',
      'SET_MODAL_ELIMINAR_MIXER',
      'SET_MODAL_RELACIONAR_MIXER_CON_PRODUCTO'
    ]),
    ...mapActions(['getAllMixers']),
    async getMixers() {
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
        this.payloadMixers.params,
        payloadFilter.params
      )
      const payload = Object.assign({ params }, this.payloadMixers)
      await this.getAllMixers()
      this.loading = false
    },
    expandTabla(props) {
      props.expanded = !props.expanded
    },
    buscar() {
      this.getMixers()
    },
    limpiar() {
      this.search = ''
      this.getMixers()
    },
    agregarMixer() {
      this.SET_MODAL_AGREGAR_MIXER(true)
    },
    editarMixer(item) {
      this.SET_MIXER(item)
      this.SET_MODAL_EDITAR_MIXER(true)
    },
    eliminarMixer(item) {
      this.SET_MIXER(item)
      this.SET_MODAL_ELIMINAR_MIXER(true)
    },
    relacionarConProducto(item) {
      this.SET_MIXER(item)
      this.SET_MODAL_RELACIONAR_MIXER_CON_PRODUCTO(true)
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
