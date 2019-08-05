<template>
    <v-dialog max-width="50%" persistent scrollable v-model="visibleInfoDialog">
        <v-card>
            <v-card-title class="headline blue darken-3 white--text">Registro de {{modelSpecification.modelTitle}}:
                Información
            </v-card-title>
            <v-card-text>
                <v-list :dense="true" :expand="true" three-line>
                    <v-list-tile avatar ripple v-bind:data="item.value" v-bind:key="item.name"
                                 v-for="item in modelSpecification.modelInfo">
                        <v-list-tile-content>
                            <v-list-tile-title>{{item.name}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ CRUDModel[item.value] }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-icon color="grey lighten-1">mdi-archive</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider></v-divider>
                </v-list>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="changeInfoDialogVisibility" color="gray darken-1" flat>Cerrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'

    export default {
        computed: {
            ...mapState(['modelSpecification', 'visibleInfoDialog', 'CRUDModel'])
        },
        methods: {
            ...mapMutations(['changeInfoDialogVisibility']),
            formatDate(UtcDate) {
                const date = new Date(UtcDate);
                return date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
            },
            verifyNotEmpty(text) {
                if (text === undefined || text === null) {
                    return 'N/A'
                }
                return text;
            }
        }
    }
</script>