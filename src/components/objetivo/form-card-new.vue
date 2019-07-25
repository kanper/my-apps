<template>
    <v-dialog v-model="dialogNew" persistent max-width="50%">
        <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">Nuevo <v-icon right dark>mdi-plus</v-icon></v-btn>
        </template>
        <v-card>
            <v-card-title class="headline grey darken-3 white--text">Formulario de nuevo</v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field v-model="objective.nombreObjetivo" label="Nombre *" required clearable counter></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <small>* Indica que el campo es requerido</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="gray darken-1" flat @click="dialogNew = false">Cancelar</v-btn>
                <v-btn color="green darken-1" flat @click="save()">Guardar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data () {
            return {
                dialogNew: false,
                objective: {
                    codigoObjetivo: 0,
                    nombreObjetivo: ''
                }
            }
        },
        methods: {
            save() {
                this.$store.state.services.objetivoService.add(this.objective)
                    .then(r => {
                        this.dialogNew = false;
                    })
                    .catch(e => {
                        this.snackbar = true;
                        this.mensaje = 'Error: ' + e.toString();
                    });
            }
        }
    }
</script>