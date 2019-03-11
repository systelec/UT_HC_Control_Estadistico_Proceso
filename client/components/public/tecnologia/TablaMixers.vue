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
          v-if="expandSelect == 'productos' && mixerSeleccionada.Id > 0"
          @click="asociarConProductos()"
          style="margin-top: -2px;"
        >
          <v-icon>chrome_reader_mode</v-icon>
        </v-btn>
        <v-divider vertical dark style="height: 30px;" class="mr-2"/>
        <v-radio-group dark v-model="expandSelect" row style="margin-top: -4px;">
          <v-radio color="blue" label="Tecnologias" value="tecnologias"></v-radio>
          <v-radio color="blue" label="Productos" value="productos"></v-radio>
        </v-radio-group>
        <h3 class="white--text mb-2">LISTADO DE MIXERS</h3>
        <v-spacer/>
        <v-text-field
          dark
          v-model="search"
          append-icon="search"
          label="Buscar"
          single-line
          hide-details
          style="margin-top: -16px;"
        ></v-text-field>
        <v-divider vertical dark style="height: 30px;" class="ml-2"/>
      </v-layout>
    </v-card-title>
    <v-data-table
      class="pa-1"
      :headers="headersMixers"
      :items="mixers"
      item-key="Id"
      :search="search"
      no-results-text="No se encontraron resultados"
      :rows-per-page-items="[20, 40, 60]"
    >
      <template slot="items" slot-scope="props">
        <tr :class="props.item.Id == mixerSeleccionada.Id ? 'indigo lighten-5': ''">
          <td
            class="text-xs-left blue-grey--text"
            @click="expandirMixer(props)"
            style="cursor: pointer"
          >
            <strong>{{ props.item.Nombre }}</strong>
          </td>
          <td class="text-xs-left">{{ props.item.Descripcion }}</td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card v-if="expandSelect === 'tecnologias'" class="blue-grey darken-3">
          <v-card-text>
            <v-data-table
              :headers="headersTecnologias"
              :items="props.item.Tecnologias"
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
    <v-dialog v-model="dialogAsociarProductos" width="400">
      <v-card>
        <v-toolbar class="elevation-0">
          <v-btn icon flat color="green" @click="sumitAsociarConProducto()">
            <v-icon>save</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title class="blue--text">ASOCIAR PRODUCTOS</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon flat color="pink" @click="dialogAsociarProductos = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list>
          <v-list-tile v-for="item in itemsProductos" :key="item.Id">
            <v-list-tile-action>
              <v-checkbox v-model="item.Seleccionado"></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-text="item.Id"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<style scoped>
</style>

<script>
import axios from '@/plugins/axios'
export default {
  data: () => ({
    snack: false,
    snackColor: '',
    snackText: '',
    expandSelect: 'productos',
    mixer: null,
    mixers: [],
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
    mixerSeleccionada: {
      Id: 0
    },
    productos: [],
    itemsProductos: [],
    dialogAsociarProductos: false
  }),
  created() {
    this.getMixers()
    this.getProductos()
  },
  methods: {
    expandirMixer(props) {
      props.expanded = !props.expanded
      this.mixerSeleccionada = props.item
    },
    getMixers() {
      let filter = {
        order: [['Nombre', 'ASC']]
      }
      axios
        .get('mixers', {
          params: {
            filter: filter
          }
        })
        .then(response => {
          this.mixers = response.data
        })
    },
    getProductos() {
      axios.get('productos').then(response => {
        this.productos = response.data
      })
    },
    asociarConProductos() {
      let productos = this.mixerSeleccionada.Productos
      this.itemsProductos = this.productos.map(producto => {
        let productoBuscado = productos.find(item => {
          if (parseInt(item.Id) === parseInt(producto.Id)) {
            return true
          }
          return false
        })

        let seleccionado = productoBuscado ? true : false
        return {
          Id: producto.Id,
          Nombre: producto.Nombre,
          Seleccionado: seleccionado
        }
      })
      this.dialogAsociarProductos = true
    },
    sumitAsociarConProducto() {
      let productos = this.itemsProductos.filter(item => {
        if (item.Seleccionado) {
          return true
        }
        return false
      })
      axios
        .post(`mixers/${this.mixerSeleccionada.Id}/productos`, {
          productos: productos
        })
        .then(response => {
          this.dialogAsociarProductos = false
          this.getMixers()
          this.snack = true
          this.snackColor = 'success'
          this.snackText = 'Modificado con exito!'
        })
    }
  }
}
</script>