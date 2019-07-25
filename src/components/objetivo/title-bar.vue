<template>
    <v-card class="mx-auto" color="white">
        <v-card-actions>
            <v-list-tile class="grow">
                <v-list-tile-avatar>
                    <v-icon large left>mdi-checkbox-marked-circle-outline</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{mainTitle}}</v-list-tile-title>
                </v-list-tile-content>
                <v-layout align-left justify-end>
                    <FormCard />
                </v-layout>
            </v-list-tile>
        </v-card-actions>
    </v-card>
</template>

<script>
    import FormCard from './form-card-new'
    export default {
        components: {FormCard},
        props: ['mainTitle'],
        data () {
            return {
                dialog: false
            }
        }
    }
</script>