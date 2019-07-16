<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Usuario</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark class="mb-2" @click="$router.push('/usuarios/add')">Agregar</v-btn>
    </v-toolbar>
    <v-container>
      <v-layout>
        <v-flex>
            <v-card>
              <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-search-web" label="Search" single-line hide-details></v-text-field>
              </v-card-title>
              <v-data-table :headers="headers" :items="desserts" :search="search">
                <template v-slot:items="props">
                  <td>{{ props.item.nombrePersonal }}</td>
                  <td>{{ props.item.apellidoPersonal }}</td>
                  <td>{{ props.item.cargo }}</td>
                  <td>{{ props.item.username }}</td>
                  <td>{{ props.item.name }}</td>
                  <td class="justify-center layout px-0">
                  <v-btn flat icon> <v-icon @click="get(props.item)">mdi-pencil</v-icon></v-btn>
                  <v-btn flat icon> <v-icon ml-2 @click="deleteItem(props.item.id)">mdi-delete</v-icon></v-btn>
                  </td>
                </template>
                <template v-slot:no-results>
                  <v-alert :value="true" color="error" icon="mdi-sign-caution">
                    Su busqueda de "{{ search }}" no encontro resultados.
                  </v-alert>
                </template>
              </v-data-table>
            </v-card>
        </v-flex>
      </v-layout>
      <v-snackbar v-model="snackbar">
        {{ mensaje }}
        <v-btn color="pink" flat @click="snackbar = false">Cerrar</v-btn>
      </v-snackbar>
      <v-snackbar v-model="snackbarEliminar" top multi-line color="info">
        ¿Esta seguro de querer eliminar el Usuario?
        <v-btn color="success" @click="remove()">
          Aceptar
        </v-btn>
        <v-btn color="warning" @click="snackbarEliminar = false">
          Cancelar
        </v-btn>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: "UsuarioIndex",
    data () {
      return {
        dialog: false,
        search: '',
        snackbar: false,
        snackbarEliminar: false,
        mensaje: '',
        headers: [
          {
            text: 'Nombre',
            align: 'center',
            sortable: true,
            value: 'Nombre'
          },
          { text: 'Apellido', value: 'Apellido' },
          { text: 'Cargo', value: 'Cargo' },
          { text: 'UserName', value: 'UserName' },
          { text: 'Rol', value: 'Rol' },
          { text: 'Opciones', value: 'name', sortable: true, align: 'center' },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
          id: 0,
          nombrePersonal: '',
          apellidoPersonal: '',
          cargo: '',
          username: '',
          name: ''
        },
      }
    },
    created() {
      let self = this;
      self.getAll();
    },
    methods: {
      getAll() {
        let self = this;
        self.$store.state.services.usuarioService
        .getAll()
        .then(r => {
          self.desserts = r.data;
        })
        .catch(r => {
          this.snackbar = true;
          this.mensaje = 'Error al obtener datos';
        });
      },
      get (id) {
          this.editedIndex = this.desserts.indexOf(id)
          this.editedItem = Object.assign({}, id)
          this.dialog = true
      },
      deleteItem (id) {
        this.snackbarEliminar = true;
        this.editedIndex = id;
      },
      remove(){
        this.$store.state.services.usuarioService
        .remove(this.editedIndex)
        .then( response => {
          this.getAll();
          this.snackbarEliminar = false;
          this.snackbar = true;
          this.mensaje = 'Usuario eliminado Correctamente';
          this.editedIndex = -1;
        })
        .catch(() => {});
      },
    }
  };
</script>
