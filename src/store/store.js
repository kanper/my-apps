import Vue from 'vue'
import Vuex from 'vuex'
import services from './services'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        services,
        modelTitle: '',
        modelSpecification:{},
        snackbarInformationVisible: false,
        snackbarInformationText: '',
        visibleNewDialog: false,
        visibleEditDialog: false,
        visibleDeleteDialog: false,
        visibleInfoDialog: false,
        CRUDModel: {},
        dataTable: [],
        alerts: []
    },
    mutations: {
        setModelName(state, name) {
            state.modelTitle = name;
        },
        defineModel(state, model) {
            state.modelSpecification = model;
        },
        showInfo(state, text) {
            state.snackbarInformationText = text;
            state.snackbarInformationVisible = true;
        },
        closeInfo(state) {
            state.snackbarInformationVisible = false;
        },
        changeNewDialogVisibility(state) {
            state.visibleNewDialog = !state.visibleNewDialog;
        },
        changeEditDialogVisibility(state) {
            state.visibleEditDialog = !state.visibleEditDialog;
        },
        changeDeleteDialogVisibility(state) {
            state.visibleDeleteDialog = !state.visibleDeleteDialog;
        },
        changeInfoDialogVisibility(state) {
            state.visibleInfoDialog = !state.visibleInfoDialog;
        },
        closeAllDialogs(state) {
            state.visibleNewDialog = false;
            state.visibleEditDialog = false;
            state.visibleDeleteDialog = false;
            state.visibleInfoDialog = false;
        },
        setCRUDModel(state, model) {
            state.CRUDModel = model;
        },
        updateDataTable(state, dataAction) {
            this.state.dataTable = dataAction;
        },
        addAlert(state, alert) {
            state.alerts.push(alert);
        },
        clearAlerts(state) {
            state.snackbarInformationVisible = false;
            state.alerts = [];
        }
    },
    actions: {
        loadDataTable: async function ({commit}) {
            services[this.state.modelSpecification.modelService].getAll(this.state.modelSpecification.modelParams)
                .then(r => {
                    commit('updateDataTable', r.data);
                })
                .catch(e => {
                    commit('showInfo', e.toString())
                });
        }
    }
})
