<template>
  <v-card class="blue-grey darken-3 elevation-4" style="border-radius: 5px;">
    <v-card-title style="height: 50px;">
      <v-layout row style="margin-top: -10px;">
        <v-radio-group v-model="expandSelect" row style="margin-top: 0px;">
          <v-radio dark color="blue" label="Limites" value="limites"></v-radio>
        </v-radio-group>
        <h3 class="white--text mb-2">LISTADO DE TENDENCIAS</h3>
        <v-spacer/>
        <v-text-field
          v-model="search"
          dark
          append-icon="search"
          label="Buscar variable"
          single-line
          hide-details
          style="margin-top: -10px;"
        ></v-text-field>
        <v-tooltip bottom>
          <v-btn style="margin-top: 0px;" slot="activator" color="green" icon flat>
            <v-icon>sync</v-icon>
          </v-btn>
          <span>Sincronizar los bloques de las tendencias</span>
        </v-tooltip>
      </v-layout>
    </v-card-title>
    <v-data-table
      class="pa-1"
      :headers="headers"
      :items="tendencias"
      :loading="loading"
      item-key="Bloque_ID"
      :search="search"
      no-results-text="No se encontraron resultados"
      :rows-per-page-items="[50, 100, 150]"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <tr>
          <td
            class="text-xs-left blue-grey--text"
            @click="props.expanded = !props.expanded"
            style="cursor: pointer"
          >
            <strong>{{ props.item.Name }}</strong>
          </td>
          <td class="text-xs-left">{{ props.item.Mixers ? props.item.Mixers.Nombre : '' }}</td>
          <td class="text-xs-right">
            <v-edit-dialog
              :return-value.sync="props.item.Tag_Name"
              large
              lazy
              persistent
              @save="cambiarTagName(props.item)"
            >
              <div>{{ props.item.Tag_Name }}</div>
              <div slot="input" class="mt-3 title blue-grey--text">Editar nombre del TAG</div>
              <v-text-field
                slot="input"
                v-model="props.item.Tag_Name"
                label="Editar"
                single-line
                counter
                autofocus
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class="text-xs-left">{{ props.item.Description }}</td>
          <td class="text-xs-right">
            <v-edit-dialog
              :return-value.sync="props.item.TV"
              large
              lazy
              persistent
              @save="cambiarModoTv(props.item)"
            >
              <div>
                <v-btn flat icon>
                  <v-icon :color="getColorIcon(props.item.TV)">live_tv</v-icon>
                </v-btn>
              </div>
              <div slot="input" class="mt-3 title blue-grey--text">Visibilidad en TV</div>
              <v-switch slot="input" label="Estado" v-model="props.item.TV"></v-switch>
            </v-edit-dialog>
          </td>
          <td class="text-xs-right">
            <v-edit-dialog
              :return-value.sync="props.item.TiempoReal"
              large
              lazy
              persistent
              @save="cambiarModoTiempoReal(props.item)"
            >
              <div>
                <v-btn flat icon>
                  <v-icon :color="getColorIcon(props.item.TiempoReal)">timeline</v-icon>
                </v-btn>
              </div>
              <div slot="input" class="mt-3 title blue-grey--text">Modo Run Time</div>
              <v-switch slot="input" label="Estado" v-model="props.item.TiempoReal"></v-switch>
            </v-edit-dialog>
          </td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card style="width: 97vw;">
          <tabla-limites v-if="expandSelect === 'limites'" :tendencia="props.item"/>
          <carta-tags v-if="expandSelect === 'tags'" :tendencia="props.item"/>
        </v-card>
      </template>
    </v-data-table>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn flat @click="snack = false">Cerrar</v-btn>
    </v-snackbar>
  </v-card>
</template>

<style scoped>
</style>

