<template>
  <div>
    <img class="loading" v-if="loadingTv2Grafico" src="../../../static/charts.png" width="50">
    <div :style="` border: ${fueraLimite}px solid red;`">
      <h3 class="titulo">{{ titulo }}</h3>
      <div id="GraficoTV2"></div>
    </div>
  </div>
</template>

<style scoped>
#GraficoTV2 {
  width: 100%;
  height: 32vh;
}
.titulo {
  margin-bottom: -30px;
  color: rgb(94, 111, 136);
}
.loading {
  margin-top: 10vh;
  opacity: 0.5;
  animation: aloading 4s linear infinite alternate;
}
@keyframes aloading {
  0% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1.6);
  }
}
</style>


<script>
import moment from 'moment'
import echarts from 'echarts'
import ecStat from 'echarts-stat'
import { mapGetters } from 'vuex'
import mathjs from 'mathjs'

export default {
  data: () => ({
    titulo: '',
    fueraLimite: '0'
  }),

  computed: {
    ...mapGetters([
      'variablesTv2TiempoReal',
      'variablesTv2Historicas',
      'actualizarTv2Grafico',
      'loadingTv2Grafico'
    ])
  },

  watch: {
    actualizarTv2Grafico() {
      if (this.variablesTv2Historicas) {
        this.graficarTendencias()
      }
    }
  },

  mounted() {
    if (this.variablesTv2Historicas) {
      this.graficarTendencias()
    }
  },

  methods: {
    graficarTendencias() {
      let myChart = echarts.init(document.getElementById('GraficoTV2'))

      this.titulo = this.variablesTv2Historicas
        ? this.variablesTv2Historicas.Tendencia
        : ''

      this.fueraLimite = this.variablesTv2Historicas
        ? this.variablesTv2Historicas.Fuera_Limite
        : ''

      let intervalo = 1000000
      let limite = this.variablesTv2Historicas.Limite || null
      let media = 0
      let mediaR = 0
      let lsl = 0
      let usl = 0
      let lslR = 0
      let uslR = 0

      let LH1Sigma = 0
      let LL1Sigma = 0
      let LH2Sigma = 0
      let LL2Sigma = 0
      let LH3Sigma = 0
      let LL3Sigma = 0

      if (limite) {
        media = mathjs.round(limite.MediaHistorica, 2)
        mediaR = mathjs.round(limite.MediaRangoHistorica, 2)
        lsl = limite.LSL
        usl = limite.USL
        lslR = limite.LSLR
        uslR = limite.USLR

        LH1Sigma = limite.LH_1Sigma
        LL1Sigma = limite.LL_1Sigma
        LH2Sigma = limite.LH_2Sigma
        LL2Sigma = limite.LL_2Sigma
        LH3Sigma = limite.LH_3Sigma
        LL3Sigma = limite.LL_3Sigma
      }

      let max = mathjs.round(usl * 1.01, 2)
      let min = mathjs.round(lsl * 0.99, 2)
      let maxR = mathjs.round(uslR * 1.01, 2)
      let minR = mathjs.round(lslR * 0.99, 2)
      let intervalyAxis = mathjs.round((max - min) / 10, 2)
      let intervalyAxisR = mathjs.round((maxR - minR) / 10, 2)

      let hasta = moment(
        this.variablesTv2Historicas ? this.variablesTv2Historicas.Hasta : ''
      )
      let desde = moment(
        this.variablesTv2Historicas ? this.variablesTv2Historicas.Desde : ''
      ).add(-intervalo, 'seconds')

      let historicos = this.variablesTv2Historicas
        ? this.variablesTv2Historicas.Historicos
        : []
      let valuesPV = historicos
        .filter(historico => {
          if (historico.PV) {
            return true
          }
          return false
        })
        .map(historico => {
          return mathjs.round(historico.PV, 2)
        })
      let data = historicos.map(historico => {
        return moment(historico.Fecha).format('YYYY-MM-DD HH:mm:ss')
      })

      let valuesSP = historicos
        .filter(historico => {
          if (historico.SP) {
            return true
          }
          return false
        })
        .map(historico => {
          return mathjs.round(historico.SP, 2)
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

      // var girth = valuesPV
      // let bins = ecStat.histogram(girth)

      let interaciones = 14
      let intervaloCategorias = (max - min) / interaciones
      let j = 0
      let categoria = min
      let cantidad

      for (j; j < interaciones; j++) {
        cantidad = valuesPV.filter(item => {
          if (item > categoria && item < categoria + intervaloCategorias) {
            return true
          }
          return false
        })

        histogramaCategory.push(mathjs.round(categoria, 2))
        histogramaValues.push(cantidad.length)

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
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            data: data
          }
        ],
        yAxis: [
          {
            gridIndex: 0,
            type: 'value',
            max: max,
            min: min,
            interval: intervalyAxis
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
            symbolSize: 7,
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
            symbolSize: 7,
            xAxisIndex: 0,
            yAxisIndex: 0,
            lineStyle: {
              normal: {
                width: 2,
                color: 'purple'
              }
            }
          }
        ]
      }

      myChart.setOption(option)
    }
  }
}
</script>