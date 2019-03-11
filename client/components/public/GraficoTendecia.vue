<template>
  <v-layout row wrap pa-1 class="historico">
    <v-flex xs6 text-xs-left>
      <div>
        <h3
          v-if="tendenciaHistorico"
          class="titulo-tendencia"
        >{{ tendenciaHistorico.tag }} ( {{productosHistorico}} )</h3>
      </div>
    </v-flex>
    <v-flex xs6 text-xs-right>
      <div v-if="historicos.length > 0">
        <v-btn
          dark
          small
          :color="colorBotonCodigoProducto('Todos')"
          @click="codigoProductoSelecionado = 'Todos'"
        >Todos</v-btn>
        <template v-for="producto in productosHistoricoFiltrado">
          <v-btn
            :key="producto"
            dark
            small
            :color="colorBotonCodigoProducto(producto)"
            @click="codigoProductoSelecionado = producto"
          >{{producto}}</v-btn>
        </template>
      </div>
    </v-flex>
    <v-flex xs12>
      <div id="GraficoTendencia"></div>
    </v-flex>
  </v-layout>
</template>

<style scoped>
.historico {
  height: 80vh;
}
#GraficoTendencia {
  width: 100%;
  height: 80vh;
}
.titulo {
  position: relative;
  top: 40vh;
  left: 40vw;
  margin-bottom: 0px;
  color: rgba(109, 117, 138, 0.884);
}
.titulo-tendencia {
  margin-bottom: 0px;
  color: rgba(109, 117, 138, 0.884);
}
</style>


<script>
import moment from 'moment'
import echarts from 'echarts'
import ecStat from 'echarts-stat'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import mathjs from 'mathjs'
import _ from 'lodash'

