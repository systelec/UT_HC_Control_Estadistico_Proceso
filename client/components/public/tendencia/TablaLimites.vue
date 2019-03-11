<template>
  <div>
    <v-card class="blue-grey darken-3">
      <v-layout row wrap>
        <v-btn class="ml-3 mt-3" dark color="green" @click="dialogAgregar = true">
          <v-icon>add</v-icon>AGREGAR
        </v-btn>
        <v-flex xs12 pa-3>
          <v-data-table
            :headers="headers"
            :items="limites"
            item-key="ID"
            :search="search"
            no-results-text="No se encontraron resultados"
            :rows-per-page-items="[20, 40, 60]"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td class="text-xs-left">
                  <strong>{{ props.item.CodigoProducto !== '' ? props.item.CodigoProducto : 'TODOS'}}</strong>
                </td>
                <td class="text-xs-left">{{ redondear(props.item.LH_1Sigma) }}</td>
                <td class="text-xs-left">{{ redondear(props.item.LL_1Sigma) }}</td>
                <td class="text-xs-left">{{ redondear(props.item.LH_2Sigma) }}</td>
                <td class="text-xs-left">{{ redondear(props.item.LL_2Sigma) }}</td>
                <td class="text-xs-left">{{ redondear(props.item.LH_3Sigma) }}</td>
                <td class="text-xs-left">{{ redondear(props.item.LL_3Sigma) }}</td>
                <td class="text-xs-left">{{ redondear(props.item.USL) }}</td>
                <td class="text-xs-left">{{ redondear(props.item.LSL) }}</td>
                <td class="text-xs-left">{{ redondear(props.item.USLR) }}</td>
                <td class="text-xs-left">{{ redondear(props.item.LSLR) }}</td>
                <td class="text-xs-left">{{ redondear(props.item.MediaHistorica) }}</td>
                <td class="text-xs-left">{{ redondear(props.item.MediaRangoHistorica) }}</td>
                <td class="text-xs-left">{{ formatearFecha(props.item.Fecha) }}</td>
                <td class="text-xs-rigth">
                  <v-btn color="blue" flat icon @click="editarLimite(props.item)">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card>
    <v-dialog v-model="dialogAgregar" persistent max-width="600px">
      <v-card>
        <v-card-title style="margin-bottom: -40px;">
          <v-btn color="blue darken-1" icon flat @click="agregarLimite()">
            <v-icon>save</v-icon>
          </v-btn>
          <v-btn color="green darken-1" icon flat @click="calcularLimite()">
            <v-icon>sync</v-icon>
          </v-btn>
          <v-spacer/>
          <strong class="headline blue--text">CREAR NUEVO LIMITE</strong>
          <v-spacer/>
          <v-btn color="pink darken-1" icon flat @click="dialogAgregar = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-container grid-list-md>
          <small>Al crear el limite automaticamente se tiene en cuenta los ulitmos 100 registros historicos de los codigos de productos seleccioandos</small>
          <v-layout wrap>
            <v-layout row d-flex>
              <v-flex xs4 style="margin-top: 20px;">
                <strong class="blue-grey--text">Productos:</strong>
              </v-flex>
              <v-flex xs8>
                <v-combobox
                  multiple
                  :items="productos"
                  v-model="limite.CodigoProducto"
                  label="Codigo Producto"
                ></v-combobox>
              </v-flex>
            </v-layout>
            <v-layout row d-flex>
              <v-flex xs4 style="margin-top: 20px;">
                <strong class="blue-grey--text">Sigma 1:</strong>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="limite.LH_1Sigma" label="LH_1Sigma" required></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="limite.LL_1Sigma" label="LL_1Sigma" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row d-flex>
              <v-flex xs4 style="margin-top: 20px;">
                <strong class="blue-grey--text">Sigma 2:</strong>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="limite.LH_2Sigma" label="LH_2Sigma" required></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="limite.LL_2Sigma" label="LL_2Sigma" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row d-flex>
              <v-flex xs4 style="margin-top: 20px;">
                <strong class="blue-grey--text">Sigma 3:</strong>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="limite.LH_3Sigma" label="LH_3Sigma" required></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="limite.LL_3Sigma" label="LL_3Sigma" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row d-flex>
              <v-flex xs4 style="margin-top: 20px;">
                <strong class="blue-grey--text">Especif.:</strong>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="limite.USL" label="USL" required></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="limite.LSL" label="LSL" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row d-flex>
              <v-flex xs4 style="margin-top: 20px;">
                <strong class="blue-grey--text">E. rango:</strong>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="limite.USLR" label="USLR" required></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="limite.LSLR" label="LSLR" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row d-flex>
              <v-flex xs4 style="margin-top: 20px;">
                <strong class="blue-grey--text">Media:</strong>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="limite.MediaHistorica" label="MediaHistorica" required></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  v-model="limite.MediaRangoHistorica"
                  label="MediaRangoHistorica"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogEditar" persistent max-width="600px">
      <v-card>
        <v-card-title style="margin-bottom: -40px;">
          <v-btn color="blue darken-1" icon flat @click="submitEditarLimite()">
            <v-icon>save</v-icon>
          </v-btn>
          <v-spacer/>
          <strong class="headline blue--text">EDITAR LIMITE</strong>
          <v-spacer/>
          <v-btn color="pink darken-1" icon flat @click="dialogEditar = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-layout row d-flex>
              <v-flex xs4 style="margin-top: 20px;">
                <strong class="blue-grey--text">Productos:</strong>
              </v-flex>
              <v-flex xs8>
                <v-combobox
                  disabled
                  multiple
                  :items="productos"
                  v-model="limite.CodigoProducto"
                  label="Codigo Producto"
                ></v-combobox>
              </v-flex>
            </v-layout>
            <v-layout row d-flex>
              <v-flex xs4 style="margin-top: 20px;">
                <strong class="blue-grey--text">Sigma 1:</strong>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="limite.LH_1Sigma" label="LH_1Sigma" required></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="limite.LL_1Sigma" label="LL_1Sigma" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row d-flex>
              <v-flex xs4 style="margin-top: 20px;">
                <strong class="blue-grey--text">Sigma 2:</strong>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="limite.LH_2Sigma" label="LH_2Sigma" required></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="limite.LL_2Sigma" label="LL_2Sigma" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row d-flex>
              <v-flex xs4 style="margin-top: 20px;">
                <strong class="blue-grey--text">Sigma 3:</strong>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="limite.LH_3Sigma" label="LH_3Sigma" required></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="limite.LL_3Sigma" label="LL_3Sigma" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row d-flex>
              <v-flex xs4 style="margin-top: 20px;">
                <strong class="blue-grey--text">Especif.:</strong>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="limite.USL" label="USL" required></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="limite.LSL" label="LSL" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row d-flex>
              <v-flex xs4 style="margin-top: 20px;">
                <strong class="blue-grey--text">E. rango:</strong>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="limite.USLR" label="USLR" required></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="limite.LSLR" label="LSLR" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row d-flex>
              <v-flex xs4 style="margin-top: 20px;">
                <strong class="blue-grey--text">Media:</strong>
              </v-flex>
              <v-flex xs4>
                <v-text-field v-model="limite.MediaHistorica" label="MediaHistorica" required></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  v-model="limite.MediaRangoHistorica"
                  label="MediaRangoHistorica"
                  required
                ></v-text-field>
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
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import mathjs from 'mathjs'
import moment from 'moment'
export default {
  props: {
    tendencia: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    loading: false,
    snack: false,
    snackColor: '',
    snackText: '',
    dialogAgregar: false,
    dialogEditar: false,
    expandSelect: 'limites',
    limite: {
      LH_1Sigma: null,
      LL_1Sigma: null,
      LH_2Sigma: null,
      LL_2Sigma: null,
      LH_3Sigma: null,
      LL_3Sigma: null,
      USL: null,
      LSL: null,
      USLR: null,
      LSLR: null,
      MediaHistorica: null,
      MediaRangoHistorica: null,
      CodigoProducto: []
    },
    mixer: null,
    productos: [],
    codigoProdSeleccionado: [],
    limites: [],
    search: '',
    headers: [
      { text: 'Producto ', value: 'CodigoProducto' },
      { text: 'LH_1Sigma ', value: 'LH_1Sigma' },
      { text: 'LL_1Sigma', value: 'LL_1Sigma' },
      { text: 'LH_2Sigma', value: 'LH_2Sigma' },
      { text: 'LL_2Sigma', value: 'LL_2Sigma' },
      { text: 'LH_3Sigma', value: 'LH_3Sigma' },
      { text: 'LL_3Sigma', value: 'LL_3Sigma' },
      { text: 'USL', value: 'USL' },
      { text: 'LSL', value: 'LSL' },
      { text: 'USLR', value: 'USLR' },
      { text: 'LSLR', value: 'LSLR' },
      { text: 'MediaHistorica', value: 'MediaHistorica' },
      { text: 'MediaRangoHistorica', value: 'MediaRangoHistorica' },
      { text: 'Fecha', value: 'Fecha' }
    ]
  }),
  created() {
    this.getLimites()
    this.getProductos()
  },
  methods: {
    getLimites() {
      axios
        .get(`tendencias/${this.tendencia.Bloque_ID}/ultimos_limites`)
        .then(response => {
          this.limites = response.data
        })
    },
    getProductos() {
      let filter = {
        where: {
          Id: this.tendencia.MixerId
        }
      }
      axios
        .get('mixers', {
          params: {
            filter: filter
          }
        })
        .then(response => {
          this.mixer = response.data
          if (response.data.length === 1) {
            this.productos = response.data[0].Productos.map(item => item.Id)
          }
        })
    },
    getColorIcon(tv) {
      if (tv) {
        return 'green'
      }
      return 'blue-grey'
    },
    redondear(numero) {
      if (numero) {
        return mathjs.round(numero, 2)
      }
      return ''
    },
    formatearFecha(fecha) {
      return moment(fecha)
        .add(3, 'hours')
        .format('YYYY-MM-DD HH:mm:ss')
    },
    agregarLimite() {
      this.limite.Bloque_ID = this.tendencia.Bloque_ID
      if (this.limite.CodigoProducto.length === 0) {
        axios
          .post(`limites`, {
            ID: this.limite.ID,
            Bloque_ID: this.limite.Bloque_ID,
            LH_1Sigma: this.limite.LH_1Sigma,
            LL_1Sigma: this.limite.LL_1Sigma,
            LH_2Sigma: this.limite.LH_2Sigma,
            LL_2Sigma: this.limite.LL_2Sigma,
            LH_3Sigma: this.limite.LH_3Sigma,
            LL_3Sigma: this.limite.LL_3Sigma,
            USL: this.limite.USL,
            LSL: this.limite.LSL,
            USLR: this.limite.USLR,
            LSLR: this.limite.LSLR,
            MediaHistorica: this.limite.MediaHistorica,
            MediaRangoHistorica: this.limite.MediaRangoHistorica,
            CodigoProducto: this.limite.CodigoProducto
              ? this.limite.CodigoProducto[0]
              : ''
          })
          .then(response => {
            this.dialogAgregar = false
            this.getLimites()
            this.$notify({
              group: 'app',
              type: 'success',
              title: 'Operacion exitosa!',
              text: 'La operacion se realizo correctamente!'
            })
          })
      } else {
        let limites = []
        let i
        for (i = 0; i < this.limite.CodigoProducto.length; i++) {
          limites.push({
            LH_1Sigma: this.limite.LH_1Sigma,
            LL_1Sigma: this.limite.LL_1Sigma,
            LH_2Sigma: this.limite.LH_2Sigma,
            LL_2Sigma: this.limite.LL_2Sigma,
            LH_3Sigma: this.limite.LH_3Sigma,
            LL_3Sigma: this.limite.LL_3Sigma,
            USL: this.limite.USL,
            LSL: this.limite.LSL,
            USLR: this.limite.USLR,
            LSLR: this.limite.LSLR,
            MediaHistorica: this.limite.MediaHistorica,
            MediaRangoHistorica: this.limite.MediaRangoHistorica,
            CodigoProducto: this.limite.CodigoProducto[i],
            Bloque_ID: this.tendencia.Bloque_ID
          })
        }

        axios.post(`limites`, limites).then(response => {
          this.dialogAgregar = false
          this.getLimites()
          this.snack = true
          this.snackColor = 'success'
          this.snackText = 'Modificado con exito!'
        })
      }
    },
    calcularLimite() {
      let productos = this.limite.CodigoProducto
      axios
        .get(
          `tendencias/${
            this.tendencia.Bloque_ID
          }/limites/historicos?productos=[${productos}]`
        )
        .then(response => {
          let productos = this.limite.CodigoProducto
          this.limite = response.data
          this.limite.CodigoProducto = productos
        })
    },
    editarLimite(item) {
      this.limite.ID = item.ID
      this.limite.Bloque_ID = item.Bloque_ID
      this.limite.CodigoProducto = item.CodigoProducto
        ? [item.CodigoProducto]
        : ''
      this.limite.LH_1Sigma = mathjs.round(item.LH_1Sigma, 2)
      this.limite.LL_1Sigma = mathjs.round(item.LL_1Sigma, 2)
      this.limite.LH_2Sigma = mathjs.round(item.LH_2Sigma, 2)
      this.limite.LL_2Sigma = mathjs.round(item.LL_2Sigma, 2)
      this.limite.LH_3Sigma = mathjs.round(item.LH_3Sigma, 2)
      this.limite.LL_3Sigma = mathjs.round(item.LL_3Sigma, 2)
      this.limite.USL = mathjs.round(item.USL, 2)
      this.limite.LSL = mathjs.round(item.LSL, 2)
      this.limite.USLR = mathjs.round(item.USLR, 2)
      this.limite.LSLR = mathjs.round(item.LSLR, 2)
      this.limite.MediaHistorica = mathjs.round(item.MediaHistorica, 2)
      this.limite.MediaRangoHistorica = mathjs.round(
        item.MediaRangoHistorica,
        2
      )
      this.dialogEditar = true
    },
    submitEditarLimite() {
      axios
        .put(`limites/${this.limite.ID}`, {
          ID: this.limite.ID,
          Bloque_ID: this.limite.Bloque_ID,
          LH_1Sigma: this.limite.LH_1Sigma,
          LL_1Sigma: this.limite.LL_1Sigma,
          LH_2Sigma: this.limite.LH_2Sigma,
          LL_2Sigma: this.limite.LL_2Sigma,
          LH_3Sigma: this.limite.LH_3Sigma,
          LL_3Sigma: this.limite.LL_3Sigma,
          USL: this.limite.USL,
          LSL: this.limite.LSL,
          USLR: this.limite.USLR,
          LSLR: this.limite.LSLR,
          MediaHistorica: this.limite.MediaHistorica,
          MediaRangoHistorica: this.limite.MediaRangoHistorica,
          CodigoProducto: this.limite.CodigoProducto
            ? this.limite.CodigoProducto[0]
            : ''
        })
        .then(response => {
          this.dialogEditar = false
          this.getLimites()
          this.snack = true
          this.snackColor = 'success'
          this.snackText = 'Modificado con exito!'
        })
    }
  }
}
</script>