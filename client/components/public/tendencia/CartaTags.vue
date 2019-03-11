<template>
  <v-card ref="form" class="elevation-2">
    <v-card-title>
      <h4 class="blue-grey--text">{{ tendencia.Name }}</h4>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="tendencia.tags">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.Tag_Name }}</td>
          <td class="text-xs-right">{{ props.item.Tipo }}</td>
        </template>
      </v-data-table>
    </v-card-text>
    <v-divider class="mt-5"></v-divider>
  </v-card>
</template>

<script>
import axios from '@/plugins/axios'
export default {
  props: {
    tendencia: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    headers: [
      { text: 'Nombre ', value: 'Tag_Name' },
      { text: 'Tipo', value: 'Tipo' }
    ]
  }),
  methods: {}
}
</script>