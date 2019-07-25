<template>
    <v-dialog v-model="intDialogVisible" persistent max-width="50%">
        <v-card>
            <v-card-title class="headline red darken-2 white--text">Eliminar elementos</v-card-title>
            <v-card-text>
                ¿Confirma eliminar los siguientes elementos de la lista?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="gray darken-1" flat @click="dialogVisible = false">Cancelar</v-btn>
                <v-btn color="red darken-1" flat @click="dialogVisible = false">Eliminar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: { dialogVisible: Boolean,},
        data () {
            return {
            }
        },
        computed: {
            intDialogVisible: {
                get: function () {
                    if (this.dialogVisible) {
                        // Some dialog initialization code could be placed here
                        // because it is called only when this.dialogVisible changes
                    }

                    return this.dialogVisible
                },
                set: function (value) {
                    if (!value) {
                        this.$emit('close', some_payload)
                    }
                }
            }
        }
    }
</script>