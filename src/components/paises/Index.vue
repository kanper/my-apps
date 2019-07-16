<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>País</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="800px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Agregar</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
           <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6>
                  <v-text-field v-model="editedItem.nombrePais" :rules="nombreRules" label="Nombre del País"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field v-model="editedItem.siglaPais" :rules="siglaRules" label="Siglas del País"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
                  <td>{{ props.item.nombrePais }}</td>
                  <td>{{ props.item.siglaPais }}</td>
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
        ¿Esta seguro de querer eliminar el País?
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
    name: "PaisIndex",
    data () {
      return {
        dialog: false,
        search: '',
        snackbar: false,
        snackbarEliminar: false,
        mensaje: '',
        headers: [
          {
            text: 'País',
            align: 'center',
            sortable: true,
            value: 'pais'
          },
          { text: 'Siglas', value: 'siglas' },
          { text: 'Opciones', value: 'name', sortable: true, align: 'center' },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
          id: 0,
          nombrePais: '',
          siglaPais: '',
        },
        nombreRules: [
        v => !!v || 'El nombre es requerido',
        v => (v != undefined && v.length <= 30) || 'El nombre debe tener maximo 30 caracteres'
        ],
        siglaRules: [
          v => !!v || 'Las siglas son requeridas',
          v => (v != undefined && v.length >= 2 && v.length <= 8) || 'Las siglas deben estar entre 2 y 8 caracteres'
        ],
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo País' : 'Editar País'
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    created() {
      let self = this;
      self.getAll();
    },
    methods: {
      getAll() {
        let self = this;
        self.$store.state.services.paisService
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
        this.$store.state.services.paisService
        .remove(this.editedIndex)
        .then( response => {
          this.getAll();
          this.snackbarEliminar = false;
          this.snackbar = true;
          this.mensaje = 'País eliminado Correctamente';
          this.editedIndex = -1;
        })
        .catch(() => {});
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        let self = this;
        if(this.editedItem.nombrePais === '' || this.editedItem.siglaPais === ''){
        this.snackbar = true;
        this.mensaje = 'Debe de llenar los campos';
        } else {
          if (this.editedIndex > -1) {
            Object.assign(this.desserts[this.editedIndex], this.editedItem)
            this.$store.state.services.paisService
            .update(this.editedItem, this.editedItem.id)
            .then(r => {
              this.snackbar = true;
              this.mensaje = 'País Editado Correctamente';
              self.$route.push('/pais');
            })
            .catch(e => { 
              //this.snackbar = true;
              //this.mensaje = 'Error al editar el país';   
            });
          } else {
            this.desserts.push(this.editedItem)
            this.$store.state.services.paisService
            .add(self.editedItem)
            .then(r => {
              this.snackbar = true;
              this.mensaje = 'País Guardado Correctamente';
              self.$route.push('/pais');
            })
            .catch(e => {
              //this.snackbar = true;
              //this.mensaje = 'Error al agregar el país';
            }); 
          }
        }
        this.close()
      },
    }
  };
</script>
