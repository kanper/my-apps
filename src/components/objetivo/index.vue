<template>
    <div>
        <TitleBar :mainTitle = 'modelTitle' />
        <v-container>
            <v-layout>
                <v-flex>
                    <DataTable :modelTitle="modelTitle" />
                </v-flex>
            </v-layout>
        </v-container>
        <InfoSnackbar />
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { mapMutations } from 'vuex'
    import DataTable from './data-table'
    import TitleBar from '../common/title-bar'
    import InfoSnackbar from '../common/info-snackbar'
    export default {
        components: {
            InfoSnackbar,
            DataTable,
            TitleBar,
        },
        name: "objetivo-index",
        data: () => ({
                     }),
        methods:{
            ...mapMutations(['setModelName']),
            initialize(){
                this.setModelName('Objetivos');
            }
        },
        computed: {
            ...mapState(['modelTitle'])
        },
        created() {
            this.initialize();
        }
    };
</script>