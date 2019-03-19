<template>
  <div class="carta white">
    <img class="loading" v-if="loading" src="../../../static/charts.png" width="50">
    <v-layout row wrap :style="` border: ${fueraLimite}px solid red;`">
      <v-flex xs8 text-xs-left>
        <h2 class="ml-3 titulo">{{ titulo }}</h2>
      </v-flex>
      <v-flex xs4 text-xs-right>
        <v-chip label outline color="blue">
          <strong class="mr-3">{{codigoProductoUltimo}}</strong>
          {{fechaUltimoHistorico}}
        </v-chip>
        <v-chip label outline color="green">
          <strong>{{codigoProductoActual}}</strong>
        </v-chip>
      </v-flex>
      <v-flex xs12>
        <div id="GraficoTV3"></div>
      </v-flex>
    </v-layout>
  </div>
</template>

<style scoped>
#GraficoTV3 {
  width: 100%;
  height: 24vh;
}
.carta {
  height: 30vh;
}
.titulo {
  color: rgb(82, 130, 201);
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
import axios from '@/plugins/axios'

export default {
  data: () => ({
    tv: 3,
    chart: null,
    datosTendencia: null,
    historicosAcumulados: null,
    loading: false,
    fueraLimite: false,
    tendencia: null,
    titulo: '',
    codigoProductoActual: null,
    codigoProductoUltimo: null,
    fechaUltimoHistorico: null,
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
    ...mapGetters(['datosSocket'])
  },

  watch: {
    async datosSocket() {
      await this.validaDatosyGrafica()
    }
  },

  async mounted() {
    await this.validaDatosyGrafica()
  },

  methods: {
    graficarTendencias() {
      if (!this.chart) {
        this.chart = echarts.init(document.getElementById('GraficoTV3'))
      }

      let historicos = this.historicosAcumulados.historicos
      this.limite =
        this.historicosAcumulados.limites.length > 0
          ? this.historicosAcumulados.limites[
              this.historicosAcumulados.limites.length - 1
            ]
          : {
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
      let max = mathjs.round(this.limite.usl + 1, 2)
      let min = mathjs.round(this.limite.lsl - 1, 2)
      let maxR = mathjs.round(this.limite.usl_rango * 1.01, 2)
      let minR = mathjs.round(this.limite.lsl_rango * 0.99, 2)
      let intervalyAxis = mathjs.round((max - min) / 10, 3)
      let intervalyAxisR = mathjs.round((maxR - minR) / 10, 3)

      let data = historicos.map(historico => {
        return moment(historico.fecha).format('YYYY-MM-DD HH:mm:ss')
      })

      let valuesPV = historicos.map(historico => {
        if (historico.pv) {
          return mathjs.round(historico.pv, 2)
        }
        return 0
      })

      let valuesSP = historicos.map(historico => {
        if (historico.sp) {
          return mathjs.round(historico.sp, 2)
        }
        return 0
      })

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
            top: '4%',
            height: '92%',
            width: '90%',
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
          }
        ],
        yAxis: [
          {
            gridIndex: 0,
            type: 'value',
            max: max,
            min: min,
            interval: intervalyAxis,
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            }
          }
        ],
        series: [
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
          }
        ]
      }

      this.chart.setOption(option)
    },
    async getHistoricos() {
      this.loading = true
      await axios
        .get(`historicos?tendencia=${this.tendencia.id}`)
        .then(response => {
          this.loading = false
          this.historicosAcumulados = response.data
        })
    },
    async validaDatosyGrafica() {
      if (this.datosSocket.length > 0) {
        this.datosTendencia = this.datosSocket[this.tv - 1]

        if (!this.tendencia) {
          this.tendencia = this.datosTendencia.tendencia
          await this.getHistoricos()
        }
        if (this.tendencia.id !== this.datosTendencia.tendencia.id) {
          this.tendencia = this.datosTendencia.tendencia
          await this.getHistoricos()
        }

        this.codigoProductoActual = this.datosTendencia.producto
        this.titulo = this.datosTendencia.tendencia.tag
        this.tendencia = this.datosTendencia.tendencia
        this.historicosAcumulados.hasta = this.datosTendencia.hasta
        this.historicosAcumulados.producto = this.datosTendencia.producto
        this.historicosAcumulados.tendencia = this.datosTendencia.tendencia
        this.fueraLimite = this.datosTendencia.cantidad_alarmas

        this.codigoProductoUltimo =
          this.datosTendencia.historicos.length > 0
            ? this.datosTendencia.historicos[
                this.datosTendencia.historicos.length - 1
              ].codigo_producto
            : null

        if (!this.codigoProductoUltimo) {
          this.codigoProductoUltimo =
            this.historicosAcumulados.historicos.length > 0
              ? this.historicosAcumulados.historicos[
                  this.historicosAcumulados.historicos.length - 1
                ].codigo_producto
              : null
        }
        this.fechaUltimoHistorico =
          this.datosTendencia.historicos.length > 0
            ? this.datosTendencia.historicos[
                this.datosTendencia.historicos.length - 1
              ].fecha
            : null

        if (!this.fechaUltimoHistorico) {
          this.fechaUltimoHistorico =
            this.historicosAcumulados.historicos.length > 0
              ? this.historicosAcumulados.historicos[
                  this.historicosAcumulados.historicos.length - 1
                ].fecha
              : null
        }

        this.datosTendencia.historicos.map(historico => {
          this.historicosAcumulados.historicos.push(historico)
        })
        this.datosTendencia.limites.map(limite => {
          this.historicosAcumulados.limites.push(limite)
        })

        this.graficarTendencias()
      }
    }
  }
}
</script>