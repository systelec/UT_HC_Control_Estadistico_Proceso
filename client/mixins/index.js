import moment from 'moment'

const mixins = {
  filters: {
    formatearFecha(fecha) {
      if (fecha) {
        return moment(fecha)
          .add(3, 'hours')
          .format('YYYY-MM-DD HH:mm:ss')
      }
      return ''
    },
    formatearColor(valor) {
      if (valor) {
        return 'green'
      }
      return 'gray'
    }
  },
  methods: {
    alertSuccess() {
      this.$snotify.success('El proceso se genero sin errores', 'Correcto!', {
        timeout: 2000
      })
    },
    alertError() {
      this.$snotify.error('Hubo errores durante el proceso', 'Erroneo!', {
        timeout: 2000
      })
    }
  }
}

export default mixins
