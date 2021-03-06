<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-dialog
    fullscreen
    v-model="visibleNewDialog"
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="black">
        <v-btn icon dark @click="changeNewDialogVisibility">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Formulario de {{modelSpecification.modelTitle}}: Agregar nuevo</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="save()">Guardar</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field
                :error-messages="errors.collect('nombre')"
                :counter="50"
                data-vv-name="nombrePersonal"
                label="Nombres *"
                required
                v-model="newModel.nombrePersonal"
                v-validate="'required|max:50'"
                outlined
              ></v-text-field>
              <v-text-field
                :error-messages="errors.collect('apellidoPersonal')"
                :counter="50"
                data-vv-name="apellidoPersonal"
                label="Apellidos *"
                required
                v-model="newModel.apellidoPersonal"
                v-validate="'required|max:50'"
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-text-field
                :error-messages="errors.collect('cargo')"
                :counter="50"
                data-vv-name="cargo"
                label="Cargo *"
                required
                v-model="newModel.cargo"
                v-validate="'required|max:50'"
              ></v-text-field>
              <v-text-field
                :error-messages="errors.collect('phoneNumber')"
                data-vv-name="phoneNumber"
                label="Telefono *"
                required
                v-model="newModel.phoneNumber"
                :rules="phoneRules"
              ></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs6>
              <v-text-field
                :error-messages="errors.collect('email')"
                data-vv-name="email"
                label="Correo *"
                required
                v-model="newModel.email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :error-messages="errors.collect('password')"
                :type="show1 ? 'text' : 'password'"
                hint="al menos 8 caracteres"
                data-vv-name="password"
                label="Contraseña *"
                required
                @click:append="show1 = !show1"
                v-model="newModel.password"
                v-validate="'required|min:8'"
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-combobox
                :items="roles"
                item-text="nombre"
                label="Seleccione el rol del usuario *"
                required
                v-model="newModel.name"
                :return-object="false"
              ></v-combobox>
              <v-combobox
                :items="paises"
                item-text="nombre"
                label="Seleccione un pais *"
                required
                v-model="newModel.pais"
                :return-object="false"
              ></v-combobox>
            </v-flex>
          </v-layout>
        </v-container>
        <small>* Indica que el campo es requerido</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="changeNewDialogVisibility" color="gray darken-1" flat>Cancelar</v-btn>
        <v-btn @click="save()" color="green darken-1" flat>Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      newModel: {
        id: "",
        nombrePersonal: "",
        apellidoPersonal: "",
        cargo: "",
        email: "",
        password: "",
        phoneNumber: "",
        fechaAfilacion: new Date().toISOString().substr(0, 10),
        pais: "",
        name: "",
      },
      emailRules: [
        v => !!v || 'E-mail es Obligatorio',
        v => /.+@.+\..+/.test(v) || 'E-mail debe ser valido',
      ],
      phoneRules: [
        v => !!v || 'Telefono es Obligatorio',
        v => /\(([0-9]{3})\)([ ])([0-9]{4})+-.+[0-9]{3}/.test(v) || 'Telefono debe ser valido',
      ],
      show1: false,
      paises: [],
      roles: [],
      datePickInicio: false,
      datePickFin: false,
      datePickApro: false
    };
  },
  computed: {
    ...mapState(["modelSpecification", "visibleNewDialog", "services"])
  },
  methods: {
    ...mapMutations([
      "changeNewDialogVisibility",
      "closeAllDialogs",
      "showInfo",
      "addAlert"
    ]),
    ...mapActions(["loadDataTable"]),
    save() {
      this.$validator
        .validateAll()
        .then(v => {
          if (v) {
            this.services[this.modelSpecification.modelService]
              .add(this.newModel, this.modelSpecification.modelParams)
              .then(r => {
                this.loadDataTable();
                if (r.data) {
                  this.addAlert({
                    value: true,
                    color: "success",
                    icon: "mdi-checkbox-marked-circle-outline",
                    text:
                      "El nuevo " +
                      this.modelSpecification.modelName +
                      " se guardo correctamente."
                  });
                } else {
                  this.addAlert({
                    value: true,
                    color: "error",
                    icon: "mdi-close-circle-outline",
                    text:
                      "Ocurrio un problema al tratar de guardar el " +
                      this.modelSpecification.modelName +
                      " seleccionado."
                  });
                }
              })
              .catch(e => {
                this.showInfo(e.toString());
              });
            this.closeAllDialogs();
          } else {
            this.showInfo(this.$validator.errors.all().toString());
          }
        })
        .catch(e => {
          this.showInfo(e.toString());
        });
    }
  },
  created() {
    this.services.proyectoHelperService
      .getPaises()
      .then(r => {
        this.paises = r.data;
      })
      .catch(e => {
        this.showInfo(e.toString());
      });
    this.services.proyectoHelperService
      .getRoles()
      .then(r => {
        this.roles = r.data;
      })
      .catch(e => {
        this.showInfo(e.toString());
      });
  }
};
</script>