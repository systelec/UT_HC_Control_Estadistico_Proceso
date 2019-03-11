<template>
  <v-card class="carta-tabla elevation-0">
    <v-data-table
      :headers="headers"
      :items="productos.data"
      :loading="loading"
      :pagination.sync="pagination"
      :total-items="parseInt(productos.total)"
      no-data-text="No hay datos registrados en el sistema"
      no-results-text="No hay datos registrados en el sistema"
      :rows-per-page-items="[10, 25, 50]"
      rows-per-page-text="Por pagina"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <tr>
          <td class="text-xs-left">
            <strong class="blue-grey--text ml-3">{{ props.item.codigo }}</strong>
          </td>
          <td class="text-xs-left">{{ props.item.descripcion }}</td>
          <td class="text-xs-right">
            <div>
              <v-icon color="blue" @click="editarProducto(props.item)">edit</v-icon>
              <v-icon color="pink" @click="eliminarProducto(props.item)">delete</v-icon>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>
    <producto-eliminar v-if="modalEliminarProducto"/>
    <producto-editar v-if="modalEditarProducto"/>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import ProductoEliminar from '@/components/modules/Producto/Eliminar'
import ProductoEditar from '@/components/modules/Producto/Editar'
export default {
  components: {
    ProductoEliminar,
    ProductoEditar
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
        this.getProductos()
      },
      deep: true
    }
  },

  computed: {
    ...mapGetters([
      'productos',
      'payloadProductos',
      'modalEditarProducto',
      'modalEliminarProducto'
    ])
  },

  methods: {
    ...mapMutations([
      'SET_PRODUCTO',
      'SET_PAYLOAD_PRODUCTOS',
      'SET_MODAL_EDITAR_PRODUCTO',
      'SET_MODAL_ELIMINAR_PRODUCTO'
    ]),
    ...mapActions(['getAllProductos']),
    async getProductos() {
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
        this.payloadProductos.params,
        payloadFilter.params
      )
      const payload = Object.assign({ params }, this.payloadProductos)
      await this.getAllProductos()
      this.loading = false
    },
    expandTabla(props) {
      props.expanded = !props.expanded
    },
    buscar() {
      this.getProductos()
    },
    limpiar() {
      this.search = ''
      this.getProductos()
    },
    agregarProducto() {
      this.SET_MODAL_AGREGAR_PRODUCTO(true)
    },
    editarProducto(item) {
      this.SET_PRODUCTO(item)
      this.SET_MODAL_EDITAR_PRODUCTO(true)
    },
    eliminarProducto(item) {
      this.SET_PRODUCTO(item)
      this.SET_MODAL_ELIMINAR_PRODUCTO(true)
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
