<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-icon :class="data.class" @click="doAction" v-on="on">{{data.icon}}</v-icon>
        </template>
        <span>{{data.text}}</span>
    </v-tooltip>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'

    export default {
        name: "data-table-option",
        props: ['data', 'modelId'],
        computed: {
            ...mapState(['services', 'CRUDModel', 'modelSpecification'])
        },
        methods: {
            ...mapMutations(['changeInfoDialogVisibility', 'changeEditDialogVisibility', 'changeDeleteDialogVisibility', 'closeAllDialogs', 'setCRUDModel']),
            loadModel(id) {
                this.services[this.modelSpecification.modelService].get(id, this.modelSpecification.modelParams)
                    .then(r => {
                        this.setCRUDModel(r.data);
                    })
                    .catch(e => {
                        this.showInfo(e.toString());
                    });
            },
            showInfoDialog(id) {
                this.loadModel(id);
                this.closeAllDialogs();
                this.changeInfoDialogVisibility();
            },
            showEditForm(id) {
                this.loadModel(id);
                this.closeAllDialogs();
                this.changeEditDialogVisibility();
            },
            showDeleteConfirmation(id) {
                this.loadModel(id);
                this.closeAllDialogs();
                this.changeDeleteDialogVisibility();
            },
            doAction() {
                switch (this.data.type) {
                    case 'info':
                        this.showInfoDialog(this.modelId);
                        break;
                    case 'new':
                        console.warn('Unimplemented method...');
                        break;
                    case 'edit':
                        this.showEditForm(this.modelId);
                        break;
                    case 'delete':
                        this.showDeleteConfirmation(this.modelId);
                        break;
                    case 'redirect':
                        this.$router.push({
                            name: this.data.route,
                            params: {
                                id: this.modelId
                            }
                        });
                        break;
                    default:
                        console.error('Action type [' + this.data.type + '] invalid.');
                }
            }
        }
    }
</script>

<style scoped>

</style>