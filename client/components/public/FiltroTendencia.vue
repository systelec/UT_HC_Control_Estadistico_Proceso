<template>
  <v-menu
    offset-y
    style="width: 90%"
    origin="center center"
    :nudge-bottom="10"
    transition="scale-transition"
    :close-on-content-click="false"
    v-model="close"
    full-width
  >
    <v-btn :loading="loading" small flat slot="activator">
      <v-icon>filter_list</v-icon>
      <span class="ml-2">filtro</span>
    </v-btn>
    <v-card width="1000">
      <v-card-actions>
        <v-checkbox class="ml-3" label="Activar tiempo real" v-model="modoTiempoReal"></v-checkbox>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!tendenciaSeleccionada"
          dark
          color="blue"
          @click="filtrarTendecia()"
        >APLICAR</v-btn>
      </v-card-actions>
      <v-card-text style="margin-top: -40px;">
        <v-layout row wrap>
          <v-flex xs6>
            <v-combobox
              v-model="tegnologiasSeleccionada"
              :items="itemsTegnologias"
              multiple
              label="Tecnologia"
            />
          </v-flex>
          <v-flex xs6>
            <v-combobox
              v-model="productosSeleccionado"
              :items="itemsProductos"
              multiple
              label="Productos"
            />
          </v-flex>
          <v-flex xs6>
            <v-combobox v-model="mixerSeleccionado" :items="itemsMixers" multiple label="Mixer"/>
          </v-flex>
          <v-flex xs6>
            <v-combobox v-model="tendenciaSeleccionada" :items="itemsTendencias" label="Tendencia"/>
          </v-flex>
          <v-spacer/>
          <v-flex xs12>
            <span class="red--text">{{ valid }}</span>
          </v-flex>
          <v-flex xs6>
            <v-menu
              ref="menuDateFrom"
              :close-on-content-click="false"
              v-model="menuDateFrom"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
              :disabled="modoTiempoReal"
            >
              <v-text-field
                slot="activator"
                v-model="dateFrom"
                label="Fecha inicio"
                persistent-hint
                prepend-icon="event"
                :disabled="modoTiempoReal"
              ></v-text-field>
              <v-date-picker
                no-title
                locale="es-es"
                v-model="dateFrom"
                @input="menuDateFrom = false"
                :disabled="modoTiempoReal"
              ></v-date-picker>
            </v-menu>
            <v-menu
              ref="menuTimeFrom"
              :close-on-content-click="false"
              v-model="menuTimeFrom"
              :nudge-right="40"
              :return-value.sync="timeFrom"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
              :disabled="modoTiempoReal"
            >
              <v-text-field
                slot="activator"
                v-model="timeFrom"
                label="Hora inicio"
                prepend-icon="access_time"
                :disabled="modoTiempoReal"
              ></v-text-field>
              <v-time-picker
                format="24hr"
                no-title
                locale="es-es"
                v-if="menuTimeFrom"
                v-model="timeFrom"
                @change="$refs.menuTimeFrom.save(timeFrom)"
                :disabled="modoTiempoReal"
              ></v-time-picker>
            </v-menu>
          </v-flex>
          <v-flex xs6>
            <v-menu
              ref="menuDateTo"
              :close-on-content-click="false"
              v-model="menuDateTo"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
              :disabled="modoTiempoReal"
            >
              <v-text-field
                slot="activator"
                v-model="dateTo"
                label="Fecha fin"
                persistent-hint
                prepend-icon="event"
                :disabled="modoTiempoReal"
              ></v-text-field>
              <v-date-picker no-title locale="es-es" v-model="dateTo" @input="menuDateTo = false"></v-date-picker>
            </v-menu>
            <v-menu
              ref="menuTimeTo"
              :close-on-content-click="false"
              v-model="menuTimeTo"
              :nudge-right="40"
              :return-value.sync="timeTo"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
              :disabled="modoTiempoReal"
            >
              <v-text-field
                slot="activator"
                v-model="timeTo"
                label="Hora fin"
                prepend-icon="access_time"
                :disabled="modoTiempoReal"
              ></v-text-field>
              <v-time-picker
                format="24hr"
                no-title
                locale="es-es"
                v-if="menuTimeTo"
                v-model="timeTo"
                @change="$refs.menuTimeTo.save(timeTo)"
                :disabled="modoTiempoReal"
              ></v-time-picker>
            </v-menu>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import axios from '@/plugins/axios'
