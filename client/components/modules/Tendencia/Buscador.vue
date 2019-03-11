<template>
  <v-text-field
    dark
    v-model="search"
    class="buscador"
    append-icon="search"
    label="Buscar tendencia"
    color="blue"
    outline
    single-line
    hide-details
    clearable
    @click:append="buscar()"
    @click:clear="limpiar()"
    @keyup.enter.native="buscar()"
  ></v-text-field>
</template>
