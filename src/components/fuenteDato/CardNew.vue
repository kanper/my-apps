<template>
    <v-dialog max-width="50%" persistent v-model="visibleNewDialog">
        <v-card>
            <v-card-title class="headline grey darken-3 white--text">Formulario de {{modelSpecification.modelTitle}}:
                Agregar nuevo
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <form>
                                <v-textarea
                                        v-model="newModel.nombreFuente"
                                        v-validate="'required|max:500'"
                                        :counter="500"
                                        :error-messages="errors.collect('nombreFuente')"
                                        auto-grow box
                                        label="Nombre fuente de datos"
                                        data-vv-name="nombreFuente"
                                        required
                                ></v-textarea>
                            </form>
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
    import {mapActions, mapMutations, mapState} from 'vuex'

    export default {
        data() {
            return {
                newModel: {
                    id: 0,
                    nombreFuente: ''
                }
            }
        },
        computed: {
            ...mapState(['modelSpecification', 'visibleNewDialog', 'services'])
        },
        methods: {
            ...mapMutations(['changeNewDialogVisibility', 'closeAllDialogs', 'showInfo', 'addAlert']),
            ...mapActions(['loadDataTable']),
            save() {
                this.$validator.validateAll()
                    .then(v => {
                        if (v) {
                            this.services[this.modelSpecification.modelService].add(this.newModel, this.modelSpecification.modelParams)
                                .then(r => {
                                    this.loadDataTable();
                                    this.clearForm();
                                    if (r.data) {
                                        this.addAlert({
                                            value: true,
                                            color: 'success',
                                            icon: 'mdi-checkbox-marked-circle-outline',
                                            text: 'El nuevo ' + this.modelSpecification.modelName + ' se guardo correctamente.'
                                        });
                                    } else {
                                        this.addAlert({
                                            value: true,
                                            color: 'error',
                                            icon: 'mdi-close-circle-outline',
                                            text: 'Ocurrio un problema al tratar de guardar el ' + this.modelSpecification.modelName + ' seleccionado.'
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
            },
            clearForm(){
                this.newModel.nombreFuente = '';
                this.$validator.reset();
            }
        }
    }
</script>