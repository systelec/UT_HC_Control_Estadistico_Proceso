<template>
  <v-card class="blue-grey darken-3 elevation-4" style="border-radius: 5px;">
    <v-card-title style="height: 50px;">
      <v-layout row>
        <v-divider vertical dark style="height: 30px;" class="mr-2"/>
        <v-radio-group dark v-model="expandSelect" row style="margin-top: -4px;">
          <v-radio color="blue" label="Mixers" value="mixers"></v-radio>
          <v-radio color="blue" label="Tecnologias" value="tecnologias"></v-radio>
        </v-radio-group>
        <h3 class="white--text mb-2">LISTADO DE PRODUCTOS</h3>
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
        <v-divider vertical dark style="height: 30px;" class="ml-2"/>
      </v-layout>
    </v-card-title>
    <v-data-table
      class="pa-1"
      :headers="headersProductos"
      :items="productos"
      item-key="Id"
      :search="search"
      no-results-text="No se encontraron resultados"
      :rows-per-page-items="[20, 40, 60]"
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td
            class="text-xs-left blue-grey--text"
            @click="props.expanded = !props.expanded"
            style="cursor: pointer"
          >
            <strong>{{ props.item.Id }}</strong>
          </td>
          <td class="text-xs-left">{{ props.item.Nombre }}</td>
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
        <v-card v-if="expandSelect === 'tecnologias'" class="blue-grey darken-3">
          <v-card-text>
            <v-data-table
              :headers="headersTecnologias"
              :items="[props.item.Tecnologias]"
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
      </template>
    </v-data-table>
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
    expandSelect: 'mixers',
    producto: null,
    productos: [],
    search: '',
    headersTecnologias: [
      { text: 'Nombre ', value: 'Nombre' },
      { text: 'Descripcion', value: 'Descripcion' }
    ],
    headersMixers: [
      { text: 'Nombre ', value: 'Nombre' },
      { text: 'Descripcion', value: 'Descripcion' }
    ],
    headersProductos: [
      { text: 'Codigo ', value: 'Id' },
      { text: 'Nombre', value: 'Nombre' },
      { text: 'Descripcion', value: 'Descripcion' }
    ]
  }),
  created() {
    this.getProductos()
  },
  methods: {
    getProductos() {
      let filter = {
        order: [['Nombre', 'ASC']]
      }
      axios
        .get('productos', {
          params: {
            filter: filter
          }
        })
        .then(response => {
          this.productos = response.data
        })
    }
  }
}
</script>