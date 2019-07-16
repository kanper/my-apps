<template>
<div>
    <v-layout>
        <v-form ref="form" v-model="valid" lazy-validation>
    
            <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
        </v-form>
    </v-layout>
</div>
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