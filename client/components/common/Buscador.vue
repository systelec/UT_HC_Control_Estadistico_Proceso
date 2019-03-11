<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12>
        <v-select
          v-if="searchField == ''"
          v-model="searchField"
          :items="campos"
          append-outer-icon="layers_clear"
          label="Campo a buscar"
          class="buscador pt-2"
          append-icon="search"
          solo
          single-line
          hide-details
          @click:append-outer="volver()"
        ></v-select>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          v-if="searchField != ''"
          v-model="search"
          class="buscador"
          append-icon="search"
          append-outer-icon="layers_clear"
          label="Que estas buscando?"
          color="blue"
          solo
          single-line
          hide-details
          clearable
          @click:append="buscar()"
          @click:append-outer="volver()"
          @click:clear="limpiar()"
          @keyup.enter.native="buscar()"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    campos: {
      type: Array,
      required: true
    },
    state: {
      Type: String,
      require: true
    }
  },
  data() {
    return {
      searchField: '',
      search: ''
    }
  },
  methods: {
    buscar() {
      this.getAllItems()
    },
    limpiar() {
      this.search = ''
      this.getAllItems()
    },
    volver() {
      this.searchField = ''
    },
    getAllItems() {
      const payloadStore = this.$store.getters[`payload${this.state}`]
      const payloadSearch = {
        params: {
          searchField: this.searchField,
          search: this.search
        }
      }
      const params = Object.assign(payloadStore.params, payloadSearch.params)
      const payload = Object.assign({ params }, payloadStore)
      this.$store.commit(`SET_PAYLOAD_${this.state.toUpperCase()}`, payload)
      this.$store.dispatch(`getAll${this.state}`)
    }
  }
}
</script>

<style scoped>
</style>