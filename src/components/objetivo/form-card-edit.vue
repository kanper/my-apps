<template>
    <v-dialog v-model="visibleEditDialog" persistent max-width="50%">
        <v-card>
            <v-card-title class="headline grey darken-3 white--text">Formulario de {{modelTitle}}: Editar registro</v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field v-model="CRUDModel.nombreObjetivo" label="Nombre *" required clearable counter></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <small>* Indica que el campo es requerido</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="gray darken-1" flat @click="changeEditDialogVisibility">Cancelar</v-btn>
                <v-btn color="blue darken-1" flat @click="update()">Actualizar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapState } from 'vuex'
    import { mapMutations } from 'vuex'
    import { mapActions } from 'vuex'
    export default {
        props: ['modelTitle','CRUDModel'],
        data () {
            return {
            }
        },
        computed: {
          ...mapState(['visibleEditDialog','CRUDModelID','services'])
        },
        methods: {
            ...mapMutations(['changeEditDialogVisibility','closeAllDialogs','showInfo']),
            ...mapActions(['loadDataTable']),
            update() {
                this.services.objetivoService.update(this.CRUDModel,this.CRUDModel.codigoObjetivo)
                    .then(r => {
                        this.loadDataTable();
                    })
                    .catch(e => {
                        this.showInfo(e.toString());
                    });
                this.closeAllDialogs();
            }
        }
    }
</script>