export default {
  data: () => ({
    chart: null,
    codigoProductoSelecionado: 'Todos',
    productosHistoricoFiltrado: [],
    limite: {
      lh_1sigma: 0,
      ll_1sigma: 0,
      lh_2sigma: 0,
      ll_2sigma: 0,
      lh_3sigma: 0,
      ll_3sigma: 0,
      usl: 0,
      lsl: 0,
      usl_rango: 0,
      lsl_rango: 0,
      media_historica: 0,
      media_rango_historica: 0,
      codigo_producto: null
    }
  }),

  computed: {
    ...mapGetters([
      'datosSocket',
      'historicos',
      'limites',
      'tendenciaHistorico',
      'productosHistorico'
    ])
  },

  watch: {
    limites() {
      this.filtraLimite()
    },
    historicos() {
      this.agruparProductosHistoricos()
      this.graficarTendencias()
    },
    codigoProductoSelecionado() {
      this.agruparProductosHistoricos()
      this.graficarTendencias()
    }
  },

  async mounted() {
    this.chart = echarts.init(document.getElementById('GraficoTendencia'))
    await this.getAllHistoricos()
    await this.getAllLimites()
    this.agruparProductosHistoricos()
    this.graficarTendencias()
  },

  methods: {
    ...mapMutations([]),
    ...mapActions(['getAllHistoricos', 'getAllLimites']),
    graficarTendencias(CodigoProducto) {
      let media = this.limite.media_historica
      let mediaR = this.limite.media_rango_historica
      let lsl = this.limite.lsl
      let usl = this.limite.usl
      let lslR = this.limite.lsl_rango
      let uslR = this.limite.usl_rango

      let LH1Sigma = this.limite.lh_1sigma
      let LL1Sigma = this.limite.ll_1sigma
      let LH2Sigma = this.limite.lh_2sigma
      let LL2Sigma = this.limite.ll_2sigma
      let LH3Sigma = this.limite.lh_3sigma
      let LL3Sigma = this.limite.ll_3sigma
      let max = mathjs.round(this.limite.usl * 1.01, 2)
      let min = mathjs.round(this.limite.lsl * 0.99, 2)
      let maxR = mathjs.round(this.limite.uslR * 1.01, 2)
      let minR = mathjs.round(this.limite.lslR * 0.99, 2)
      let intervalyAxis = mathjs.round((max - min) / 10, 2)
      let intervalyAxisR = mathjs.round((maxR - minR) / 10, 2)

      let hasta = moment(
        this.historicos.length > 0
          ? this.historicos[this.historicos.length - 1].fecha
          : ''
      )
      let desde = moment(
        this.historicos.length > 0 ? this.historicos[0].fecha : ''
      )

      let historicos = this.historicos
      if (this.codigoProductoSelecionado !== 'Todos') {
        historicos = this.historicos.filter(historico => {
          if (
            parseInt(historico.codigo_producto) ===
            parseInt(this.codigoProductoSelecionado)
          ) {
            return true
          }
        })
      }

      let data = historicos.map(historico => {
        return moment(historico.fecha).format('YYYY-MM-DD HH:mm:ss')
      })

      let valuesPV = historicos
        .filter(historico => {
          if (historico.pv) {
            return true
          }
          return false
        })
        .map(historico => {
          return mathjs.round(historico.pv, 2)
        })

      let valuesSP = historicos
        .filter(historico => {
          if (historico.sp) {
            return true
          }
          return false
        })
        .map(historico => {
          return mathjs.round(historico.sp, 2)
        })

      let valuesRangos = valuesPV.map((item, i) => {
        if (i < valuesPV.length - 1) {
          return mathjs.round(Math.abs(valuesPV[i + 1] - valuesPV[i]), 2)
        }
      })

      let valuesCodigoProductos = historicos.map(historico => {
        return historico.CodigoProducto
      })

      let markAreaCodigoProductos = data.filter((producto, i) => {
        if (i === 0) {
          return true
        } else {
          if (valuesCodigoProductos[i - 1] !== valuesCodigoProductos[i]) {
            return true
          }
        }
        return false
      })

      markAreaCodigoProductos.push(data[data.length - 1])
      markAreaCodigoProductos = markAreaCodigoProductos
        .map((item, i) => {
          if (i < markAreaCodigoProductos.length - 1) {
            return [
              { xAxis: markAreaCodigoProductos[i] },
              { xAxis: markAreaCodigoProductos[i + 1] }
            ]
          }
        })
        .filter(item => {
          if (item) {
            return true
          }
          return false
        })

      let histogramaCategory = []
      let histogramaValues = []
      let distribucionNormalValues = []
      let interaciones = this.numeroClase(valuesPV.length)
      let intervaloCategorias = (max - min) / interaciones
      let j = 0
      let categoria = min
      let cantidad
      let mediaDN = 0
      let stdDN = 0

      if (valuesPV.length > 3) {
        mediaDN =
          valuesPV.reduce((a, b) => {
            return a + b
          }) / valuesPV.length
        stdDN = mathjs.std(valuesPV)
      }
      for (j; j < interaciones; j++) {
        cantidad = valuesPV.filter(item => {
          if (item > categoria && item < categoria + intervaloCategorias) {
            return true
          }
          return false
        })
        let x = cantidad.length
        let valorND = this.normalDist(mediaDN, stdDN, cantidad.length)

        histogramaCategory.push(mathjs.round(categoria, 2))
        histogramaValues.push(cantidad.length)
        distribucionNormalValues.push(valorND)

        categoria = categoria + intervaloCategorias
      }

      let option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: [
          {
            left: '2%',
            top: '2%',
            height: '44%',
            width: '74%',
            containLabel: true
          },
          {
            left: '78%',
            top: '2%',
            height: '42%',
            width: '20%',
            rotate: 90,
            containLabel: true
          },
          {
            left: '2.5%',
            top: '50%',
            height: '44%',
            width: '74%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: data,
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            }
          },
          {
            gridIndex: 1,
            type: 'value',
            scale: true,
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            }
          },
          {
            gridIndex: 1,
            type: 'value',
            scale: true,
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            }
          },
          {
            gridIndex: 2,
            type: 'category',
            data: data,
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            }
          }
        ],
        yAxis: [
          {
            gridIndex: 0,
            type: 'value',
            max: max,
            min: min,
            interval: intervalyAxis
          },
          {
            gridIndex: 1,
            type: 'category',
            data: histogramaCategory,
            show: false
          },
          {
            gridIndex: 2,
            type: 'value',
            max: maxR,
            min: minR,
            interval: intervalyAxisR
          }
        ],
        series: [
          {
            name: 'Cod. Prod',
            data: valuesCodigoProductos,
            smooth: false,
            step: 'start',
            type: 'custom',
            symbolSize: 0,
            xAxisIndex: 0,
            yAxisIndex: 0,
            lineStyle: {
              normal: {
                width: 0,
                color: 'blue'
              }
            },
            markArea: {
              silent: true,
              data: [
                [
                  {
                    xAxis: '2019-01-13 05:42:16'
                  },
                  {
                    xAxis: '2019-01-14 16:35:16'
                  }
                ]
              ]
            }
          },
          {
            name: 'PV',
            data: valuesPV,
            smooth: false,
            type: 'line',
            symbolSize: 0,
            xAxisIndex: 0,
            yAxisIndex: 0,
            lineStyle: {
              normal: {
                width: 2,
                color: 'blue'
              }
            },
            markLine: {
              symbol: '',
              data: [
                {
                  name: 'Media',
                  yAxis: media,
                  lineStyle: {
                    normal: {
                      type: '',
                      width: 2,
                      color: 'rgba(0, 0, 0, 1)'
                    }
                  }
                },
                {
                  name: 'USL',
                  yAxis: usl,
                  lineStyle: {
                    normal: {
                      type: 'solid',
                      width: 2,
                      color: 'rgba(255, 34, 34, 1)'
                    }
                  }
                },
                {
                  name: 'LSL',
                  yAxis: lsl,
                  lineStyle: {
                    normal: {
                      type: 'solid',
                      width: 2,
                      color: 'rgba(255, 34, 34, 1)'
                    }
                  }
                },
                {
                  name: '1sigma+',
                  yAxis: LH1Sigma,
                  lineStyle: {
                    normal: {
                      type: 'solid',
                      color: 'rgba(21, 235, 0, 1)'
                    }
                  }
                },
                {
                  name: '1sigma-',
                  yAxis: LL1Sigma,
                  lineStyle: {
                    normal: {
                      type: 'solid',
                      color: 'rgba(21, 235, 0, 1)'
                    }
                  }
                },
                {
                  name: '2sigma+',
                  yAxis: LH2Sigma,
                  lineStyle: {
                    normal: {
                      type: 'solid',
                      color: 'rgba(250, 243, 30, 1)'
                    }
                  }
                },
                {
                  name: '2sigma-',
                  yAxis: LL2Sigma,
                  lineStyle: {
                    normal: {
                      type: 'solid',
                      color: 'rgba(250, 243, 30, 1)'
                    }
                  }
                },
                {
                  name: '3sigma+',
                  yAxis: LH3Sigma,
                  lineStyle: {
                    normal: {
                      type: 'solid',
                      color: 'rgba(255, 0, 0, 1)'
                    }
                  }
                },
                {
                  name: '3sigma-',
                  yAxis: LL3Sigma,
                  lineStyle: {
                    normal: {
                      type: 'solid',
                      color: 'rgba(255, 0, 0, 1)'
                    }
                  }
                }
              ]
            },
            markArea: {
              silent: true,
              data: [
                [
                  {
                    yAxis: LL1Sigma,
                    itemStyle: {
                      normal: {
                        color: 'rgba(21, 235, 0, 0.5)'
                      }
                    }
                  },
                  {
                    yAxis: LH1Sigma
                  }
                ],
                [
                  {
                    yAxis: LH1Sigma,
                    itemStyle: {
                      normal: {
                        color: 'rgba(250, 243, 30, 0.5)'
                      }
                    }
                  },
                  {
                    yAxis: LH2Sigma
                  }
                ],
                [
                  {
                    yAxis: LL2Sigma,
                    itemStyle: {
                      normal: {
                        color: 'rgba(250, 243, 30, 0.5)'
                      }
                    }
                  },
                  {
                    yAxis: LL1Sigma
                  }
                ],
                [
                  {
                    yAxis: LH2Sigma,
                    itemStyle: {
                      normal: {
                        color: 'rgba(255, 0, 0, 0.5)'
                      }
                    }
                  },
                  {
                    yAxis: LH3Sigma
                  }
                ],
                [
                  {
                    yAxis: LL3Sigma,
                    itemStyle: {
                      normal: {
                        color: 'rgba(255, 0, 0, 0.5)'
                      }
                    }
                  },
                  {
                    yAxis: LL2Sigma
                  }
                ]
              ]
            }
          },
          {
            name: 'SP',
            data: valuesSP,
            type: 'line',
            smooth: false,
            type: 'line',
            symbolSize: 0,
            xAxisIndex: 0,
            yAxisIndex: 0,
            lineStyle: {
              normal: {
                width: 2,
                color: 'purple'
              }
            }
          },
          {
            name: 'Histograma',
            type: 'bar',
            barWidth: '99.3%',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: histogramaValues
          },
          {
            name: 'Distribucion normal',
            type: 'line',
            xAxisIndex: 2,
            yAxisIndex: 1,
            smooth: true,
            symbolSize: 0,
            lineStyle: {
              normal: {
                width: 2,
                color: 'black'
              }
            },
            data: distribucionNormalValues
          },
          {
            name: 'Rango',
            smooth: false,
            type: 'line',
            symbolSize: 0,
            xAxisIndex: 3,
            yAxisIndex: 2,
            lineStyle: {
              normal: {
                width: 2,
                color: 'blue'
              }
            },
            markLine: {
              symbol: '',
              data: [
                {
                  name: 'LCL R',
                  yAxis: lslR,
                  lineStyle: {
                    normal: {
                      type: 'solid',
                      width: 2,
                      color: 'rgba(255, 34, 34, 1)'
                    }
                  }
                },
                {
                  name: 'USL R',
                  yAxis: uslR,
                  lineStyle: {
                    normal: {
                      type: 'solid',
                      width: 2,
                      color: 'rgba(255, 34, 34, 1)'
                    }
                  }
                },
                {
                  name: 'Media',
                  yAxis: mediaR,
                  lineStyle: {
                    normal: {
                      type: '',
                      width: 2,
                      color: 'rgba(0, 0, 0, 1)'
                    }
                  }
                }
              ]
            }
          },
          {
            name: 'Rango',
            data: valuesRangos,
            type: 'line',
            xAxisIndex: 3,
            yAxisIndex: 2
          }
        ]
      }

      this.chart.setOption(option)
    },
    filtraLimite() {
      if (this.limites.length > 0) {
        if (this.codigoProductoSelecionado !== 'Todos') {
          const limites = this.limites.filter(limite => {
            if (
              parseInt(limite.codigo_producto) ===
                parseInt(this.codigoProductoSelecionado) ||
              limite.codigo_producto === null
            ) {
              return true
            }
          })

          if (limites.length > 0) {
            this.limite = limites[limites.length - 1]
          } else {
            this.limpiarLimite()
          }
        } else {
          this.limite = this.limites[this.limites.length - 1]
        }
      } else {
        this.limpiarLimite()
      }
    },
    agruparProductosHistoricos() {
      const productosHistorico = _.groupBy(this.historicos, 'codigo_producto')
      this.productosHistoricoFiltrado = []
      for (const key in productosHistorico) {
        this.productosHistoricoFiltrado.push(key)
      }
    },
    limpiarLimite() {
      this.limite = {
        lh_1sigma: 0,
        ll_1sigma: 0,
        lh_2sigma: 0,
        ll_2sigma: 0,
        lh_3sigma: 0,
        ll_3sigma: 0,
        usl: 0,
        lsl: 0,
        usl_rango: 0,
        lsl_rango: 0,
        media_historica: 0,
        media_rango_historica: 0,
        codigo_producto: null
      }
    },
    normalDist(media, std, x) {
      return (
        (1 / (std * Math.sqrt(2 * Math.PI))) *
        Math.exp(-0.5 * (((x - media) * (x - media)) / (std * std)))
      )
    },
    numeroClase(numeroDatos) {
      if (numeroDatos <= 50) {
        return 6
      }
      if (numeroDatos <= 100) {
        return 7
      }
      if (numeroDatos <= 200) {
        return 8
      }
      if (numeroDatos <= 500) {
        return 9
      }
      if (numeroDatos <= 1000) {
        return 10
      }
      return 15
    },
    colorBotonCodigoProducto(codigo) {
      if (this.codigoProductoSelecionado === codigo) {
        return 'blue'
      }
      return 'blue-grey'
    }
  }
}
</script>