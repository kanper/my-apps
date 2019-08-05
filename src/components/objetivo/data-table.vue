<template>
    <v-card>
        <v-card-title>
            <h2 class="font-weight-light">Registro de {{modelTitle}}</h2>
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    single-line
            ></v-text-field>
        </v-card-title>
        <v-data-table
                :headers="headers"
                :items="dataTable"
                :search="search"
        >
            <template v-slot:items="props">
                <td>{{ resumeLargeText(props.item.nombre) }}</td>
                <td class="text-xs-center">{{props.item.resultados}}</td>

                <td class="justify-center layout px-0">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }" >
                            <v-icon class="mr-2" v-on="on" @click="showInfoDialog(props.item.id)">mdi-information-outline</v-icon>
                        </template>
                        <span>Información</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }" >
                            <v-icon class="mr-2" v-on="on" @click="showEditForm(props.item.id)">mdi-pencil</v-icon>
                        </template>
                        <span>Editar</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-icon class="mr-2" v-on="on" @click="showDeleteConfirmation(props.item.id)">mdi-delete</v-icon>
                        </template>
                        <span>Eliminar</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-icon class="mr-3" v-on="on">mdi-lightbulb</v-icon>
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
        <DataInfo :modelTitle="modelTitle" :CRUDModel="CRUDModel"/>
        <FormNew :modelTitle="modelTitle"/>
        <FormEdit :modelTitle="modelTitle" :CRUDModel="CRUDModel"/>
        <DeleteDialog :CRUDModel="CRUDModel"/>
    </v-card>
</template>

<script>
    import { mapState } from 'vuex'
    import { mapMutations } from 'vuex'
    import { mapActions } from 'vuex'
    import DeleteDialog from './delete-dialog'
    import FormEdit from './form-card-edit'
    import FormNew from './form-card-new'
    import DataInfo from './data-card-info'
    export default {
        props:['modelTitle'],
        components: {DeleteDialog,FormEdit,FormNew,DataInfo},
        data () {
            return {
                search: '',
                modelID: 0,
                CRUDModel: {},
                headers: [
                    { text: 'Objetivo', align: 'left', value: 'nombre'},
                    { text: 'Resultados', value: 'resultados' },

                    { text: 'Opciones', value: 'action', sortable: false }
                ],
            }
        },
        computed: {
            ...mapState(['services','dataTable'])
        },
        methods: {
            ...mapMutations(['showInfo','changeEditDialogVisibility','changeDeleteDialogVisibility','changeInfoDialogVisibility','closeAllDialogs','setCRUDModel']),
            ...mapActions(['loadDataTable']),
            loadModel(id) {
                this.services.objetivoService.get(id)
                    .then(r => {
                        this.CRUDModel = r.data;
                    })
                    .catch(e => {
                        this.showInfo(e.toString());
                    });
            },
            showInfoDialog(id){
                this.loadModel(id);
                this.closeAllDialogs();
                this.changeInfoDialogVisibility();
            },
            showEditForm(id){
                this.loadModel(id);
                this.closeAllDialogs();
                this.changeEditDialogVisibility();
            },
            showDeleteConfirmation(id){
                this.loadModel(id);
                this.closeAllDialogs();
                this.changeDeleteDialogVisibility();
            },
            resumeLargeText(text) {
                if(text.length > 250){
                    return text.substring(0,251).concat('...');
                }
                return text;
            }
        },
        watch: {

        },
        created() {
            this.loadDataTable();
        }
    }
</script>