import moment from 'moment'
export default {
  data: () => ({
    loading: false,
    tendenciaSeleccionada: null,
    modoTiempoReal: true,
    dateFrom: null,
    dateTo: null,
    menuDateFrom: false,
    menuDateTo: false,
    timeFrom: null,
    timeTo: null,
    menuTimeFrom: false,
    menuTimeTo: false,
    close: null,
    valid: '',
    tendencias: [],
    itemsTendencias: [],
    mixerSeleccionado: [],
    itemsMixers: [],
    mixers: [],
    tegnologiasSeleccionada: [],
    itemsTegnologias: [],
    tecnologias: [],
    productos: [],
    itemsProductos: [],
    productosSeleccionado: []
  }),

  created() {
    let dateTime = new Date()
    this.dateFrom = moment(dateTime).format('YYYY-MM-DD')
    this.dateTo = moment(dateTime).format('YYYY-MM-DD')
    this.timeFrom = '00:00:00'
    this.timeTo = '23:59:00'
    this.getTecnologia()
    this.getMixers()
    this.getTendencias()
    this.getProductos()
  },

  watch: {
    tegnologiasSeleccionada() {
      this.mixerSeleccionado = []
      this.productosSeleccionado = []
      if (this.tegnologiasSeleccionada.length > 0) {
        // Mixers
        let tecnologiaSeleccionadaMixerId = this.tegnologiasSeleccionada
          .map(tecnologia => tecnologia.mixers)
          .reduce((a, b) => {
            return a.concat(b)
          })
          .map(mixer => mixer.id)

        let itemsMixers = this.mixers
          .filter(mixer => {
            if (tecnologiaSeleccionadaMixerId.indexOf(mixer.id) >= 0) {
              return true
            }
            return false
          })
          .map(mixer => {
            mixer.text = mixer.nombre
            mixer.value = mixer.id
            return mixer
          })
        this.itemsMixers = itemsMixers

        // Codigo Producto
        let tecnologiaSeleccionadaProductoId = this.mixers
          .filter(mixer => {
            const item = this.itemsMixers.find(item => {
              if (parseInt(mixer.id) === parseInt(item.id)) {
                return true
              }
            })
            if (item) {
              return true
            }
          })
          .map(mixer => mixer.productos)
          .reduce((a, b) => {
            return a.concat(b)
          })

        let itemsProductos = this.productos
          .filter(producto => {
            const item = tecnologiaSeleccionadaProductoId.find(item => {
              if (parseInt(producto.id) === parseInt(item.id)) {
                return true
              }
            })
            if (item) {
              return true
            }
          })
          .map(producto => producto.codigo)
        this.itemsProductos = itemsProductos
      } else {
        this.itemsMixers = this.mixers.map(mixer => {
          mixer.text = mixer.nombre
          mixer.value = mixer.id
          return mixer
        })
        this.itemsProductos = this.productos.map(producto => producto.codigo)
      }
    },
    mixerSeleccionado() {
      if (this.mixerSeleccionado.length > 0) {
        // Productos
        let itemsProductos = this.mixerSeleccionado
          .map(mixer => mixer.productos)
          .reduce((a, b) => {
            return a.concat(b)
          })
          .map(producto => producto.codigo)
        this.itemsProductos = itemsProductos

        this.tendenciaSeleccionada = []
        let idMixersSeleccionado = this.mixerSeleccionado.map(mixer =>
          parseInt(mixer.id)
        )

        // Tendencias
        this.itemsTendencias = this.tendencias
          .filter(tendencia => {
            const item = this.mixerSeleccionado.find(item => {
              if (parseInt(tendencia.mixer_id) === parseInt(item.id)) {
                return true
              }
            })
            if (item) {
              return true
            }
          })
          .map(tendencia => {
            tendencia.text = tendencia.tag
            tendencia.value = tendencia.id
            return tendencia
          })
      } else {
        this.itemsTendencias = this.tendencias.map(tendencia => {
          tendencia.text = tendencia.tag
          tendencia.value = tendencia.id
          return tendencia
        })
      }
    }
  },

  computed: {
    ...mapGetters(['payloadHistoricos'])
  },

  methods: {
    ...mapMutations([
      'SET_PAYLOAD_HISTORICOS',
      'SET_PAYLOAD_LIMITES',
      'SET_TENDENCIA',
      'SET_TENDENCIA_SELECCIONADA',
      'SET_MODO_TIEMPO_REAL',
      'SET_APLICAR_FILTRO_TENDENCIA'
    ]),
    ...mapActions(['changeRealTime', 'getAllHistoricos', 'getAllLimites']),
    async filtrarTendecia() {
      this.SET_MODO_TIEMPO_REAL(this.modoTiempoReal)
      this.SET_TENDENCIA_SELECCIONADA(this.tendenciaSeleccionada)
      if (this.modoTiempoReal) {
        this.SET_APLICAR_FILTRO_TENDENCIA()
        this.loading = false
        this.close = false
      } else {
        if (this.dateFrom && this.timeFrom && this.dateTo && this.timeTo) {
          this.loading = true

          const productos = this.productosSeleccionado

          const payload = {
            params: {
              tendencia: this.tendenciaSeleccionada.id,
              desde: new Date(this.dateFrom + ' ' + this.timeFrom),
              hasta: new Date(this.dateTo + ' ' + this.timeTo),
              productos: productos
            }
          }
          this.SET_PAYLOAD_HISTORICOS(payload)

          const payloadLimites = {
            params: {
              tendencia: this.tendenciaSeleccionada.id,
              desde: new Date(this.dateFrom + ' ' + this.timeFrom),
              hasta: new Date(this.dateTo + ' ' + this.timeTo),
              productos: productos
            }
          }
          this.SET_PAYLOAD_LIMITES(payloadLimites)

          await this.getAllHistoricos()
          await this.getAllLimites()
          this.SET_APLICAR_FILTRO_TENDENCIA()
          this.loading = false
          this.close = false
        } else {
          this.valid = 'Faltan seleccionar elementos del filtro'
        }
      }
    },
    getTendencias() {
      axios
        .get(`tendencias?sortBy=tag&descending=ASC&page=1&perPage=10000`)
        .then(response => {
          this.tendencias = response.data.data
          this.itemsTendencias = response.data.data.map(tendencia => {
            tendencia.text = tendencia.tag
            tendencia.value = tendencia.id
            return tendencia
          })
        })
    },
    getMixers() {
      axios
        .get(`mixers?sortBy=nombre&descending=ASC&page=1&perPage=10000`)
        .then(response => {
          this.mixers = response.data.data
          this.itemsMixers = response.data.data.map(mixer => {
            mixer.text = mixer.nombre
            mixer.value = mixer.id
            return mixer
          })
        })
    },
    getTecnologia() {
      axios
        .get(`tecnologias?sortBy=nombre&descending=ASC&page=1&perPage=10000`)
        .then(response => {
          this.tecnologias = response.data.data
          this.itemsTegnologias = response.data.data.map(tecnologia => {
            tecnologia.text = tecnologia.nombre
            tecnologia.value = tecnologia.id
            return tecnologia
          })
        })
    },
    getProductos() {
      axios
        .get(`productos?sortBy=codigo&descending=ASC&page=1&perPage=10000`)
        .then(response => {
          this.productos = response.data.data
          this.itemsProductos = response.data.data.map(
            producto => producto.codigo
          )
        })
    }
  }
}
</script>
