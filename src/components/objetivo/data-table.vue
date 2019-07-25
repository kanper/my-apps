<template>
    <v-card>
        <v-card-title>
            Indice -> Objetivos
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    single-line
            ></v-text-field>
        </v-card-title>
        <v-data-table
                v-model="selected"
                :headers="headers"
                :items="objectives"
                :search="search"
                select-all
        >
            <template v-slot:items="props">
                <td><v-checkbox v-model="props.selected" primary hide-details></v-checkbox></td>
                <td>{{ props.item.nombreObjetivo }}</td>
                <td class="text-xs-center"></td>

                <td class="justify-center layout px-0">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-icon class="mr-2" v-on="on">mdi-pencil</v-icon>
                        </template>
                        <span>Editar</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-icon class="mr-2" v-on="on" @click="myDialogClose">mdi-delete</v-icon>
                        </template>
                        <span>Eliminar</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-icon v-on="on">mdi-lightbulb</v-icon>
                        </template>
                        <span>Resultados</span>
                    </v-tooltip>
                </td>
            </template>
            <template v-slot:no-results>
                <v-alert :value="true" color="error" icon="mdi-alert">
                    La busqueda de "{{ search }}" no tiene resultados.
                </v-alert>
            </template>
        </v-data-table>
        <DeleteDialog :dialogVisible="myDialogVisible" @close="myDialogClose"/>
    </v-card>
</template>

<script>
    import DeleteDialog from './delete-dialog'
    export default {
        components: {DeleteDialog},
        data () {
            return {
                myDialogVisible: false,
                search: '',
                selected: [],
                headers: [
                    { text: 'Objetivo', align: 'left', value: 'nombreObjetivo'},
                    { text: 'Resultados', value: 'resultados' },

                    { text: 'Opciones', value: 'action', sortable: false }
                ],
                objectives: [],
            }
        },
        methods: {
            myDialogClose () {
                this.myDialogVisible = true
                // other code
            },
            initialize () {
                this.getAll();
            },
            get() {
            },
            getAll() {
                this.$store.state.services.objetivoService.getAll()
                    .then(r => {
                        this.objectives = r.data;
                    })
                    .catch(e => {
                        this.snackbar = true;
                        this.mensaje = 'Error: ' + e.toString();
                    });
            },
            dateFormat(UtcDate) {
                if (UtcDate){
                    var fDate = new Date(UtcDate);
                    return fDate.getDay() + '/' + fDate.getMonth() + '/' + fDate.getFullYear() + ' ' + fDate.getHours() + ':' + fDate.getMinutes();
                }
                return '--/--/-- --:--';
            }
        },
        watch: {

        },
        computed: {

        },
        created() {
            this.initialize();
        }
    }
</script>