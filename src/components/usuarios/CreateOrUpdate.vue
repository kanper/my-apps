<template>
<v-form ref="form" v-model="valid" lazy-validation>
  <v-toolbar flat color="white">
      <v-toolbar-title>Datos del Empleado</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
  </v-toolbar>
  <v-container grid-list-xl>
    <v-layout wrap> 
      <v-flex xs12 sm6>
        <v-text-field 
        v-model="name" 
        :counter="30" 
        :rules="nameRules" 
        label="Nombre" 
        required 
        outlined
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <v-text-field 
        v-model="lastname" 
        :rules="nameRules" 
        label="Apellido" 
        required 
        outlined
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <v-text-field 
        v-model="name"
        :rules="nameRules" 
        label="Cargo" 
        required 
        outlined
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <v-text-field 
        v-model="email" 
        :rules="emailRules" 
        label="E-mail" 
        required 
        outlined
        ></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
  </v-form>
</template>

<script>
  export default {
    name: "UsuarioCreateUpdate",
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Nombre es obligatorio',
        v => (v && v.length <= 10) || 'Nombre debe tener maximo 30 caracteres'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail es obligatorio',
        v => /.+@.+/.test(v) || 'E-mail debe ser valido'
      ],
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
    }
  }
</script>