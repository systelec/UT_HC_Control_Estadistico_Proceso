<template>
  <v-card class="blue-grey darken-3 elevation-4" style="border-radius: 5px;">
    <v-card-title style="height: 50px;">
      <v-layout row>
        <v-btn
          small
          dark
          icon
          flat
          color="white"
          v-if="expandSelect == 'mixers' && tecnologiaSeleccionada.Id > 0"
          @click="asociarConMixers()"
          style="margin-top: -2px;"
        >
          <v-icon>chrome_reader_mode</v-icon>
        </v-btn>
        <v-divider vertical dark style="height: 30px;" class="mr-2"/>
        <v-radio-group dark v-model="expandSelect" row style="margin-top: -4px;">
          <v-radio color="blue" label="Mixers" value="mixers"></v-radio>
          <v-radio color="blue" label="Productos" value="productos"></v-radio>
        </v-radio-group>
        <h3 class="white--text mb-2">LISTADO DE TECNOLOGIAS</h3>
        <v-spacer/>
        <v-text-field
          v-model="search"
          append-icon="search"
          dark
          label="Buscar"
          single-line
          hide-details
          style="margin-top: -16px;"
        ></v-text-field>
        <v-btn
          small
          dark
          icon
          flat
          color="white"
          @click="dialogAgregarTecnologia = true"
          style="margin-top: -2px;"
        >
          <v-icon>add</v-icon>
        </v-btn>
        <v-divider vertical dark style="height: 30px;" class="ml-2"/>
      </v-layout>
    </v-card-title>
    <v-data-table
      class="pa-1"
      :headers="headersTecnologias"
      :items="tecnologias"
      item-key="Id"
      :search="search"
      no-results-text="No se encontraron resultados"
      :rows-per-page-items="[20, 40, 60]"
    >
      <template slot="items" slot-scope="props">
        <tr :class="props.item.Id == tecnologiaSeleccionada.Id ? 'indigo lighten-5': ''">
          <td
            class="text-xs-left blue-grey--text"
            @click="expandirTecnologia(props)"
            style="cursor: pointer"
          >
            <strong>{{ props.item.Nombre }}</strong>
          </td>
          <td class="text-xs-left">{{ props.item.Descripcion }}</td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card v-if="expandSelect === 'mixers'" class="blue-grey darken-3">
          <v-card-text>
            <v-data-table
              :headers="headersMixers"
              :items="props.item.Mixers"
              item-key="Id"
              :search="search"
              no-results-text="No se encontraron resultados"
              :rows-per-page-items="[20, 40, 60]"
            >
              <template slot="items" slot-scope="props">
                <tr>
                  <td class="text-xs-left">{{ props.item.Nombre }}</td>
                  <td class="text-xs-left">{{ props.item.Descripcion }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
        <v-card v-if="expandSelect === 'productos'" class="blue-grey darken-3">
          <v-card-text>
            <v-data-table
              :headers="headersPructos"
              :items="props.item.Productos"
              item-key="Id"
              :search="search"
              no-results-text="No se encontraron resultados"
              :rows-per-page-items="[20, 40, 60]"
            >
              <template slot="items" slot-scope="props">
                <tr>
                  <td class="text-xs-left">{{ props.item.Id }}</td>
                  <td class="text-xs-left">{{ props.item.Nombre }}</td>
                  <td class="text-xs-left">{{ props.item.Descripcion }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogAsociarMixers" width="400">
      <v-card>
        <v-toolbar class="elevation-0">
          <v-btn icon flat color="green" @click="sumitAsociarConMixer()">
            <v-icon>save</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title class="blue--text">ASOCIAR MIXERS</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon flat color="pink" @click="dialogAsociarMixers = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list>
          <v-list-tile v-for="item in itemsMixers" :key="item.Nombre">
            <v-list-tile-action>
              <v-checkbox v-model="item.Seleccionado"></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-text="item.Nombre"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogAgregarTecnologia" width="400">
      <v-card>
        <v-toolbar class="elevation-0">
          <v-btn icon flat color="green" @click="sumitAgregarTecnologia()">
            <v-icon>save</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title class="blue--text">AGREGAR TECNOLOGIA</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon flat color="pink" @click="dialogAgregarTecnologia = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-layout row wrap>
              <v-flex xs4 style="margin-top: 20px;">
                <strong class="blue-grey--text">Nombre:</strong>
              </v-flex>
              <v-flex xs8>
                <v-text-field v-model="tecnologia.Nombre" label="Nombre" required></v-text-field>
              </v-flex>
              <v-flex xs4 style="margin-top: 20px;">
                <strong class="blue-grey--text">Descripcion:</strong>
              </v-flex>
              <v-flex xs8>
                <v-textarea v-model="tecnologia.Descripcion" label="Descripcion" required></v-textarea>
              </v-flex>
            </v-layout>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
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
export default {
  data: () => ({
    tecnologia: {
      Nombre: null,
      Descripcion: null
    },
    snack: false,
    snackColor: '',
    snackText: '',
    expandSelect: 'mixers',
    tecnologias: [],
    search: '',
    headersTecnologias: [
      { text: 'Nombre ', value: 'Nombre' },
      { text: 'Descripcion', value: 'Descripcion' }
    ],
    headersMixers: [
      { text: 'Nombre ', value: 'Nombre' },
      { text: 'Descripcion', value: 'Descripcion' }
    ],
    headersPructos: [
      { text: 'Codigo ', value: 'Id' },
      { text: 'Nombre', value: 'Nombre' },
      { text: 'Descripcion', value: 'Descripcion' }
    ],
    tecnologiaSeleccionada: {
      Id: 0
    },
    mixers: [],
    itemsMixers: [],
    dialogAsociarMixers: false,
    dialogAgregarTecnologia: false
  }),
  created() {
    this.getTecnologias()
    this.getMixers()
  },
  methods: {
    expandirTecnologia(props) {
      props.expanded = !props.expanded
      this.tecnologiaSeleccionada = props.item
    },
    getTecnologias() {
      let filter = {
        order: [['Nombre', 'ASC']]
      }
      axios
        .get('tecnologias', {
          params: {
            filter: filter
          }
        })
        .then(response => {
          this.tecnologias = response.data
        })
    },
    getColorIcon(tv) {
      if (tv) {
        return 'green'
      }
      return 'blue-grey'
    },
    getMixers() {
      axios.get('mixers').then(response => {
        this.mixers = response.data
      })
    },
    asociarConMixers() {
      let mixers = this.tecnologiaSeleccionada.Mixers
      this.itemsMixers = this.mixers.map(mixer => {
        let mixerBuscado = mixers.find(item => {
          if (parseInt(item.Id) === parseInt(mixer.Id)) {
            return true
          }
          return false
        })

        let seleccionado = mixerBuscado ? true : false
        return {
          Id: mixer.Id,
          Nombre: mixer.Nombre,
          Seleccionado: seleccionado
        }
      })
      this.dialogAsociarMixers = true
    },
    sumitAsociarConMixer() {
      let mixers = this.itemsMixers.filter(item => {
        if (item.Seleccionado) {
          return true
        }
        return false
      })
      axios
        .post(`tecnologias/${this.tecnologiaSeleccionada.Id}/mixers`, {
          mixers: mixers
        })
        .then(response => {
          this.dialogAsociarMixers = false
          this.getTecnologias()
          this.snack = true
          this.snackColor = 'success'
          this.snackText = 'Modificado con exito!'
        })
    },
    sumitAgregarTecnologia() {
      axios.post('tecnologias', this.tecnologia).then(response => {
        this.dialogAgregarTecnologia = false
        this.getTecnologias()
        this.snack = true
        this.snackColor = 'success'
        this.snackText = 'Modificado con exito!'
      })
    }
  }
}
</script>