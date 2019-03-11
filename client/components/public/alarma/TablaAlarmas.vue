<template>
  <div>
    <v-layout row>
      <v-btn v-if="configurarEmail" dark class="green" @click="dialogAgregar = true">Agregar</v-btn>
      <v-spacer/>
      <v-btn
        @click="configurarEmail = !configurarEmail"
        color="blue-grey darken-2"
        dark
      >{{ !configurarEmail ? 'Configurar email envio de alarmas' : 'Volver a alarmas'}}</v-btn>
    </v-layout>
    <v-card v-if="!configurarEmail" class="blue-grey darken-3 elevation-4">
      <v-card-title style="height: 50px;">
        <v-layout row style="margin-top: -8px;">
          <h3 class="white--text mb-2">LISTADO DE ALARMAS</h3>
          <v-spacer/>
          <v-text-field
            v-model="search"
            append-icon="search"
            dark
            label="Buscar"
            single-line
            hide-details
            style="margin-top: -10px;"
          ></v-text-field>
        </v-layout>
      </v-card-title>
      <v-data-table
        class="pa-1"
        :headers="headers"
        :items="alarmas"
        item-key="Name"
        :search="search"
        no-results-text="No se encontraron resultados"
        :rows-per-page-items="[20, 40, 60]"
      >
        <template slot="items" slot-scope="props">
          <tr>
            <td
              class="text-xs-left blue-grey--text"
              @click="verModal(props.item)"
              style="cursor: pointer"
            >
              <strong>{{ props.item.Name }}</strong>
            </td>
            <td class="text-xs-left">{{ props.item.Type }}</td>
            <td class="text-xs-left">{{ props.item.Description }}</td>
          </tr>
        </template>
      </v-data-table>
      <v-dialog v-model="dialog" width="700">
        <!-- <carta-limite v-if="itemDialog === 'limites' && dialog" :tendencia="tendencia"/> -->
      </v-dialog>
    </v-card>
    <v-card v-if="configurarEmail" class="blue-grey darken-3 elevation-4">
      <v-card-title style="height: 50px;">
        <v-layout row style="margin-top: -8px;">
          <h3 class="white--text mb-2">LISTADOS DE EMAIL</h3>
          <v-spacer/>
          <v-text-field
            v-model="searchEmail"
            append-icon="search"
            dark
            label="Buscar"
            single-line
            hide-details
            style="margin-top: -10px;"
          ></v-text-field>
        </v-layout>
      </v-card-title>
      <v-data-table
        class="pa-1"
        :headers="headersEmail"
        :items="emails"
        item-key="Email"
        :search="search"
        no-results-text="No se encontraron resultados"
        :rows-per-page-items="[20, 40, 60]"
      >
        <template slot="items" slot-scope="props">
          <tr>
            <td
              class="text-xs-left blue-grey--text"
              @click="verModal(props.item)"
              style="cursor: pointer"
            >
              <strong>{{ props.item.Email }}</strong>
            </td>
            <td class="text-xs-left">{{ props.item.Nombre }}</td>
            <td class="text-xs-left">{{ props.item.Apellido }}</td>
            <td class="text-xs-right">
              <v-layout row>
                <v-btn color="red" icon flat @click="eliminarEmail(props.item)">
                  <v-icon>delete</v-icon>
                </v-btn>
                <v-edit-dialog
                  :return-value.sync="props.item.Envio"
                  large
                  lazy
                  persistent
                  @save="habilitarEnvioEmail(props.item)"
                >
                  <div>
                    <v-btn flat icon>
                      <v-icon :color="getColorIcon(props.item.Envio)">email</v-icon>
                    </v-btn>
                  </div>
                  <div slot="input" class="mt-3 title blue-grey--text">Habilitar envio de email</div>
                  <v-switch slot="input" label="Envio" v-model="props.item.Envio"></v-switch>
                </v-edit-dialog>
              </v-layout>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialogAgregar" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">CREAR NUEVO EMAIL</span>
        </v-card-title>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field v-model="email.Email" label="Email" required></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field v-model="email.Nombre" label="Apellido" required></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field v-model="email.Apellido" label="Nombre" required></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialogAgregar = false">Cerrar</v-btn>
          <v-btn color="blue darken-1" flat @click="agregarEmail()">Guardar</v-btn>
        </v-card-actions>
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

export default {
  data: () => ({
    snack: false,
    snackColor: 'success',
    snackText: 'Registro completo!',
    dialogAgregar: false,
    email: {
      Email: null,
      Apellido: null,
      Nombre: null,
      Envio: true
    },
    configurarEmail: false,
    alarma: null,
    alarmas: [],
    dialog: false,
    search: '',
    searchEmail: '',
    emails: [],
    headers: [
      { text: 'Fecha ', value: 'Fecha' },
      { text: 'Tipo', value: 'Tipo' },
      { text: 'Estado', value: 'Reconocida' },
      { text: 'Fecha Reconocida', value: 'FechaReconocidaUsuario' },
      { text: 'Usuario', value: 'ReconocidaUsuario' },
      { text: 'Descripcion', value: 'ReconocidaDescripcion' }
    ],
    headersEmail: [
      { text: 'Email ', value: 'Email' },
      { text: 'Nombre', value: 'Nombre' },
      { text: 'Apellido', value: 'Apellido' },
      { text: '', value: '' }
    ]
  }),
  created() {
    // this.getAlarmas()
    this.getEmails()
  },
  methods: {
    getAlarmas() {
      let filter = {
        where: {},
        order: 'Name ASC',
        include: [
          {
            relation: 'limites',
            scope: {
              limit: 1,
              skip: 0,
              order: 'Fecha_Ini DESC'
            }
          },
          {
            relation: 'tags'
          }
        ]
      }
      axios
        .get('alarmas', {
          params: {
            filter: filter
          }
        })
        .then(response => {
          this.alarmas = response.data
        })
    },
    getEmails() {
      let filter = {
        order: [['Email', 'ASC']]
      }
      axios
        .get('email_alarmas', {
          params: {
            filter: filter
          }
        })
        .then(response => {
          this.emails = response.data
        })
    },
    getColorIcon(tv) {
      if (tv) {
        return 'green'
      }
      return 'blue-grey'
    },
    verModal(alarma) {
      this.alarma = alarma
      this.dialog = !this.dialog
    },
    agregarEmail() {
      axios.post('email_alarmas', this.email).then(data => {
        this.getEmails()
        this.snack = true
        this.snackColor = 'success'
        this.snackText = 'Creado con exito!'
        this.dialogAgregar = false
      })
    },
    habilitarEnvioEmail(item) {
      axios
        .put('email_alarmas/' + item.Id, { Envio: item.Envio })
        .then(data => {
          this.getEmails()
          this.snack = true
          this.snackColor = 'success'
          this.snackText = 'Modificado con exito!'
          this.dialogAgregar = false
        })
    },
    eliminarEmail(item) {
      axios.delete('email_alarmas/' + item.Id).then(data => {
        this.getEmails()
        this.snack = true
        this.snackColor = 'success'
        this.snackText = 'Eliminado con exito!'
        this.dialogAgregar = false
      })
    }
  }
}
</script>