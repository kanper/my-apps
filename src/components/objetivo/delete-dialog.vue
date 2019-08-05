<template>
    <v-dialog v-model="visibleDeleteDialog" persistent max-width="50%">
        <v-card>
            <v-card-title class="headline red darken-2 white--text">Eliminar elementos</v-card-title>
            <v-card-text>
                ¿Confirma eliminar los siguientes elementos de la lista?
                <v-list two-line>
                    <v-list-tile avatar ripple>
                        <v-list-tile-content>
                            <v-list-tile-title>Nombre</v-list-tile-title>
                            <v-list-tile-sub-title>{{ CRUDModel.nombreObjetivo }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action><v-icon color="grey lighten-1">mdi-delete-variant</v-icon></v-list-tile-action>
                    </v-list-tile>
                    <v-divider color="red"></v-divider>
                </v-list>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="gray darken-1" flat @click="changeDeleteDialogVisibility">Cancelar</v-btn>
                <v-btn color="red darken-1" flat @click="deleteSelectedElements">Eliminar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapState } from 'vuex'
    import { mapMutations } from 'vuex'
    import { mapActions } from 'vuex'
    export default {
        props: ['CRUDModel'],
        data () {
            return {
                intDialogVisible: false
            }
        },
        computed: {
            ...mapState(['services','visibleDeleteDialog'])
        },
        methods: {
            ...mapMutations(['changeDeleteDialogVisibility','closeAllDialogs','showInfo']),
            ...mapActions(['loadDataTable']),
            deleteSelectedElements(){
                this.services.objetivoService.remove(this.CRUDModel.codigoObjetivo)
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