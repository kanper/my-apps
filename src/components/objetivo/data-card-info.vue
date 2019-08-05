<template>
    <v-dialog v-model="visibleInfoDialog" persistent max-width="50%">
        <v-card>
            <v-card-title class="headline blue darken-3 white--text">Registro de {{modelTitle}}: Información</v-card-title>
            <v-card-text>
                <v-list two-line>
                    <v-list-tile avatar ripple>
                    <v-list-tile-content>
                        <v-list-tile-title>Nombre</v-list-tile-title>
                        <v-list-tile-sub-title>{{ CRUDModel.nombreObjetivo }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action><v-icon color="grey lighten-1">mdi-archive</v-icon></v-list-tile-action>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-list-tile avatar ripple>
                        <v-list-tile-content>
                            <v-list-tile-title>Creado por</v-list-tile-title>
                            <v-list-tile-sub-title>{{ verifyNotEmpty(CRUDModel.createdBy) }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-list-tile-action-text>{{ formatDate(CRUDModel.createdAt) }}</v-list-tile-action-text>
                            <v-icon color="grey lighten-1"> mdi-calendar-clock</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-list-tile avatar ripple>
                        <v-list-tile-content>
                            <v-list-tile-title>Actualizado por</v-list-tile-title>
                            <v-list-tile-sub-title>{{ verifyNotEmpty(CRUDModel.updatedBy) }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-list-tile-action-text>{{ formatDate(CRUDModel.updatedAt) }}</v-list-tile-action-text>
                            <v-icon color="grey lighten-1"> mdi-calendar-clock</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="gray darken-1" flat @click="changeInfoDialogVisibility">Cerrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapState } from 'vuex'
    import { mapMutations } from 'vuex'
    export default {
        props: ['modelTitle','CRUDModel'],
        data () {
            return {
                dialog: false,
            }
        },
        computed: {
            ...mapState(['visibleInfoDialog'])
        },
        methods: {
            ...mapMutations(['changeInfoDialogVisibility']),
            formatDate(UtcDate) {
                const date = new Date(UtcDate);
                return date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
            },
            verifyNotEmpty(text){
                if(text === undefined || text === null){
                    return 'N/A'
                }
                return text;
            }
        }
    }
</script>