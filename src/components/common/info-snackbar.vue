<template>
    <v-snackbar v-model="snackbarInformationVisible" :timeout="15000">
        {{ snackbarInformationText }}
        <v-btn color="pink" text @click="closeInfo">Cerrar</v-btn>
    </v-snackbar>
</template>

<script>
    import { mapState } from 'vuex'
    import { mapMutations } from 'vuex'
    export default {
        data: () => ({
            snackbar: false
        }),
        computed: {
            ...mapState(['snackbarInformationText','snackbarInformationVisible']),
        },
        methods: {
            ...mapMutations(['closeInfo'])
        }
    }
</script>