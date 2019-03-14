<template>
  <v-layout row justify-center>
    <v-dialog v-model="modalRelacionarTecnologiaConMixer" width="600" persistent>
      <v-card class="modal elevation-0">
        <v-card-title class="elevation-0 py-0 px-2">
          <v-icon medium>shuffle</v-icon>
          <v-spacer></v-spacer>
          <span class="title blue-grey--text">RELACIONAR MIXER</span>
          <v-spacer></v-spacer>
          <v-btn icon flat color="grey" @click="SET_MODAL_RELACIONAR_TECNOLOGIA_CON_MIXER(false)">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="items"
            :loading="loading"
            :pagination.sync="pagination"
            :total-items="parseInt(mixers.total)"
            no-data-text="No hay datos registrados en el sistema"
            no-results-text="No hay datos registrados en el sistema"
            :rows-per-page-items="[10000]"
            rows-per-page-text="Por pagina"
          >
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
              <tr>
                <td>
                  <v-checkbox color="green" v-model="props.item.selected" primary hide-details></v-checkbox>
                </td>
                <td class="text-xs-left">
                  <strong class="blue-grey--text ml-3">{{ props.item.nombre }}</strong>
                </td>
                <td class="text-xs-left">{{ props.item.descripcion }}</td>
              </tr>
            </template>
            <template slot="expand" slot-scope="props">
              <v-card>
                <mixer-tabla :mixers="props.item.mixers" :mixer="props.mixers"/>
              </v-card>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-btn block dark flat color="green" @click="relarcionar()">Guardar</v-btn>
          <v-btn
            block
            dark
            flat
            color="blue"
            @click="SET_MODAL_RELACIONAR_TECNOLOGIA_CON_MIXER(false)"
          >cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<style scoped>
.modal {
  border-radius: 6px;
}
</style>


<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import notify from '@/mixins/notify'
export default {
  data() {
    return {
      headers: [
        { text: '', value: '', sortable: false, width: '20' },
        { text: 'Nombre', value: 'nombre', align: 'left' },
        { text: 'Descripcion', value: 'descripcion', align: 'left' }
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
        this.getMixers()
      },
      deep: true
    }
  },

  computed: {
    ...mapGetters([
      'tecnologia',
      'mixers',
      'payloadMixers',
      'modalRelacionarTecnologiaConMixer'
    ])
  },

  mounted() {
    this.CLEAR_PAYLOAD_MIXERS()
    this.getAllMixers()
  },

  methods: {
    ...mapMutations([
      'SET_MODAL_RELACIONAR_TECNOLOGIA_CON_MIXER',
      'CLEAR_PAYLOAD_MIXERS'
    ]),
    ...mapActions(['relationsTecnologiaMixers', 'getAllMixers']),
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

      this.items = this.mixers.data.map(mixer => {
        const item = this.tecnologia.mixers.find(item => {
          if (item.id === mixer.id) {
            return true
          }
        })
        mixer.selected = item ? true : false
        return mixer
      })
      this.loading = false
    },
    async relarcionar() {
      const mixers = this.items
        .filter(mixer => mixer.selected)
        .map(item => item.id)

      this.relationsTecnologiaMixers({ mixers: mixers })
        .then(response => {
          this.alertSuccess()
          this.SET_MODAL_RELACIONAR_TECNOLOGIA_CON_MIXER(false)
        })
        .catch(error => {
          this.alertError(error.response.data.message || error.response.data.length > 0
              ? error.response.data[0].message
              : '')
        })
    }
  }
}
</script>
