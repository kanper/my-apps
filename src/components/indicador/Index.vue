<template>
    <div>
        <TitleBar :enableAddBtn="false"/>
        <AppAlert/>
        <v-container>
            <v-layout>
                <v-flex>
                    <DataTable :headers="dataTableHeaders" :options="dataTableOptions"/>
                </v-flex>
            </v-layout>
        </v-container>
        <DataInfo/>
        <FormEdit />
        <DeleteDialog/>
        <InfoSnackbar/>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import InfoSnackbar from '../common/SnackbarInfo'
    import TitleBar from '../common/NavbarTitle'
    import DeleteDialog from '../common/DialogDelete'
    import FormEdit from './CardEdit'
    import DataInfo from '../common/CardInfo'
    import AppAlert from '../common/Alert'
    import DataTable from '../common/DataTable'

    export default {
        components: {
            InfoSnackbar,
            DeleteDialog,
            DataTable,
            TitleBar,
            AppAlert,
            FormEdit,
            DataInfo
        },
        name: "objetivo-index",
        data() {
            return {
                model: {
                    modelName: 'indicador',                              //Nombre del modelo actual
                    modelIcon: 'mdi-flag-variant',                       //Icono que se muestra en representación del modelo
                    modelTitle: 'Indicadores',                           //Nombre que se muestra en representación del modelo
                    modelPath: '',                                       //URL que junto a la BASE es la ruta al servidor
                    modelService: 'indicadorService',                    //Nombre del servicio a utilizar
                    modelPK: 'id',                          //Llave primaria del modelo
                    modelStamp: 'nombreIndicador',                       //Valor único representativo del modelo
                    modelInfo: [                                         //Valores a mostrar para la información del modelo
                        {name: 'Meta', value: 'valorMeta'},
                        {name: 'Indicador', value: 'nombreIndicador'},
                        {name: 'Actividad', value: 'nombreActividad'},
                        {name: 'Resultado', value: 'nombreResultado'},
                        {name: 'Objetivo', value: 'nombreObjetivo'}
                    ],
                    modelParams: {                                         //Parametros para el modelo
                    }
                },
                dataTableHeaders: [
                    {
                        text: 'Objetivo',   //Texto a mostrar en la cabecera de la columna
                        align: 'left',      //Alineación del contenido en la columna
                        value: 'nombreObjetivo',    //Nombre del atributo que se colocara en la columna
                        width: '20%',       //Tamaño de la columna
                        type: 'text'        //Tipo del contenido a mostrar en la columna
                    },
                    {text: 'Resultado', align: 'left', value: 'nombreResultado', width: '20%', type: 'text'},
                    {text: 'Actividad', align: 'left', value: 'nombreActividad', width: '20%', type: 'text'},
                    {text: 'Indicador', align: 'left', value: 'nombreIndicador', width: '20%', type: 'text'},
                    {text: 'Meta', align: 'center', value: 'valorMeta', width: '5%', type: 'number'},
                    {text: 'Opciones', align: 'center', value: 'action', sortable: false, type: 'option'}
                ],
                dataTableOptions: [
                    {
                        text: 'Información',                //Texto que se muestra para el boton
                        type: 'info',                       //Tipo de boton [info|new|edit|delete|redirect]
                        icon: 'mdi-information-outline',    //Icono que se muestra para el boton
                        action: '',                         //Acción personalizada
                        class: 'mr-2',                      //Clase a agregar
                        route: '',                          //Ruta a redirigir
                        params: {}                          //Parametros para la ruta a redirigir
                    },
                    {text: 'Editar', type: 'edit', icon: 'mdi-pencil', action: '', class: 'mr-2', route: ''},
                    {text: 'Eliminar', type: 'delete', icon: 'mdi-delete', action: '', class: 'mr-2', route: ''},
                ],
            }
        },
        methods: {
            ...mapMutations(['defineModel','clearAlerts', 'emptyDataTable']),
        },
        created() {
            this.clearAlerts();
            this.defineModel(this.model);
        },
        destroyed() {
            this.emptyDataTable();
        }
    };
</script>