<script>
import axios from '@/plugins/axios'
import TablaLimites from '@/components/public/tendencia/TablaLimites'
import CartaTags from '@/components/public/tendencia/CartaTags'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    TablaLimites,
    CartaTags
  },
  data: () => ({
    loading: false,
    snack: false,
    snackColor: '',
    snackText: '',
    expandSelect: 'limites',
    tendencia: null,
    tendencias: [],
    search: '',
    headers: [
      { text: 'Nombre ', value: 'Name', sortable: false },
      { text: 'Mixer', value: 'Mixer', sortable: false },
      { text: 'Tag', value: 'Tag_Name', sortable: false },
      { text: 'Descripcion', value: 'Description', sortable: false },
      { text: 'TV', value: 'TV', sortable: false },
      { text: 'Modo Tiempo Real', value: 'TiempoReal', sortable: false }
    ]
  }),
  created() {
    this.getTendencias()
  },
  computed: {
    ...mapGetters([
      'variablesTv1Historicas',
      'variablesTv2Historicas',
      'variablesTv3Historicas',
      'variablesTv4Historicas',
      'variablesTv5Historicas',
      'variablesTv6Historicas'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_VARIABLES_TV1_HISTORICAS',
      'SET_VARIABLES_TV2_HISTORICAS',
      'SET_VARIABLES_TV3_HISTORICAS',
      'SET_VARIABLES_TV4_HISTORICAS',
      'SET_VARIABLES_TV5_HISTORICAS',
      'SET_VARIABLES_TV6_HISTORICAS',
      'SET_ACTUALIZAR_TV1_GRAFICO',
      'SET_ACTUALIZAR_TV2_GRAFICO',
      'SET_ACTUALIZAR_TV3_GRAFICO',
      'SET_ACTUALIZAR_TV4_GRAFICO',
      'SET_ACTUALIZAR_TV5_GRAFICO',
      'SET_ACTUALIZAR_TV6_GRAFICO'
    ]),
    getTendencias() {
      this.loading = true
      let filter = {
        order: [['Name', 'ASC']]
      }
      axios
        .get('tendencias', {
          params: {
            filter: filter
          }
        })
        .then(response => {
          this.tendencias = response.data
          this.loading = false
        })
    },
    getColorIcon(tv) {
      if (tv) {
        return 'green'
      }
      return 'blue-grey'
    },
    cambiarTagName(item) {
      axios
        .put(`tendencias/${item.Bloque_ID}`, { Tag_Name: item.Tag_Name })
        .then(response => {
          this.snack = true
          this.snackColor = 'success'
          this.snackText = 'Modificado con exito!'
        })
    },
    cambiarModoTv(item) {
      axios
        .put(`tendencias/${item.Bloque_ID}`, { TV: item.TV })
        .then(response => {
          this.snack = true
          this.snackColor = 'success'
          this.snackText = 'Modificado con exito!'

          if (this.variablesTv1Historicas) {
            if (
              parseInt(this.variablesTv1Historicas.Bloque_ID) ===
              parseInt(item.Bloque_ID)
            ) {
              this.SET_VARIABLES_TV1_HISTORICAS(null)
              this.SET_ACTUALIZAR_TV1_GRAFICO()
            }
          }

          if (this.variablesTv2Historicas) {
            if (
              parseInt(this.variablesTv2Historicas.Bloque_ID) ===
              parseInt(item.Bloque_ID)
            ) {
              this.SET_VARIABLES_TV2_HISTORICAS(null)
              this.SET_ACTUALIZAR_TV2_GRAFICO()
            }
          }

          if (this.variablesTv3Historicas) {
            if (
              parseInt(this.variablesTv3Historicas.Bloque_ID) ===
              parseInt(item.Bloque_ID)
            ) {
              this.SET_VARIABLES_TV3_HISTORICAS(null)
              this.SET_ACTUALIZAR_TV3_GRAFICO()
            }
          }

          if (this.variablesTv4Historicas) {
            if (
              parseInt(this.variablesTv4Historicas.Bloque_ID) ===
              parseInt(item.Bloque_ID)
            ) {
              this.SET_VARIABLES_TV4_HISTORICAS(null)
              this.SET_ACTUALIZAR_TV4_GRAFICO()
            }
          }

          if (this.variablesTv5Historicas) {
            if (
              parseInt(this.variablesTv5Historicas.Bloque_ID) ===
              parseInt(item.Bloque_ID)
            ) {
              this.SET_VARIABLES_TV5_HISTORICAS(null)
              this.SET_ACTUALIZAR_TV5_GRAFICO()
            }
          }

          if (this.variablesTv6Historicas) {
            if (
              parseInt(this.variablesTv6Historicas.Bloque_ID) ===
              parseInt(item.Bloque_ID)
            ) {
              this.SET_VARIABLES_TV6_HISTORICAS(null)
              this.SET_ACTUALIZAR_TV6_GRAFICO()
            }
          }
        })
    },
    cambiarModoTiempoReal(item) {
      axios
        .put(`tendencias/${item.Bloque_ID}`, { TiempoReal: item.TiempoReal })
        .then(response => {
          this.snack = true
          this.snackColor = 'success'
          this.snackText = 'Modificado con exito!'
        })
    }
  }
}
</script>