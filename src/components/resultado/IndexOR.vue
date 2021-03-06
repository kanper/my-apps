<template>
    <div>
        <TitleBar :enableBackBtn="true"/>
        <Banner color="grey" icon="mdi-checkbox-marked-circle-outline" title="Objetivo" :text="bannerText"/>
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
        <FormNew />
        <DeleteDialog/>
        <InfoSnackbar/>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import InfoSnackbar from '../common/SnackbarInfo'
    import TitleBar from '../common/NavbarTitle'
    import DeleteDialog from '../common/DialogDelete'
    import FormEdit from './CardEdit'
    import FormNew from './CardNew'
    import DataInfo from '../common/CardInfo'
    import AppAlert from '../common/Alert'
    import DataTable from '../common/DataTable'
    import Banner from '../common/BannerCard'

    export default {
        components: {
            InfoSnackbar,
            DeleteDialog,
            DataTable,
            TitleBar,
            AppAlert,
            FormEdit,
            DataInfo,
            FormNew,
            Banner
        },
        name: "resultado-index",
        data() {
            return {
                model: {
                    modelName: 'resultado',                              //Nombre del modelo actual
                    modelIcon: 'mdi-lightbulb',                          //Icono que se muestra en representación del modelo
                    modelTitle: 'Resultados',                            //Nombre que se muestra en representación del modelo
                    modelPath: '',                                       //URL que junto a la BASE es la ruta al servidor
                    modelService: 'objetivoResultadoService',                    //Nombre del servicio a utilizar
                    modelPK: 'id',                          //Llave primaria del modelo
                    modelStamp: 'nombreResultado',                       //Valor único representativo del modelo
                    modelInfo: [                                         //Valores a mostrar para la información del modelo
                        {
                            name: 'Resultado',
                            value: 'nombreResultado',
                            type: 'text'
                        }
                    ],
                    modelParams: {                                         //Parametros para el modelo
                        id: this.$route.params.id
                    }
                },
                dataTableHeaders: [
                    {
                        text: 'Resultado',   //Texto a mostrar en la cabecera de la columna
                        align: 'left',      //Alineación del contenido en la columna
                        value: 'nombreResultado',    //Nombre del atributo que se colocara en la columna
                        width: '60%',       //Tamaño de la columna
                        type: 'text'        //Tipo del contenido a mostrar en la columna
                    },
                    {text: 'Actividades', align: 'center', value: 'actividades', type: 'number'},
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
                        show: (row) => {return true}
                    },
                    {text: 'Editar', type: 'edit', icon: 'mdi-pencil', action: '', class: 'mr-2', route: '', show: (row) => {return true}},
                    {text: 'Eliminar', type: 'delete', icon: 'mdi-delete', action: '', class: 'mr-2', route: '', show: (row) => {return true}},
                    {text: 'Actividades', type: 'redirect', icon: 'mdi-calendar-clock', action: '', class: 'mr-3', route: 'resultado-actividad-index', show: (row) => {return true}}
                ],
                bannerText: ''
            }
        },
        computed: {
            ...mapState(['services'])
        },
        methods: {
            ...mapMutations(['defineModel', 'showInfo', 'clearAlerts','emptyDataTable']),
        },
        created() {
            this.clearAlerts();
            this.defineModel(this.model);
            this.services.objetivoService.get(this.$route.params.id)
                .then(r => {
                    this.bannerText = r.data.nombre;
                })
                .catch(e => {
                    this.showInfo(e.toString());
                });
        },
        destroyed() {
            this.emptyDataTable();
        }
    };
</script>