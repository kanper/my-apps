<template>
    <div>
        <TitleBar mainTitle = 'Objetivos' />
        <v-container>
            <v-layout>
                <v-flex>
                    <DataTable />
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import FormCard from './form-card-new'
    import DataTable from './data-table'
    import TitleBar from './title-bar'
    export default {
        components: {
            FormCard,
            DataTable,
            TitleBar
        },
        name: "objetivo-index",
        data: () => ({
                     }),
    };
</script>